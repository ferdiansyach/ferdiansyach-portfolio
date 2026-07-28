from playwright.sync_api import sync_playwright
import urllib.request
import time

def wait_for_server(url, max_wait=60):
    start = time.time()
    while time.time() - start < max_wait:
        try:
            urllib.request.urlopen(url, timeout=5)
            return True
        except:
            time.sleep(1)
    return False

def test_qa():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        
        print("=" * 60)
        print("QA TESTING - Portfolio Website")
        print("=" * 60)
        
        results = {"pass": 0, "fail": 0, "warn": 0}
        
        def check(name, condition, msg=""):
            if condition:
                results["pass"] += 1
                print(f"[PASS] {name}")
            else:
                results["fail"] += 1
                print(f"[FAIL] {name} - {msg}")
        
        def warn(name, msg=""):
            results["warn"] += 1
            print(f"[WARN] {name} - {msg}")
        
        # Wait for server to be fully ready
        print("\nWaiting for server to be fully ready...")
        if not wait_for_server('http://localhost:3000', 60):
            print("Server not ready after 60s, proceeding anyway...")
        
        # 1. Page loads
        page.goto('http://localhost:3000', wait_until='commit', timeout=90000)
        page.wait_for_timeout(5000)  # Wait for React hydration
        check("Page loads", page.url == "http://localhost:3000/")
        
        # 2. Navbar exists and has links
        navbar = page.locator('nav')
        check("Navbar present", navbar.count() > 0)
        nav_links = page.locator('nav a')
        print(f"    Nav links: {nav_links.count()}")
        
        # 3. Hero section
        hero_h1 = page.locator('h1')
        check("Hero H1 present", hero_h1.count() > 0)
        
        # 4. Theme toggle
        html_before = page.locator('html').get_attribute('class')
        theme_btn = page.locator('button:has-text("Toggle theme"), button:has-text("theme"), [aria-label*="theme"], [aria-label*="Theme"]')
        if theme_btn.count() > 0:
            theme_btn.first.click()
            page.wait_for_timeout(500)
            html_after = page.locator('html').get_attribute('class')
            check("Theme toggle works", html_before != html_after, f"Before: {html_before}, After: {html_after}")
            theme_btn.first.click()
            page.wait_for_timeout(500)
        else:
            warn("Theme toggle", "Button not found with standard selectors")
        
        # 5. Language toggle
        lang_btn = page.locator('button:has-text("EN"), button:has-text("ID"), button:has-text("Toggle language"), button:has-text("lang"), [aria-label*="lang"]')
        if lang_btn.count() > 0:
            h1_before = page.locator('h1').first.inner_text()
            lang_btn.first.click()
            page.wait_for_timeout(500)
            h1_after = page.locator('h1').first.inner_text()
            check("Language toggle works", h1_before != h1_after, f"Before: {h1_before}, After: {h1_after}")
            lang_btn.first.click()
            page.wait_for_timeout(500)
        else:
            warn("Language toggle", "Button not found")
        
        # 6. Section navigation - scroll into view
        sections_to_check = ['About', 'Skills', 'Projects', 'Experience', 'Contact']
        for section in sections_to_check:
            try:
                section_el = page.locator(f'section:has-text("{section}")').first
                section_el.scroll_into_view_if_needed(timeout=5000)
                check(f"Section {section} exists", True)
            except:
                warn(f"Section {section}", "Not found or not scrollable")
        
        # 7. Project cards
        project_links = page.locator('a[href*="/projects/"]')
        print(f"    Project links found: {project_links.count()}")
        check("Project links exist", project_links.count() > 0)
        
        # 8. Contact form
        form = page.locator('form')
        if form.count() > 0:
            inputs = page.locator('form input, form textarea')
            print(f"    Form inputs found: {inputs.count()}")
            check("Contact form exists", True)
        else:
            warn("Contact form", "Form not found")
        
        # 9. Footer
        footer = page.locator('footer')
        check("Footer present", footer.count() > 0)
        if footer.count() > 0:
            footer_links = footer.locator('a')
            print(f"    Footer links: {footer_links.count()}")
        
        # 10. Scroll to top
        page.evaluate("window.scrollTo(0, document.body.scrollHeight)")
        page.wait_for_timeout(1000)
        scroll_btn = page.locator('[class*="scroll"], [aria-label*="scroll"]')
        check("Scroll to top present", scroll_btn.count() > 0)
        
        # 11. Console errors
        console_errors = []
        page.on('console', lambda msg: console_errors.append(msg.text) if msg.type == 'error' else None)
        page.goto('http://localhost:3000', wait_until='commit', timeout=90000)
        page.wait_for_timeout(5000)
        if console_errors:
            warn("Console errors", f"{len(console_errors)} errors")
            for err in console_errors[:3]:
                print(f"      - {err[:80]}")
        else:
            check("No console errors", True)
        
        # 12. Images load
        images = page.locator('img')
        img_count = images.count()
        broken_imgs = []
        for i in range(img_count):
            img = images.nth(i)
            natural_width = img.evaluate('el => el.naturalWidth')
            src = img.get_attribute('src') or ''
            if natural_width == 0 and src:
                broken_imgs.append(src[:50])
        if broken_imgs:
            warn("Broken images", f"{len(broken_imgs)} images not loading")
            for img in broken_imgs[:3]:
                print(f"      - {img}")
        else:
            check("All images load", True)
        
        # 13. Responsive - mobile
        page.set_viewport_size({"width": 375, "height": 812})
        page.goto('http://localhost:3000', wait_until='commit', timeout=90000)
        page.wait_for_timeout(3000)
        mobile_h1 = page.locator('h1').first.is_visible()
        check("Mobile viewport - H1 visible", mobile_h1)
        
        # 14. Responsive - tablet
        page.set_viewport_size({"width": 768, "height": 1024})
        page.goto('http://localhost:3000', wait_until='commit', timeout=90000)
        page.wait_for_timeout(3000)
        tablet_h1 = page.locator('h1').first.is_visible()
        check("Tablet viewport - H1 visible", tablet_h1)
        
        # 15. PDF route
        page.set_viewport_size({"width": 1280, "height": 800})
        page.goto('http://localhost:3000/portfolio-pdf', wait_until='commit', timeout=90000)
        page.wait_for_timeout(2000)
        check("Portfolio PDF route accessible in dev", '/portfolio-pdf' in page.url)
        
        # 16. Projects PDF
        page.goto('http://localhost:3000/projects-pdf', wait_until='commit', timeout=90000)
        page.wait_for_timeout(3000)
        check("Projects PDF route accessible", '/projects-pdf' in page.url)
        
        # 17. Performance
        page.goto('http://localhost:3000', wait_until='commit', timeout=90000)
        page.wait_for_timeout(3000)
        perf = page.evaluate('''() => {
            const entries = performance.getEntriesByType('navigation');
            if (entries.length > 0) {
                const nav = entries[0];
                return {
                    domContentLoaded: Math.round(nav.domContentLoadedEventEnd - nav.startTime),
                    load: Math.round(nav.loadEventEnd - nav.startTime)
                };
            }
            return null;
        }''')
        if perf:
            print(f"\n    Performance:")
            print(f"      DOM Content Loaded: {perf['domContentLoaded']}ms")
            print(f"      Load Complete: {perf['load']}ms")
            check("Performance acceptable", perf['load'] < 5000, f"Load time: {perf['load']}ms")
        
        browser.close()
        
        print("\n" + "=" * 60)
        print(f"QA SUMMARY: {results['pass']} passed, {results['fail']} failed, {results['warn']} warnings")
        print("=" * 60)

if __name__ == '__main__':
    test_qa()
