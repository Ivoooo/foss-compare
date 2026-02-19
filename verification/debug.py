import time
from playwright.sync_api import sync_playwright

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()

    try:
        print("Navigating to homepage...")
        page.goto("http://localhost:3000")

        print("Page text content:")
        print(page.inner_text("body"))

        page.screenshot(path="verification/homepage_debug.png")

    finally:
        browser.close()

with sync_playwright() as playwright:
    run(playwright)
