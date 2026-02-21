from playwright.sync_api import sync_playwright
import time

def run(playwright):
    browser = playwright.chromium.launch(headless=True)
    context = browser.new_context(viewport={"width": 1280, "height": 1024})
    page = context.new_page()

    print("Navigating to page...")
    # Retry logic for server startup
    for i in range(10):
        try:
            page.goto("http://localhost:3000/comparison/media-servers.html")
            break
        except Exception as e:
            print(f"Attempt {i+1} failed: {e}")
            time.sleep(2)

    print("Waiting for table...")
    page.wait_for_selector("table", timeout=10000)

    # Check for GitHub icon
    print("Checking for GitHub icons...")
    github_links = page.locator("a[aria-label='View on GitHub']")
    # Wait for at least one to be visible
    try:
        github_links.first.wait_for(state="visible", timeout=5000)
    except:
        print("GitHub links not visible immediately")

    count = github_links.count()
    print(f"Found {count} GitHub links in header")

    # Click "Project Stats" row to expand it
    print("Clicking Project Stats row...")
    project_stats_row = page.locator("tr", has_text="Project Stats").first
    project_stats_row.click()
    page.wait_for_timeout(500)

    # Click first category row to toggle it
    print("Clicking first category row...")
    # The first tbody is project stats (which is distinct in structure? No, it's inside the table but rendered as ProjectStatsSection).
    # Wait, ProjectStatsSection returns a tbody.
    # The categories are also tbodies.
    # So we want to find a category section.
    # Let's find "Platform Support"
    platform_row = page.locator("tr", has_text="Platform Support").first
    if platform_row.is_visible():
        print("Found Platform Support, clicking...")
        platform_row.click()
        page.wait_for_timeout(500)
    else:
        print("Platform Support not found, finding any category row...")
        # Try to find a row with a chevron
        rows_with_chevron = page.locator("tr:has(svg.lucide-chevron-right), tr:has(svg.lucide-chevron-down)")
        # Filter out Project Stats if we already clicked it (it might have chevron-down now)
        # We want to toggle something else.
        count = rows_with_chevron.count()
        if count > 1:
            rows_with_chevron.nth(1).click() # Click the second one (first one might be Project Stats)
            page.wait_for_timeout(500)

    # Take screenshot
    print("Taking screenshot...")
    page.screenshot(path="verification_screenshot.png", full_page=True)

    browser.close()

if __name__ == "__main__":
    with sync_playwright() as playwright:
        run(playwright)
