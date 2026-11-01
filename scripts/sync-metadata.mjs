import { readFile, writeFile } from 'node:fs/promises';
import config from '../dist/assets/config.js';
import { robotsValue, safeExternalUrl } from '../dist/assets/core.js';
const filename = new URL('../dist/index.html', import.meta.url);
const escape = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
let html = await readFile(filename, 'utf8');
html = html.replace(/<title>.*?<\/title>/, () => `<title>${escape(config.seo.title)}</title>`);
const update = (attribute, key, value) => { html = html.replace(new RegExp(`<meta ${attribute}="${key}" content="[^"]*">`), () => `<meta ${attribute}="${key}" content="${escape(value)}">`); };
update('name', 'description', config.seo.description); update('name', 'robots', robotsValue(config)); update('name', 'theme-color', config.theme.dark);
update('property', 'og:title', config.seo.title); update('property', 'og:description', config.seo.description);
const site = safeExternalUrl(config.seo.siteUrl);
update('property', 'og:image', site ? new URL(config.seo.image, site).href : config.seo.image);
html = html.replace(/\n  <link rel="canonical"[^>]*>/g, '').replace(/\n  <meta property="og:url"[^>]*>/g, '');
if (site) html = html.replace('</head>', () => `  <link rel="canonical" href="${escape(site)}">\n  <meta property="og:url" content="${escape(site)}">\n</head>`);
// Gera os fallbacks estáticos a partir da mesma configuração usada pelo navegador.
html = html.replace(/(<(p|span|h1|h2|h3|label|button)\b[^>]*\bdata-copy="([^"]+)"[^>]*>)([^<]*)(<\/\2>)/g,
  (all, opening, tag, key, previous, closing) => typeof config.copy[key] === 'string' ? `${opening}${escape(config.copy[key])}${closing}` : all);
html = html.replace(/<img\b[^>]*\bdata-brand="([^"]+)"[^>]*>/g, (tag, key) => {
  let updated = tag.replace(/src="[^"]*"/, `src="${escape(config.brand[key])}"`);
  if (!/alt=""/.test(updated)) updated = updated.replace(/alt="[^"]*"/, `alt="${escape(config.business.name)}"`);
  return updated;
});
html = html.replace(/(<div class="noscript-note">)[\s\S]*?(<\/div>)/, (_, opening, closing) => `${opening}${escape(config.copy.noScript)}${closing}`);
await writeFile(filename, html, 'utf8');
console.log(`Metadados sincronizados. Robots: ${robotsValue(config)}`);
