// Adaptações Cult UI — Copyright (c) 2023 Jordan-Gilliam, MIT.
// Licença distribuída em assets/licenses/cult-ui-MIT.txt.
import config from './config.js';
import { contactDestination, validateContact, mapsUrl, safeExternalUrl, formatPrice, robotsValue, servicesForCategory, formatServicePrice } from './core.js';

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const text = (selector, value) => { const node = $(selector); if (node) node.textContent = value; };
const make = (tag, className, value) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (value != null) node.textContent = value;
  return node;
};
function priceNode(service, className = '') {
  const node = make('span', className);
  if (service.fromPrice) node.append(make('small', 'price-prefix', config.copy.priceFrom));
  node.append(make('span', '', formatPrice(service.price)));
  return node;
}

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
function setImage(node, item) {
  node.src = item.src; node.alt = item.alt; node.width = item.width; node.height = item.height;
  if (item.position) node.style.objectPosition = item.position;
}

// A configuração é a única fonte de conteúdo do negócio.
$$('[data-copy]').forEach(node => { const value = config.copy[node.dataset.copy]; if (typeof value === 'string') node.textContent = value; });
$$('[data-demo]').forEach(node => { node.hidden = !config.demoMode; });
$$('[data-illustrative]').forEach(node => { node.hidden = !config.images.illustrative; });
$$('[data-brand]').forEach(node => {
  node.src = config.brand[node.dataset.brand];
  const isLogo = node.dataset.brand.startsWith('logo');
  node.width = isLogo ? config.brand.logoWidth : config.brand.symbolWidth;
  node.height = isLogo ? config.brand.logoHeight : config.brand.symbolHeight;
  if (node.alt) node.alt = config.business.name;
});
Object.entries(config.theme).forEach(([key, value]) => {
  if (/^#[\da-f]{6}$/i.test(value)) document.documentElement.style.setProperty(`--${key.replace(/[A-Z]/g, char => `-${char.toLowerCase()}`)}`, value);
});
document.title = config.seo.title;
$('meta[name="description"]').content = config.seo.description;
$('meta[name="robots"]').content = robotsValue(config);
$('meta[name="theme-color"]').content = config.theme.dark;
$('meta[property="og:title"]').content = config.seo.title;
$('meta[property="og:description"]').content = config.seo.description;
$('link[rel="icon"]').href = config.brand.favicon;
const publicUrl = safeExternalUrl(config.seo.siteUrl);
if (publicUrl) {
  const canonical = $('link[rel="canonical"]') || make('link'); canonical.rel = 'canonical'; canonical.href = publicUrl;
  if (!canonical.isConnected) document.head.append(canonical);
  const ogUrl = $('meta[property="og:url"]') || make('meta'); ogUrl.setAttribute('property', 'og:url'); ogUrl.content = publicUrl;
  if (!ogUrl.isConnected) document.head.append(ogUrl);
}
$('meta[property="og:image"]').content = publicUrl ? new URL(config.seo.image, publicUrl).href : config.seo.image;
$('.brand').setAttribute('aria-label', `${config.business.name} — ${config.copy.homeLabel}`);
$('.footer-brand').setAttribute('aria-label', `${config.business.name} — ${config.copy.homeLabel}`);
$('.main-nav').setAttribute('aria-label', config.copy.navLabel);
for (const item of config.copy.navigation) {
  const link = make('a', '', item.label); link.href = item.href; $('.main-nav').append(link);
  if (item.href !== '#inicio') { const footerLink = make('a', '', item.label); footerLink.href = item.href; $('#footer-nav').append(footerLink); }
}
setImage($('#hero-image'), config.images.hero);
config.copy.heroBottom.forEach(item => $('#hero-bottom').append(make('span', '', item)));

const serviceSelect = $('#service');
serviceSelect.options[0].textContent = config.copy.servicePlaceholder;
const serviceButtons = new Map();
const serviceRows = new Map();
let selectedService = '';

function focusContact() {
  $('#contato').scrollIntoView({ behavior: reducedMotion() ? 'instant' : 'smooth', block: 'start' });
  $('#name').focus({ preventScroll: true });
  history.replaceState(null, '', '#contato');
}
function selectService(id, advance = false) {
  selectedService = config.services.some(item => item.id === id) ? id : '';
  serviceSelect.value = selectedService;
  serviceButtons.forEach((button, key) => {
    const selected = selectedService === key;
    button.setAttribute('aria-pressed', String(selected));
    const label = selected ? config.copy.selectedService : config.copy.selectService;
    button.setAttribute('aria-label', `${label} ${config.services.find(item => item.id === key).name}`);
    button.children[0].textContent = label; button.children[1].textContent = selected ? '✓' : '↗';
  });
  $('#featured-select').setAttribute('aria-pressed', String(selectedService === config.featuredService.serviceId));
  if (selectedService) {
    clearFieldError('service');
    text('#service-status', config.copy.serviceStatus.replace('{service}', config.services.find(item => item.id === id).name));
  }
  if (advance) focusContact();
}
config.services.forEach((service, index) => {
  const row = make('article', 'service-row'); row.dataset.serviceId = service.id;
  const information = make('div', 'service-information');
  information.append(make('h3', '', service.name), make('p', '', service.description));
  const button = make('button', 'service-select'); button.type = 'button'; button.setAttribute('aria-pressed', 'false');
  button.setAttribute('aria-label', `${config.copy.selectService} ${service.name}`);
  const arrow = make('span', '', '↗'); arrow.setAttribute('aria-hidden', 'true');
  button.append(make('span', '', config.copy.selectService), arrow);
  button.addEventListener('click', () => selectService(service.id, true));
  row.append(make('span', 'service-index', String(index + 1).padStart(2, '0')), information, priceNode(service, 'service-price'), button);
  serviceButtons.set(service.id, button); serviceRows.set(service.id, row); $('#service-list').append(row);
  const option = make('option', '', `${service.name} — ${formatServicePrice(service, config.copy.priceFrom)}`); option.value = service.id; serviceSelect.append(option);
});
serviceSelect.addEventListener('change', () => selectService(serviceSelect.value));

// Halo Tabs: adaptação local da variante underline (Cult UI, MIT).
const tabs = $('#service-tabs');
tabs.setAttribute('aria-label', config.copy.categoriesLabel);
const tabButtons = [];
function updateIndicator() {
  const active = tabs.querySelector('[aria-selected="true"]');
  if (!active) return;
  tabs.style.setProperty('--active-tab-left', `${active.offsetLeft}px`);
  tabs.style.setProperty('--active-tab-width', `${active.offsetWidth}px`);
}
function activateCategory(category, moveFocus = false) {
  const visible = servicesForCategory(config.services, category.id);
  const ids = new Set(visible.map(item => item.id));
  serviceRows.forEach((row, id) => { row.hidden = !ids.has(id); });
  tabButtons.forEach(button => {
    const active = button.dataset.category === category.id;
    button.setAttribute('aria-selected', String(active)); button.tabIndex = active ? 0 : -1;
    if (active && moveFocus) button.focus();
  });
  $('#services-panel').setAttribute('aria-labelledby', `tab-${category.id}`);
  const status = visible.length === 1 ? config.copy.categoryStatusSingle : config.copy.categoryStatus;
  text('#category-status', status.replace('{count}', visible.length).replace('{category}', category.label));
  updateIndicator();
}
config.serviceCategories.forEach((category, index) => {
  const button = make('button', 'halo-tab', category.label); button.type = 'button';
  button.id = `tab-${category.id}`; button.dataset.category = category.id; button.setAttribute('role', 'tab');
  button.setAttribute('aria-controls', 'services-panel'); button.setAttribute('aria-selected', String(index === 0)); button.tabIndex = index === 0 ? 0 : -1;
  button.addEventListener('click', () => activateCategory(category));
  button.addEventListener('keydown', event => {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % tabButtons.length;
    if (event.key === 'ArrowLeft') next = (index - 1 + tabButtons.length) % tabButtons.length;
    if (event.key === 'Home') next = 0;
    if (event.key === 'End') next = tabButtons.length - 1;
    if (next !== undefined) { event.preventDefault(); activateCategory(config.serviceCategories[next], true); }
  });
  tabs.append(button); tabButtons.push(button);
});
activateCategory(config.serviceCategories[0]);
new ResizeObserver(updateIndicator).observe(tabs);
document.fonts.ready.then(updateIndicator);

// Organic Card: imagem, corpo, faixa SVG e rodapé do componente oficial, sem React.
const featured = config.services.find(item => item.id === config.featuredService.serviceId);
$('#featured-service').hidden = !featured;
if (featured) {
  setImage($('#featured-image'), config.featuredService.image);
  text('#featured-eyebrow', config.featuredService.eyebrow); text('#featured-title', featured.name);
  $('#featured-price').replaceChildren(...priceNode(featured).childNodes); text('#featured-description', config.featuredService.description);
  text('#featured-select > span', config.featuredService.action); text('#featured-footer', config.featuredService.footer);
  // A marca compacta continua sendo a imagem fornecida, sem redesenho tipográfico.
  const symbol = make('img'); symbol.src = config.brand.symbolDark; symbol.alt = ''; symbol.width = config.brand.symbolWidth; symbol.height = config.brand.symbolHeight;
  $('#featured-monogram').append(symbol);
  $('#featured-select').setAttribute('aria-pressed', 'false');
  $('#featured-select').addEventListener('click', () => selectService(featured.id, true));
}
config.copy.aboutDetails.forEach(item => { $('#about-details').append(make('dt', '', item.title), make('dd', '', item.description)); });

// Geometria de CutoutCorner derivada do código Cult UI. Licença em licenses/.
function cutoutCorner() {
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); svg.setAttribute('viewBox', '0 0 200 200'); svg.setAttribute('aria-hidden', 'true'); svg.classList.add('cutout-corner');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path'); path.setAttribute('d', 'M0 200C155.996 199.961 200.029 156.308 200 0V200H0Z'); path.setAttribute('fill', 'currentColor'); svg.append(path); return svg;
}
config.images.gallery.forEach(item => {
  const figure = make('figure', 'gallery-item');
  const button = make('button', `gallery-open${item.cutout ? ' cutout-card' : ''}`); button.type = 'button';
  button.setAttribute('aria-label', `${config.copy.galleryEnlarge} ${item.label}`);
  if (item.cutout) button.dataset.component = 'cutout-card';
  const img = make('img'); setImage(img, item); img.loading = 'lazy'; img.decoding = 'async';
  const arrow = make('span', 'gallery-arrow', '↗'); arrow.setAttribute('aria-hidden', 'true');
  button.append(img, arrow);
  if (item.cutout) { const label = make('span', 'cutout-label', item.label); label.append(cutoutCorner()); button.append(label); }
  const caption = make('figcaption');
  if (!item.cutout) caption.append(make('span', '', item.label));
  caption.append(make('small', '', item.detail));
  figure.append(button, caption); $('#gallery').append(figure);
  button.addEventListener('click', () => {
    setImage($('#gallery-full'), item);
    text('#gallery-caption', [item.label, config.images.illustrative ? config.copy.illustrativeLabel : '', item.credit].filter(Boolean).join(' • '));
    openDialog($('#gallery-dialog'));
  });
});
text('#address', config.location.address || config.copy.addressFallback);
text('#city', config.location.city); $('#city').hidden = !config.location.city;
text('#location-note', config.location.note);
config.hours.forEach(item => { $('#hours-list').append(make('dt', '', item.days), make('dd', '', item.time)); });
const maps = mapsUrl(config);
if (maps) { $('#maps-link').href = maps; $('#maps-link').hidden = false; }
const instagram = safeExternalUrl(config.contact.instagram, 'instagram.com');
if (instagram) { $('#instagram-link').href = instagram; $('#instagram-link').hidden = false; }
if (config.location.address) {
  text('#location-concept', config.business.name);
  text('#location-placeholder', [config.location.address, config.location.city].filter(Boolean).join(' • '));
}
const credit = $('#nofer-credit'); credit.hidden = !config.credit.enabled;
if (config.credit.enabled) {
  credit.append(document.createTextNode(`${config.credit.prefix} `));
  const url = safeExternalUrl(config.credit.url);
  const name = make(url ? 'a' : 'strong', '', config.credit.name); if (url) name.href = url; credit.append(name);
}
$('#name').placeholder = config.copy.namePlaceholder; $('#message').placeholder = config.copy.messagePlaceholder;
$('#gallery-dialog').setAttribute('aria-label', config.copy.galleryDialogLabel);
$$('.dialog-close').forEach(button => button.setAttribute('aria-label', button.closest('#gallery-dialog') ? config.copy.galleryClose : config.copy.closeLabel));

// Diálogos: fundo inerte, ciclo de foco, Escape e retorno ao acionador.
let dialogOpener;
function openDialog(dialog) { dialogOpener = document.activeElement; dialog.showModal(); document.body.classList.add('modal-open'); }
$$('dialog').forEach(dialog => {
  dialog.querySelectorAll('[data-close]').forEach(button => button.addEventListener('click', () => dialog.close()));
  dialog.addEventListener('keydown', event => {
    if (event.key !== 'Tab') return;
    const controls = [...dialog.querySelectorAll('button:not([disabled]), [href], input, select, textarea, [tabindex="0"]')].filter(node => node.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  });
  dialog.addEventListener('click', event => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); dialogOpener?.focus(); });
});
function requestContact(fields) {
  const result = contactDestination(config, fields);
  if (result.mode === 'preview') {
    text('#message-preview', result.message); text('#preview-explanation', config.demoMode ? config.copy.previewDemoNote : config.copy.previewMissingNote);
    openDialog($('#message-dialog'));
  } else window.location.assign(result.url);
}
function clearFieldError(id) { $(`#${id}`).removeAttribute('aria-invalid'); $(`#${id}-error`).hidden = true; }
$('#name').addEventListener('input', () => { if ($('#name').value.trim().length >= 2) clearFieldError('name'); });
$('#contact-form').addEventListener('submit', event => {
  event.preventDefault();
  const fields = { name: $('#name').value, serviceId: serviceSelect.value, message: $('#message').value };
  const errors = validateContact(config, fields); let firstInvalid;
  for (const [key, id] of [['name', 'name'], ['serviceId', 'service']]) {
    clearFieldError(id);
    if (errors[key]) { text(`#${id}-error`, errors[key]); $(`#${id}-error`).hidden = false; $(`#${id}`).setAttribute('aria-invalid', 'true'); firstInvalid ||= $(`#${id}`); }
  }
  $('#form-alert').hidden = !firstInvalid;
  if (firstInvalid) { text('#form-alert', config.copy.validationSummary); firstInvalid.focus(); return; }
  text('#form-status', config.copy.formStatus); requestContact(fields);
});

const menu = $('.menu-toggle');
function closeMenu() { menu.setAttribute('aria-expanded', 'false'); $('.main-nav').classList.remove('is-open'); text('.menu-toggle [data-copy]', config.copy.menuOpen); }
menu.addEventListener('click', () => {
  const isOpen = menu.getAttribute('aria-expanded') !== 'true';
  menu.setAttribute('aria-expanded', String(isOpen)); $('.main-nav').classList.toggle('is-open', isOpen);
  text('.menu-toggle [data-copy]', isOpen ? config.copy.menuClose : config.copy.menuOpen);
});
$$('.main-nav a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') { closeMenu(); menu.focus(); } });
document.addEventListener('click', event => { if (!event.target.closest('.header-inner')) closeMenu(); });
window.matchMedia('(max-width: 1000px)').addEventListener('change', closeMenu);
$$('a[href="#contato"]').forEach(link => link.addEventListener('click', event => { event.preventDefault(); closeMenu(); focusContact(); }));
