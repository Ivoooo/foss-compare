import time
from playwright.sync_api import sync_playwright, expect

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 1024})
    page = context.new_page()

    try:
        print("Navigating to Streamers...")
        page.goto("http://localhost:3000/comparison/streamers")

        # Verify content
        expect(page.get_by_text("Codec Support")).to_be_visible()

        # Take screenshot
        page.screenshot(path="verification/streamers_manual.png")
        print("Streamers screenshot taken.")

    except Exception as e:
        print(f"Error: {e}")
        page.screenshot(path="verification/streamers_fail.png")
        raise e
    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
