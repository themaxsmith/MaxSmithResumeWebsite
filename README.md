# themaxsmith.com

Personal site of Max Smith: one static page, one typeface, one moment of motion. No framework and no build step, so search engines and AI answer engines read the full page without running JavaScript.

## Layout

| Path | What it is |
| --- | --- |
| `site/index.html` | The page, including meta tags and `Person` / `ProfilePage` structured data |
| `site/styles.css` | All styles. Light and dark follow the system; motion respects reduced-motion |
| `site/main.js` | Email link assembly, footer year, print opens every role |
| `site/img/` | Graded portrait (`max-smith-480/800`, WebP + JPEG) and the social card `og.jpg` |
| `site/llms.txt`, `robots.txt`, `sitemap.xml` | What crawlers and AI assistants read |
| `scripts/check.mjs` | Pre-publish check: guardrails plus search basics. Exits 1 on any failure |
| `scripts/guardrails.json` | Words and patterns that must never appear on the public site |

## Commands

```sh
npm run serve    # http://localhost:8080
npm run check    # guardrails + SEO basics; CI runs this on every push
npm run deploy   # check, then publish site/ to the gh-pages branch (themaxsmith.com)
```

## Rules for anything public (Max works at Apple)

- The Apple role is title, city and dates only. No team, project, tool or product names, nothing unannounced, no Apple logos or imagery, nothing that reads as speaking for Apple.
- SeasonCast is shown as past work (2019–2024) with no store or company links.
- No phone number, and the email address is assembled in JavaScript.
- Add a pattern to `scripts/guardrails.json` before adding new content of a new kind. `npm run check` must pass before `npm run deploy`.
- Publishing (`npm run deploy`, merging to `master`) is Max's call.

## After the first deploy

1. Add `https://themaxsmith.com` as the website on LinkedIn, GitHub and Instagram. These links do more for name searches than anything on the page.
2. Verify the domain in Google Search Console and Bing Webmaster Tools and submit `sitemap.xml`.
3. Use one name everywhere: "Max Smith" as the display name, "Maxwell Smith" where a legal name is expected.
