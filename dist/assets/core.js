export function normalizeWhatsApp(value, countryCode = '55') {
  const raw = String(value ?? '').trim();
  if (!raw || !/^\+?[\d\s().-]+$/.test(raw)) return null;
  const digits = raw.replace(/\D/g, '');
  const ddi = String(countryCode);
  if (!/^[1-9]\d{0,2}$/.test(ddi) || !digits.startsWith(ddi) || digits.length - ddi.length < 7) return null;
  if (!/^[1-9]\d{7,14}$/.test(digits) || /^(\d)\1+$/.test(digits)) return null;
  if (/^(12345678|98765432|5511999999999|5500000000000)/.test(digits)) return null;
  // DDI 1 (NANP): evita interpretar um telefone brasileiro sem DDI como internacional.
  if (digits.startsWith('1') && !/^1[2-9]\d{2}[2-9]\d{6}$/.test(digits)) return null;
  // Para o Brasil, exige DDI 55, DDD existente e telefone com 8 ou 9 dígitos.
  if (digits.startsWith('55')) {
    const ddds = '11 12 13 14 15 16 17 18 19 21 22 24 27 28 31 32 33 34 35 37 38 41 42 43 44 45 46 47 48 49 51 53 54 55 61 62 63 64 65 66 67 68 69 71 73 74 75 77 79 81 82 83 84 85 86 87 88 89 91 92 93 94 95 96 97 98 99'.split(' ');
    if (!ddds.includes(digits.slice(2, 4)) || !/^55\d{2}(?:[2-5]\d{7}|9\d{8})$/.test(digits)) return null;
  }
  return digits;
}

export function buildMessage(config, { name = '', serviceId = '', message = '' } = {}) {
  const text = config.copy.message;
  const service = config.services.find(item => item.id === serviceId);
  const parts = [text.greeting];
  if (name.trim()) parts.push(`${text.introduction} ${name.trim()}.`);
  parts.push(service ? `${text.interest} ${service.name}.` : text.general);
  if (message.trim()) parts.push(message.trim());
  parts.push(text.ending);
  return parts.join('\n\n');
}

export function contactDestination(config, fields = {}) {
  const message = buildMessage(config, fields);
  const phone = normalizeWhatsApp(config.contact.whatsapp, config.contact.countryCode || '55');
  return { message, mode: config.demoMode || !phone ? 'preview' : 'whatsapp',
    url: !config.demoMode && phone ? `https://wa.me/${phone}?text=${encodeURIComponent(message)}` : null };
}

export function validateContact(config, { name = '', serviceId = '' } = {}) {
  return {
    name: name.trim().length < 2 || name.trim().length > 80 ? config.copy.validationName : '',
    serviceId: config.services.some(item => item.id === serviceId) ? '' : config.copy.validationService
  };
}

export function safeExternalUrl(value, host) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && !url.username && !url.password &&
      (!host || url.hostname === host || url.hostname.endsWith(`.${host}`)) ? url.href : null;
  } catch { return null; }
}

export function mapsUrl(config) {
  const address = config.location.address.trim();
  return address ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent([address, config.location.city].filter(Boolean).join(', '))}` : null;
}

export function robotsValue(config) {
  return config.demoMode || !config.seo.allowIndexing ? 'noindex, nofollow' : 'index, follow';
}

export const formatPrice = value => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', minimumFractionDigits: Number.isInteger(value) ? 0 : 2, maximumFractionDigits: 2 }).format(value);

export const servicesForCategory = (services, category) => category === 'todos' ? [...services] : services.filter(service => service.category === category);

export const formatServicePrice = (service, prefix = 'a partir de') => `${service.fromPrice ? `${prefix} ` : ''}${formatPrice(service.price)}`;
