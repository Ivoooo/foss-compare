import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    # increase viewport height to avoid scrolling issues if any
    context = browser.new_context(viewport={"width": 1280, "height": 1024})
    page = context.new_page()

    try:
        # Navigate to homepage
        print("Navigating to homepage...")
        page.goto("http://localhost:3000")

        # Take homepage screenshot
        page.screenshot(path="verification/homepage.png")
        print("Homepage screenshot taken.")

        # Check for Password Managers card
        print("Checking Password Managers card...")

        # It's a div, so use get_by_text
        pm_card_text = page.get_by_text("Password Managers").first
        expect(pm_card_text).to_be_visible(timeout=5000)

        # Click on Password Managers
        print("Clicking Password Managers...")
        pm_card_text.click()

        # Wait for navigation
        page.wait_for_url("**/comparison/password-managers")
        print("Navigated to Password Managers comparison.")

        # Verify content
        print("Verifying Password Managers table content...")
        # Check for "Security Features" section which is unique to PMs
        try:
            expect(page.get_by_text("Security Features")).to_be_visible()
        except:
            print("Security Features section not found!")
            page.screenshot(path="verification/pm_fail.png")
            return

        # Check for Bitwarden
        try:
             expect(page.get_by_text("Bitwarden").first).to_be_visible()
        except:
             print("Bitwarden row not found!")
             page.screenshot(path="verification/pm_fail.png")
             return

        # Take screenshot of Password Managers table
        page.screenshot(path="verification/password_managers.png")
        print("Password Managers screenshot taken.")

        # Go back home
        print("Going back to home...")
        page.get_by_role("button", name="Back to Categories").click()
        page.wait_for_url("http://localhost:3000/")

        # Check Streamers
        print("Checking Streamers...")
        streamers_card_text = page.get_by_text("TV & Movie Streamers").first
        streamers_card_text.click()

        page.wait_for_url("**/comparison/streamers")
        print("Navigated to Streamers comparison.")

        # Verify Streamers content
        try:
            expect(page.get_by_text("Codec Support")).to_be_visible()
        except:
            print("Codec Support section not found in Streamers!")
            page.screenshot(path="verification/streamers_fail.png")
            return

        # Take screenshot of Streamers table
        page.screenshot(path="verification/streamers.png")
        print("Streamers screenshot taken.")

    except Exception as e:
        print(f"Error: {e}")
        try:
            page.screenshot(path="verification/error.png")
        except:
            pass
        raise e
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
