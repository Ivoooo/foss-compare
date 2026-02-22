from playwright.sync_api import sync_playwright
import os

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the new category page
        url = "http://localhost:3000/comparison/file-sync-storage.html"
        print(f"Navigating to {url}")
        page.goto(url)

        # Wait for content to load
        page.wait_for_selector("h1", timeout=10000)

        # Verify title or content
        title = page.title()
        print(f"Page title: {title}")

        # Take screenshot
        os.makedirs("verification", exist_ok=True)
        screenshot_path = "verification/file-sync-storage.png"
        page.screenshot(path=screenshot_path, full_page=True)
        print(f"Screenshot saved to {screenshot_path}")

        browser.close()

if __name__ == "__main__":
    run()
