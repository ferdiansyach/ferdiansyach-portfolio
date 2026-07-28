from playwright.sync_api import sync_playwright
import json

def test_seo():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        
        print("=" * 60)
        print("SEO AUDIT - ferdiansyach-portfolio.vercel.app")
        print("=" * 60)
        
        # Test main page
        page.goto('http://localhost:3000')
        page.wait_for_load_state('networkidle')
        
        # 1. Title tag
        title = page.title()
        print(f"\n[1] TITLE TAG: {title}")
        print(f"    Length: {len(title)} chars (optimal: 50-60)")
        print(f"    Status: {'PASS' if 30 <= len(title) <= 60 else 'WARN'}")
        
        # 2. Meta description
        desc = page.locator('meta[name="description"]').get_attribute('content')
        print(f"\n[2] META DESCRIPTION: {desc}")
        print(f"    Length: {len(desc)} chars (optimal: 150-160)")
        print(f"    Status: {'PASS' if 120 <= len(desc) <= 160 else 'WARN'}")
        
        # 3. Meta keywords
        keywords = page.locator('meta[name="keywords"]').get_attribute('content')
        print(f"\n[3] META KEYWORDS: {keywords}")
        print(f"    Status: {'PASS' if keywords else 'WARN'}")
        
        # 4. Open Graph tags
        og_tags = {}
        for prop in ['og:title', 'og:description', 'og:type', 'og:url', 'og:image', 'og:locale', 'og:site_name']:
            el = page.locator(f'meta[property="{prop}"]')
            if el.count() > 0:
                og_tags[prop] = el.get_attribute('content')
        print(f"\n[4] OPEN GRAPH TAGS:")
        for tag, val in og_tags.items():
            print(f"    {tag}: {val}")
        og_missing = [t for t in ['og:title', 'og:description', 'og:type', 'og:url'] if t not in og_tags]
        print(f"    Status: {'PASS' if not og_missing else 'WARN - missing: ' + ', '.join(og_missing)}")
        
        # 5. Twitter Card tags
        twitter_tags = {}
        for name in ['twitter:card', 'twitter:title', 'twitter:description']:
            el = page.locator(f'meta[name="{name}"]')
            if el.count() > 0:
                twitter_tags[name] = el.get_attribute('content')
        print(f"\n[5] TWITTER CARD TAGS:")
        for tag, val in twitter_tags.items():
            print(f"    {tag}: {val}")
        twitter_missing = [t for t in ['twitter:card', 'twitter:title', 'twitter:description'] if t not in twitter_tags]
        print(f"    Status: {'PASS' if not twitter_missing else 'WARN - missing: ' + ', '.join(twitter_missing)}")
        
        # 6. Canonical URL
        canonical = page.locator('link[rel="canonical"]')
        if canonical.count() > 0:
            print(f"\n[6] CANONICAL URL: {canonical.get_attribute('href')}")
            print(f"    Status: PASS")
        else:
            print(f"\n[6] CANONICAL URL: NOT FOUND")
            print(f"    Status: WARN - missing")
        
        # 7. JSON-LD structured data
        jsonld = page.locator('script[type="application/ld+json"]')
        print(f"\n[7] JSON-LD STRUCTURED DATA:")
        if jsonld.count() > 0:
            for i in range(jsonld.count()):
                try:
                    data = json.loads(jsonld.nth(i).inner_text())
                    print(f"    Type: {data.get('@type', 'N/A')}")
                    print(f"    Name: {data.get('name', 'N/A')}")
                    print(f"    URL: {data.get('url', 'N/A')}")
                    print(f"    Status: PASS")
                except:
                    print(f"    Status: WARN - invalid JSON-LD")
        else:
            print(f"    Status: WARN - no JSON-LD found")
        
        # 8. H1 tags
        h1_count = page.locator('h1').count()
        print(f"\n[8] H1 TAGS: {h1_count}")
        if h1_count > 0:
            for i in range(min(h1_count, 3)):
                print(f"    H1 {i+1}: {page.locator('h1').nth(i).inner_text()[:80]}")
        print(f"    Status: {'PASS' if h1_count == 1 else 'WARN - should have exactly 1 H1'}")
        
        # 9. Image alt text check
        images = page.locator('img')
        img_count = images.count()
        imgs_with_alt = 0
        imgs_without_alt = []
        for i in range(img_count):
            img = images.nth(i)
            alt = img.get_attribute('alt')
            src = img.get_attribute('src') or ''
            if alt and alt.strip():
                imgs_with_alt += 1
            else:
                imgs_without_alt.append(src[:60])
        print(f"\n[9] IMAGE ALT TEXT:")
        print(f"    Total images: {img_count}")
        print(f"    With alt text: {imgs_with_alt}")
        print(f"    Without alt text: {len(imgs_without_alt)}")
        if imgs_without_alt:
            for src in imgs_without_alt[:5]:
                print(f"      - {src}")
        print(f"    Status: {'PASS' if len(imgs_without_alt) == 0 else 'WARN - missing alt text on ' + str(len(imgs_without_alt)) + ' images'}")
        
        # 10. robots.txt
        robots_resp = page.goto('http://localhost:3000/robots.txt')
        if robots_resp and robots_resp.status == 200:
            robots_content = robots_resp.body().decode()
            print(f"\n[10] ROBOTS.TXT:")
            print(f"    Status: PASS (found)")
            for line in robots_content.split('\n')[:10]:
                print(f"    {line.strip()}")
        else:
            print(f"\n[10] ROBOTS.TXT: NOT FOUND")
            print(f"    Status: WARN")
        
        # 11. Sitemap
        page.goto('http://localhost:3000')
        sitemap_resp = page.goto('http://localhost:3000/sitemap.xml')
        if sitemap_resp and sitemap_resp.status == 200:
            print(f"\n[11] SITEMAP.XML: PASS (found)")
        else:
            print(f"\n[11] SITEMAP.XML: NOT FOUND - WARN")
        
        # 12. Semantic HTML
        page.goto('http://localhost:3000')
        page.wait_for_load_state('networkidle')
        semantic_elements = {}
        for tag in ['header', 'main', 'footer', 'nav', 'section', 'article']:
            count = page.locator(tag).count()
            if count > 0:
                semantic_elements[tag] = count
        print(f"\n[12] SEMANTIC HTML:")
        for tag, count in semantic_elements.items():
            print(f"    <{tag}>: {count}")
        has_main = 'main' in semantic_elements
        has_nav = 'nav' in semantic_elements
        print(f"    Status: {'PASS' if has_main and has_nav else 'WARN - missing semantic elements'}")
        
        # 13. Language attribute
        html_lang = page.locator('html').get_attribute('lang')
        print(f"\n[13] HTML LANG ATTRIBUTE: {html_lang}")
        print(f"    Status: {'PASS' if html_lang else 'WARN - missing lang attribute'}")
        
        # 14. Heading hierarchy
        print(f"\n[14] HEADING HIERARCHY:")
        headings = page.locator('h1, h2, h3, h4, h5, h6')
        prev_level = 0
        hierarchy_ok = True
        for i in range(min(headings.count(), 30)):
            h = headings.nth(i)
            level = int(h.evaluate('el => el.tagName[1]'))
            text = h.inner_text()[:50]
            if level > prev_level + 1 and prev_level > 0:
                hierarchy_ok = False
                print(f"    H{level}: {text} [SKIP]")
            else:
                print(f"    H{level}: {text}")
            prev_level = level
        print(f"    Status: {'PASS' if hierarchy_ok else 'WARN - heading levels skipped'}")
        
        # 15. Check portfolio-pdf route
        page.goto('http://localhost:3000/portfolio-pdf')
        page.wait_for_timeout(1000)
        current_url = page.url
        print(f"\n[15] PORTFOLIO PDF ROUTE:")
        print(f"    Current URL: {current_url}")
        if '/portfolio-pdf' in current_url:
            print(f"    Status: PASS (accessible in dev mode)")
        else:
            print(f"    Redirected to: {current_url} (expected in production)")
        
        # 16. Page load performance
        page.goto('http://localhost:3000')
        perf_data = page.evaluate('''() => {
            const perf = performance.getEntriesByType('navigation')[0];
            return {
                domContentLoaded: Math.round(perf.domContentLoadedEventEnd - perf.startTime),
                loadComplete: Math.round(perf.loadEventEnd - perf.startTime),
                firstPaint: performance.getEntriesByName('first-paint')[0]?.startTime || 'N/A'
            };
        }''')
        print(f"\n[16] PERFORMANCE:")
        print(f"    DOM Content Loaded: {perf_data.get('domContentLoaded', 'N/A')}ms")
        print(f"    Load Complete: {perf_data.get('loadComplete', 'N/A')}ms")
        
        browser.close()
        
        print("\n" + "=" * 60)
        print("AUDIT COMPLETE")
        print("=" * 60)

if __name__ == '__main__':
    test_seo()
