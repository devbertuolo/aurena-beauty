import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import config from '../dist/assets/config.js';
import { normalizeWhatsApp, buildMessage, contactDestination, validateContact, mapsUrl, safeExternalUrl, robotsValue, formatPrice, servicesForCategory, formatServicePrice } from '../dist/assets/core.js';

test('modo demonstrativo nunca abre o WhatsApp, inclusive com número configurado', () => {
  const demo = { ...config, contact: { ...config.contact, whatsapp: '12025550123', countryCode: '1' } };
  assert.equal(contactDestination(demo).mode, 'preview');
  assert.equal(contactDestination(demo).url, null);
});
test('número ausente, incompleto ou placeholder sempre gera prévia local', () => {
  for (const phone of ['', '11987654321', '000000000000', '5511999999999', '+55 (00) 99999-9999', 'abc5511987654321', '123456789']) {
    const candidate = { ...config, demoMode: false, contact: { whatsapp: phone } };
    assert.equal(contactDestination(candidate).mode, 'preview', phone);
    assert.equal(contactDestination(candidate).url, null, phone);
  }
});
test('DDI, DDD e formato são normalizados sem comprovar titularidade do número', () => {
  assert.equal(normalizeWhatsApp('+55 (11) 98765-4321'), '5511987654321');
  assert.equal(normalizeWhatsApp('+1 (202) 555-0123', '1'), '12025550123');
  assert.equal(normalizeWhatsApp('+1 (202) 555-0123'), null);
  assert.equal(normalizeWhatsApp('++55 (11) 98765-4321'), null);
  assert.equal(normalizeWhatsApp('55+11+98765-4321'), null);
  assert.equal(normalizeWhatsApp('551167654321'), null);
});
test('modo cliente produz link com mensagem codificada e nunca envia nada', () => {
  // Faixa NANP 555-01xx reservada para ficção; não se navega para este link.
  const client = { ...config, demoMode: false, contact: { whatsapp: '+1 202 555 0123', countryCode: '1' } };
  const fields = { name: 'João & Ana', serviceId: 'coloracao', message: 'Sábado às 10h? Cor + tratamento / escova.' };
  const result = contactDestination(client, fields);
  const url = new URL(result.url);
  assert.equal(result.mode, 'whatsapp'); assert.equal(url.hostname, 'wa.me');
  assert.equal(url.pathname, '/12025550123');
  assert.equal(url.searchParams.get('text'), result.message);
  assert.match(result.url, /Jo%C3%A3o%20%26%20Ana/);
  assert.match(result.message, /Coloração/);
  assert.match(result.message, /Sábado às 10h/);
});
test('seleção de serviço e mensagem geral não prometem uma reserva', () => {
  assert.match(buildMessage(config, { serviceId: 'escova' }), /Tenho interesse em Escova/);
  assert.match(buildMessage(config), /solicitar um horário/);
  assert.doesNotMatch(buildMessage(config), /confirmado|reservado|enviado/i);
});
test('preços preservam os centavos quando configurados', () => {
  assert.match(formatPrice(45), /45$/);
  assert.match(formatPrice(45.5), /45,50$/);
});
test('categorias filtram os serviços sem alterar a lista original', () => {
  assert.equal(servicesForCategory(config.services, 'todos').length, 5);
  assert.deepEqual(servicesForCategory(config.services, 'cortes').map(item => item.id), ['corte']);
  assert.deepEqual(servicesForCategory(config.services, 'escovas').map(item => item.id), ['escova']);
  assert.deepEqual(servicesForCategory(config.services, 'tratamentos').map(item => item.id), ['hidratacao', 'reconstrucao']);
  assert.deepEqual(servicesForCategory(config.services, 'coloracao').map(item => item.id), ['coloracao']);
  assert.equal(config.services.length, 5);
});
test('formulário exige nome e serviço existente', () => {
  assert.ok(validateContact(config, { name: ' ', serviceId: 'inventado' }).name);
  assert.ok(validateContact(config, { name: 'Ana', serviceId: '' }).serviceId);
  assert.deepEqual(validateContact(config, { name: ' Ana ', serviceId: 'corte' }), { name: '', serviceId: '' });
});
test('Maps e Instagram só aparecem com dados utilizáveis', () => {
  assert.equal(mapsUrl(config), null);
  const query = mapsUrl({ location: { address: 'Rua de Teste, 10', city: 'Cidade & Região' } });
  assert.equal(new URL(query).searchParams.get('query'), 'Rua de Teste, 10, Cidade & Região');
  assert.equal(safeExternalUrl('javascript:alert(1)', 'instagram.com'), null);
  assert.equal(safeExternalUrl('https://instagram.com.exemplo.org/teste', 'instagram.com'), null);
  assert.equal(safeExternalUrl('https://www.instagram.com/perfil/', 'instagram.com'), 'https://www.instagram.com/perfil/');
});
test('demonstração sempre tem noindex; publicação exige troca explícita', () => {
  assert.equal(robotsValue({ ...config, seo: { allowIndexing: true } }), 'noindex, nofollow');
  assert.equal(robotsValue({ ...config, demoMode: false }), 'noindex, nofollow');
  assert.equal(robotsValue({ demoMode: false, seo: { allowIndexing: true } }), 'index, follow');
});
test('arquivos, imagens e âncoras referenciados existem', async () => {
  const html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  const ids = new Set([...html.matchAll(/\bid="([^"]+)"/g)].map(match => match[1]));
  for (const match of html.matchAll(/href="#([^"]+)"/g)) assert.ok(ids.has(match[1]), `Âncora: ${match[1]}`);
  const refs = [...html.matchAll(/(?:src|href)="(assets\/[^"]+)"/g)].map(match => match[1]);
  const images = [config.images.hero, ...config.images.gallery].map(item => item.src);
  for (const ref of new Set([...refs, ...images])) await access(new URL(`../dist/${ref}`, import.meta.url));
  assert.match(html, /name="robots" content="noindex, nofollow"/);
  assert.doesNotMatch(html, /R\$\s*500|application\/ld\+json|https?:\/\/.*(?:analytics|googletagmanager)/i);
});

test('preços a partir de aparecem também na seleção do formulário', () => {
  assert.match(formatServicePrice(config.services[0]), /^a partir de R\$/);
  assert.match(formatServicePrice({price: 45, fromPrice: false}), /^R\$/);
});
test('cópia tem identidade e contato próprios, sem referências da marca de origem', async () => {
  assert.equal(config.business.name, 'Aurena Beauty');
  assert.equal(config.contact.whatsapp, '');
  assert.equal(config.contact.instagram, '');
  assert.equal(config.location.address, '');
  assert.equal(config.seo.siteUrl, 'https://aurena.agencianofer.com.br/');
  assert.equal(config.serviceCategories.length, 5);
  const all = JSON.stringify(config) + await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  assert.doesNotMatch(all, /navaro|barbearia|corte-barba/i);
  assert.equal(config.demoMode, true);
});
