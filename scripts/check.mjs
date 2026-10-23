#!/usr/bin/env node
// Pre-publish check for themaxsmith.com. Zero dependencies: `node scripts/check.mjs`.
// 1. Guardrails: nothing confidential, private or Apple-branded on the public site.
// 2. Search basics: title, description, canonical, structured data, sitemap, images.
// Exit code 1 on any failure, so CI and agents can gate on it.

import { readFileSync, readdirSync, existsSync, statSync } from "node:fs";
import { join, dirname, relative, extname, basename } from "node:path";
import { homedir } from "node:os";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const site = join(root, "site");
const rules = JSON.parse(readFileSync(join(root, "scripts", "guardrails.json"), "utf8"));
const html = readFileSync(join(site, "index.html"), "utf8");

// Private terms never live in this public repo. CI runs the public rules only;
// local and agent runs also load the private list. `--require-private` (used by deploy) fails without it.
const privatePath = process.env.THEMAXSMITH_PRIVATE_GUARDRAILS ||
  join(homedir(), ".config", "themaxsmith", "guardrails.private.json");
const privateRules = existsSync(privatePath) ? JSON.parse(readFileSync(privatePath, "utf8")).forbidden || [] : null;

const failures = [];
const passes = [];
const check = (ok, label, detail = "") => (ok ? passes : failures).push(detail ? `${label}: ${detail}` : label);

// ---------- 1. guardrails ----------
const walk = (dir) => readdirSync(dir, { withFileTypes: true })
  .flatMap((e) => (e.isDirectory() ? walk(join(dir, e.name)) : [join(dir, e.name)]));
const files = walk(site);
const TEXT = new Set([".html", ".css", ".js", ".txt", ".xml", ".svg", ".webmanifest", ".json", ""]);
const textFiles = [...files.filter((f) => TEXT.has(extname(f))), join(root, "README.md")];

// Match raw source and a normalized reading of it, so entities, tags, CSS escapes,
// non-breaking spaces and look-alike hyphens can't hide a term.
const NAMED = { nbsp: " ", amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", rsquo: "’", lsquo: "‘", ndash: "–", mdash: "—", hyphen: "-", shy: "" };
const decode = (t) => t
  .replace(/&#x([0-9a-f]+);?/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);?/g, (_, d) => String.fromCodePoint(Number(d)))
  .replace(/&([a-z]+);/gi, (m, n) => NAMED[n.toLowerCase()] ?? m)
  .replace(/\\([0-9a-f]{4,6})\s?/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)));
const normalize = (t) => decode(t).replace(/<[^>]+>/g, " ").normalize("NFKC")
  .replace(/[­​-‍⁠]/g, "").replace(/[‐-―−]/g, "-").replace(/\s+/g, " ");

const scan = (list, privateList) => {
  for (const path of textFiles) {
    const file = relative(root, path);
    const raw = readFileSync(path, "utf8");
    const views = [raw, normalize(raw)];
    list.forEach(({ pattern, reason }, n) => {
      const re = new RegExp(pattern, "iu");
      const m = views.map((v) => v.match(re)).find(Boolean);
      // private hits are reported by rule number only, so CI logs never echo a private term
      const label = privateList ? `private guardrail #${n + 1} in ${file}` : `guardrail ${file} /${pattern}/`;
      check(!m, label, m ? (privateList ? "matched" : `found "${m[0]}" (${reason})`) : "");
    });
  }
};
scan(rules.forbidden, false);
if (privateRules) scan(privateRules, true);
if (process.argv.includes("--require-private")) {
  check(Boolean(privateRules), "private guardrails loaded (required for deploy)", privateRules ? "" : `missing ${privatePath}`);
}

// Every mention of the current employer, in any public file, in visible text, metadata or alt text,
// must be one of the approved sentences.
const withAttrs = (raw) => raw + "\n" + [...raw.matchAll(/\b(?:content|alt|title|aria-label|aria-description)="([^"]*)"/g)].map((m) => m[1]).join("\n");
const allowedMentions = rules.employer_mentions_allowed || {};
for (const path of textFiles) {
  const file = relative(site, path);
  if (file.startsWith("..")) continue;                                  // README documents the rules
  let text = normalize(withAttrs(readFileSync(path, "utf8")));
  for (const phrase of allowedMentions[file] || []) {
    check(text.includes(phrase), `approved employer mention still present in ${file}`, phrase);
    text = text.split(phrase).join(" ");
  }
  const extra = text.match(/.{0,40}\bApple\b.{0,40}/u);
  check(!extra, `no unapproved employer mention in ${file}`, extra ? `"${extra[0].trim()}" (add to employer_mentions_allowed only with Max's OK)` : "");
}

// Nothing hidden ships: dotfiles, design sources, source maps, photo metadata.
for (const f of files) {
  const name = relative(site, f);
  check(!basename(f).startsWith(".") || name === ".nojekyll", "no dotfiles in site/", name);
  check(![".psd", ".map", ".ai", ".sketch", ".fig"].includes(extname(f)), "no design sources or source maps in site/", name);
  if ([".jpg", ".jpeg", ".webp", ".png"].includes(extname(f))) {
    check(!imageMetadata(readFileSync(f), extname(f)), "image has no EXIF/GPS/XMP metadata", name);
  }
}

if (rules.employer_role_must_be_bare) {
  // The current employer's role is title, place and dates only: no expandable details.
  const org = rules.employer_role_must_be_bare;
  const li = [...html.matchAll(/<li class="(?:role|chapter)[^"]*">([\s\S]*?)<\/li>\s*(?=<li|<\/ol>)/g)].map((m) => m[1]);
  const role = li.find((x) => x.includes(`role-org">${org}<`) || x.includes(`ch-title">${org}<`));
  check(Boolean(role), `${org} role present`);
  check(role && !/<details|role-desc|ch-note|class="(?:facts|steps|jobs)"/.test(role), `${org} role has no details`);
}

// ---------- 2. search basics ----------
const tag = (re) => (html.match(re) || [])[1];
const title = tag(/<title>([^<]*)<\/title>/);
check(Boolean(title) && /Max Smith/.test(title), "title names Max Smith", title);
check(title && title.length <= 65, "title length ≤ 65", `${title?.length}`);

const desc = tag(/<meta name="description" content="([^"]*)"/);
check(desc && desc.length >= 70 && desc.length <= 160, "description 70–160 chars", `${desc?.length}`);
for (const word of ["Max", "Smith", "Maxwell", "Mountain View", "Bay Area", "Iowa", "San Francisco"]) {
  check(desc?.includes(word), `description mentions ${word}`);
}

const canonical = tag(/<link rel="canonical" href="([^"]*)"/);
check(canonical === "https://themaxsmith.com/", "canonical is https://themaxsmith.com/", canonical);

const h1s = html.match(/<h1[\s>]/g) || [];
check(h1s.length === 1, "exactly one h1", `${h1s.length}`);
check(/<h1[^>]*>[\s\S]*Max[\s\S]*Smith[\s\S]*<\/h1>/.test(html), "h1 reads Max Smith");

for (const img of html.match(/<img\b[^>]*>/g) || []) {
  check(/\balt="[^"]+"/.test(img), "img has alt", img.slice(0, 60));
  check(/\bwidth="\d+"/.test(img) && /\bheight="\d+"/.test(img), "img has width and height", img.slice(0, 60));
}

const ld = tag(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
let graph = [];
try {
  graph = JSON.parse(ld)["@graph"] || [];
  check(true, "JSON-LD parses");
} catch (e) {
  check(false, "JSON-LD parses", e.message);
}
const person = graph.find((n) => n["@type"] === "Person");
check(graph.some((n) => n["@type"] === "ProfilePage"), "JSON-LD has ProfilePage");
check(person?.name === "Max Smith", "Person.name is Max Smith");
check(person?.alternateName?.includes("Maxwell Smith"), "Person.alternateName has Maxwell Smith");
check((person?.sameAs || []).length >= 2, "Person.sameAs has profiles");

// Google only uses structured data that matches what a visitor can see.
const visible = normalize(html.slice(html.indexOf("<body")));
for (const o of [person?.worksFor, ...(person?.alumniOf || []), ...[].concat(person?.memberOf || [])].filter(Boolean)) {
  check([o.name, ...[].concat(o.alternateName || [])].some((n) => n && visible.includes(n)), "JSON-LD organization is visible on the page", o.name);
}
for (const a of [].concat(person?.award || [])) check(visible.includes(a), "JSON-LD award is visible on the page", a);
check(graph.some((n) => n["@type"] === "WebSite" && n.name === "Max Smith"), "JSON-LD WebSite names the site Max Smith");
check((person?.image || []).length >= 3, "Person has square, 4:3 and 16:9 images");
check(!/\b(AI|LLMs?|agents?)\b/.test(JSON.stringify(person || {})), "Person data has no AI wording");

// every local asset the page references exists
const refs = [...html.matchAll(/(?:href|src|srcset|imagesrcset|content)="([^"]+)"/g)]
  .flatMap((m) => m[1].split(",").map((s) => s.trim().split(/\s+/)[0]))
  .map((u) => u.replace(/^https:\/\/themaxsmith\.com/, ""))
  .filter((u) => u.startsWith("/") && !u.startsWith("//") && u !== "/");
for (const ref of new Set(refs)) {
  const p = join(site, ref);
  check(existsSync(p) && statSync(p).isFile(), `asset exists ${ref}`);
}

const sitemap = readFileSync(join(site, "sitemap.xml"), "utf8");
check(sitemap.includes(`<loc>${canonical}</loc>`), "sitemap lists the canonical URL");
const lastmod = (sitemap.match(/<lastmod>([^<]+)<\/lastmod>/) || [])[1];
const modified = (graph.find((n) => n["@type"] === "ProfilePage") || {}).dateModified;
check(lastmod && lastmod === modified, "sitemap lastmod matches JSON-LD dateModified", `${lastmod} vs ${modified}`);
check(/Sitemap: https:\/\/themaxsmith\.com\/sitemap\.xml/.test(readFileSync(join(site, "robots.txt"), "utf8")), "robots.txt points to sitemap");
check(readFileSync(join(site, "CNAME"), "utf8").trim() === "themaxsmith.com", "CNAME is themaxsmith.com");

// Crawlers and assistants: nothing blocked, the files they read exist and link to real files.
const robots = readFileSync(join(site, "robots.txt"), "utf8");
check(!/^\s*Disallow:\s*\/\S*\s*$/m.test(robots), "robots.txt blocks nothing");
for (const bot of ["Googlebot", "Bingbot", "Applebot", "OAI-SearchBot", "Claude-SearchBot", "PerplexityBot"]) check(robots.includes(bot), `robots.txt allows ${bot}`);
const llms = readFileSync(join(site, "llms.txt"), "utf8");
check(/^# Max Smith\n\n> /.test(llms), "llms.txt opens with # Max Smith and a summary");
const llmsFull = existsSync(join(site, "llms-full.txt")) ? readFileSync(join(site, "llms-full.txt"), "utf8") : "";
check(Boolean(llmsFull), "llms-full.txt exists");
const ownUrls = [ld, sitemap, llms, llmsFull]
  .flatMap((t) => [...t.matchAll(/https:\/\/themaxsmith\.com(\/[^\s"<>)#]*)/g)].map((m) => m[1].replace(/[.,;:]+$/, "")))
  .filter((u) => u !== "/");
for (const u of new Set(ownUrls)) check(existsSync(join(site, u)) && statSync(join(site, u)).isFile(), `linked file exists ${u}`);
const key = (readFileSync(join(root, "scripts", "indexnow.mjs"), "utf8").match(/const KEY = "([0-9a-f]{32})"/) || [])[1];
check(Boolean(key) && existsSync(join(site, `${key}.txt`)) && readFileSync(join(site, `${key}.txt`), "utf8").trim() === key, "IndexNow key file matches the deploy script");

const weight = ["index.html", "styles.css", "main.js", "fonts/host-grotesk.woff2"]
  .reduce((n, f) => n + statSync(join(site, f)).size, 0);
check(weight < 200_000, "first view under 200 KB", `${Math.round(weight / 1024)} KB`);


// Walk the container format instead of grepping bytes, so compressed data can't false-positive.
function imageMetadata(buf, ext) {
  if (ext === ".jpg" || ext === ".jpeg") {
    for (let i = 2; i + 4 < buf.length && buf[i] === 0xff; ) {
      const marker = buf[i + 1], len = buf.readUInt16BE(i + 2);
      if (marker === 0xda) break;                                  // start of scan: no more headers
      const body = buf.subarray(i + 4, i + 2 + len).toString("latin1");
      if (marker === 0xe1 && (body.startsWith("Exif\0\0") || body.includes("ns.adobe.com/xap"))) return "EXIF/XMP";
      i += 2 + len;
    }
    return null;
  }
  if (ext === ".webp") {
    for (let i = 12; i + 8 <= buf.length; ) {
      const id = buf.toString("latin1", i, i + 4), len = buf.readUInt32LE(i + 4);
      if (id === "EXIF" || id === "XMP ") return id;
      i += 8 + len + (len & 1);
    }
    return null;
  }
  if (ext === ".png") {
    for (let i = 8; i + 8 <= buf.length; ) {
      const len = buf.readUInt32BE(i), id = buf.toString("latin1", i + 4, i + 8);
      if (id === "eXIf") return id;
      if ((id === "iTXt" || id === "tEXt") && buf.toString("latin1", i + 8, i + 8 + Math.min(len, 40)).includes("XML:com.adobe.xmp")) return "XMP";
      i += 12 + len;
    }
    return null;
  }
  return null;
}

// ---------- report ----------
for (const f of failures) console.log(`FAIL  ${f}`);
console.log(privateRules ? `private guardrails: ${privateRules.length} rules loaded` : "private guardrails: not found, public rules only");
console.log(`${passes.length} passed, ${failures.length} failed`);
process.exit(failures.length ? 1 : 0);
