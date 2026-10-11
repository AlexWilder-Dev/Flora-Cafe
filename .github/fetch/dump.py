"""Prints Flora's brand CSS, page copy and menu text from florasw17.com into the job log."""
import collections, gzip, html, json, re, sys, urllib.parse, urllib.request
from html.parser import HTMLParser

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"
SITE = "https://florasw17.com/"


def get(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA, "Accept-Language": "en-GB,en;q=0.9", "Accept-Encoding": "gzip"})
    try:
        with urllib.request.urlopen(req, timeout=40) as r:
            body = r.read()
            if r.headers.get("Content-Encoding") == "gzip":
                body = gzip.decompress(body)
            return r.status, r.geturl(), body.decode("utf-8", "replace")
    except Exception as e:  # noqa: BLE001
        return getattr(e, "code", 0), url, f"ERROR {e}"


BLOCK = {"p", "div", "section", "article", "header", "footer", "nav", "li", "ul", "ol", "h1", "h2", "h3", "h4", "h5", "h6", "br", "tr", "td", "th", "table", "figure", "figcaption", "button", "a", "form", "label", "option", "dt", "dd"}
SKIP = {"script", "style", "noscript", "svg", "template", "iframe"}


class Text(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.out, self.skip, self.imgs, self.links, self.css, self.inline_css = [], 0, [], [], [], []
        self._style = False

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag in SKIP:
            self.skip += 1
            if tag == "style":
                self._style = True
        if tag in BLOCK:
            self.out.append("\n")
        if tag == "img":
            self.imgs.append((a.get("src") or a.get("data-src") or a.get("data-lazy-src"), a.get("alt"), a.get("width"), a.get("height")))
            if a.get("alt"):
                self.out.append(f" [img alt: {a.get('alt')}] ")
        if tag == "a" and a.get("href"):
            self.links.append((a.get("href"), ""))
        if tag == "link" and "stylesheet" in (a.get("rel") or "") or (tag == "link" and a.get("as") == "style"):
            self.css.append(a.get("href"))
        if a.get("style") and "background" in a["style"]:
            self.out.append(f" [bg-style: {a['style'][:200]}] ")

    def handle_endtag(self, tag):
        if tag in SKIP:
            self.skip = max(0, self.skip - 1)
            self._style = False
        if tag in BLOCK:
            self.out.append("\n")

    def handle_data(self, data):
        if self._style:
            self.inline_css.append(data)
            return
        if not self.skip:
            self.out.append(data)

    def text(self):
        t = "".join(self.out)
        t = re.sub(r"[ \t\r\f\v]+", " ", t)
        t = re.sub(r" *\n *", "\n", t)
        return re.sub(r"\n{2,}", "\n", t).strip()


def parse(body):
    p = Text()
    p.feed(body)
    return p


def section(title):
    print("\n" + "=" * 100 + f"\n### {title}\n" + "=" * 100, flush=True)


def css_report(css_text, label):
    section(f"CSS VARIABLES / FONTS: {label}")
    for m in sorted(set(re.findall(r"--e-global-(?:color|typography)-[\w-]+\s*:\s*[^;}]+", css_text))):
        print(m)
    fams = collections.Counter(f.strip() for f in re.findall(r"font-family\s*:\s*([^;}]+)", css_text))
    print("\n-- font-family counts --")
    for f, n in fams.most_common(30):
        print(n, f)
    cols = collections.Counter(c.lower() for c in re.findall(r"#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)", css_text))
    print("\n-- colour counts (top 40) --")
    for c, n in cols.most_common(40):
        print(n, c)


mode = sys.argv[1]

if mode == "brand":
    st, final, home = get(SITE)
    section(f"HOME status={st} final={final} bytes={len(home)}")
    p = parse(home)
    section("STYLESHEETS")
    for h in p.css:
        print(h)
    for g in re.findall(r"https?://fonts\.(?:googleapis|gstatic)\.com[^\"'\s)]+", home):
        print("GOOGLE FONTS:", html.unescape(g))
    all_css = "\n".join(p.inline_css)
    css_report(all_css, "inline <style> blocks on home")
    combined = all_css
    for h in p.css:
        if not h:
            continue
        url = urllib.parse.urljoin(final, html.unescape(h))
        if "elementor" in url or "fonts.googleapis" in url or "uploads" in url or "theme" in url or "hello" in url:
            s2, _, css = get(url)
            print(f"\n[fetched {s2}] {url} ({len(css)} bytes)")
            combined += "\n" + css
            if "elementor/css/post-" in url or "fonts.googleapis" in url or "custom" in url:
                css_report(css, url)
                if "fonts.googleapis" in url:
                    print(css[:3000])
    css_report(combined, "ALL COMBINED")
    section("ELEMENTOR KIT CSS RAW (post-*.css with e-global)")
    for h in p.css:
        if h and "elementor/css/post-" in h:
            _, _, css = get(urllib.parse.urljoin(final, html.unescape(h)))
            if "e-global" in css:
                print(css[:6000])
    section("BODY CLASSES / META")
    for m in re.findall(r"<body[^>]*>", home)[:1]:
        print(m)
    for m in re.findall(r"<meta[^>]+>", home):
        if any(k in m for k in ("description", "og:", "theme-color")):
            print(m)

elif mode == "pages":
    st, final, home = get(SITE)
    p = parse(home)
    urls = []
    for h, _ in p.links:
        u = urllib.parse.urljoin(final, html.unescape(h)).split("#")[0]
        if "florasw17.com" in u and u not in urls and not re.search(r"\.(webp|jpg|png|pdf)$|wp-json|feed|xmlrpc|wp-login|mailto", u):
            urls.append(u)
    for sm in ("wp-sitemap.xml", "sitemap_index.xml", "page-sitemap.xml", "wp-sitemap-posts-page-1.xml"):
        s2, _, xml = get(SITE + sm)
        section(f"SITEMAP {sm} status={s2}")
        locs = re.findall(r"<loc>([^<]+)</loc>", xml)
        print("\n".join(locs))
        for loc in locs:
            if loc.endswith(".xml"):
                _, _, sub = get(loc)
                for l2 in re.findall(r"<loc>([^<]+)</loc>", sub):
                    print("  ", l2)
                    if l2 not in urls and "florasw17.com" in l2:
                        urls.append(l2)
            elif loc not in urls:
                urls.append(loc)
    section("PAGES TO DUMP")
    print("\n".join(urls))
    section("HOMEPAGE IMAGES (src | alt | w x h)")
    for src, alt, w, h in p.imgs:
        print(f"{src} | {alt} | {w}x{h}")
    for m in sorted(set(re.findall(r"https?://florasw17\.com/wp-content/uploads/[^\"'\s)]+\.(?:webp|jpe?g|png|gif|svg|mp4)", home))):
        print("ASSET:", m)
    for u in urls[:30]:
        s2, f2, body = get(u)
        section(f"PAGE TEXT {u} status={s2}")
        q = parse(body)
        print(q.text())
        pc = [h for h in q.css if h and "elementor/css/post-" in h]
        print("\n[page css]", pc)
        for h in pc:
            _, _, css = get(urllib.parse.urljoin(f2, html.unescape(h)))
            cols = collections.Counter(c.lower() for c in re.findall(r"#[0-9a-fA-F]{3,8}\b|rgba?\([^)]*\)", css))
            fams = collections.Counter(x.strip() for x in re.findall(r"font-family\s*:\s*([^;}]+)", css))
            print("[colours]", cols.most_common(20))
            print("[fonts]", fams.most_common(10))

elif mode == "thirdparty":
    for u in ("https://www.opentable.co.uk/r/flora-cafe-tooting-market-london", "https://deliveroo.co.uk/menu/london/tooting/flora-tooting-market"):
        s2, f2, body = get(u)
        section(f"THIRD PARTY {u} status={s2} final={f2} bytes={len(body)}")
        q = parse(body)
        print(q.text()[:20000])
        for kw in ("Sauvignon", "Rioja", "Tempranillo", "Prosecco", "Rosado", "description", "Happy Hour", "Bottomless"):
            for m in list(re.finditer(kw, body))[:6]:
                s = body[max(0, m.start() - 250): m.end() + 250]
                print(f"\n[{kw}] ...{s}...")
