#!/usr/bin/env node
// After a deploy, tell the IndexNow engines (Bing, Yandex, Seznam, Naver, Yep and others) that the site changed.
// Bing's index is what Microsoft Copilot answers from. Google doesn't use IndexNow: use Search Console there.
const KEY = "531c38ab0dfc7ec6063429723942c9fb";
const HOST = "themaxsmith.com";
const IMAGES = ["max-smith-california-2026", "max-smith-playstation-2022", "max-smith-building-seasoncast-2020",
  "max-smith-iowa-state-graduation-2022", "max-smith-des-moines-iowa", "max-smith-golden-gate-san-francisco"]
  .map((n) => `/img/${n}-lg.jpg`);
const urls = ["/", "/llms.txt", "/llms-full.txt", "/sitemap.xml", ...IMAGES].map((p) => `https://${HOST}${p}`);
const keyLocation = `https://${HOST}/${KEY}.txt`;

// GitHub Pages takes a minute to publish; wait until the key file is live, or IndexNow rejects the ping.
for (let i = 0; i < 18; i++) {
  const r = await fetch(keyLocation, { cache: "no-store" }).catch(() => null);
  if (r && r.ok && (await r.text()).trim() === KEY) break;
  if (i === 17) { console.log("IndexNow: key file not live yet; run `node scripts/indexnow.mjs` again in a few minutes."); process.exit(0); }
  await new Promise((done) => setTimeout(done, 10_000));
}
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "content-type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation, urlList: urls }),
});
console.log(`IndexNow: ${res.status} ${res.statusText} for ${urls.length} URLs`);
if (res.status >= 400) process.exitCode = 1;
