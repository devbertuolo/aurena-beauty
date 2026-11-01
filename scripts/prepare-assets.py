"""Reproduz os recursos Aurena sem alterar os originais. Requer Pillow."""
from pathlib import Path
import json
import shutil
from PIL import Image

root = Path(__file__).resolve().parent.parent
brand = root / 'dist/assets/brand'
images = root / 'dist/assets/images'
reference = root / 'referencias'
for directory in [brand, images, reference]:
    directory.mkdir(parents=True, exist_ok=True)
# No clone, os PNGs e o painel já estão nas pastas versionadas.
def original_path(name):
    local = root / name
    return local if local.is_file() else brand / name

dimensions = {}
for original_name, web_name, limit in [
    ('Logo Clara.png', 'logo-clara.webp', 1000),
    ('Logo Escura.png', 'logo-escura.webp', 1000),
    ('Simbolo Claro.png', 'simbolo-claro.webp', 360),
    ('Simbolo Escuro.png', 'simbolo-escuro.webp', 360),
]:
    source = original_path(original_name)
    if source.resolve() != (brand / original_name).resolve():
        shutil.copy2(source, brand / original_name)
    original = Image.open(source).convert('RGBA')
    cropped = original.crop(original.getchannel('A').getbbox())
    cropped.thumbnail((limit, limit), Image.Resampling.LANCZOS)
    cropped.save(brand / web_name, 'WEBP', lossless=True, method=6)
    dimensions[web_name] = {'width': cropped.width, 'height': cropped.height,
                            'sourceSize': original.size, 'alpha': original.getchannel('A').getextrema()}

panel_path = root / 'Referencia Identidade Visual.png'
if not panel_path.is_file():
    panel_path = reference / panel_path.name
if panel_path.resolve() != (reference / panel_path.name).resolve():
    shutil.copy2(panel_path, reference / panel_path.name)
panel = Image.open(panel_path).convert('RGB')
for name, bounds in [
    ('aurena-fachada.webp', (16, 283, 678, 722)),
    ('aurena-ambiente.webp', (691, 283, 1010, 722)),
    ('aurena-avental.webp', (17, 735, 338, 1058)),
    ('aurena-toalha.webp', (711, 1071, 1010, 1494)),
    ('aurena-materiais.webp', (352, 735, 681, 1058)),
]:
    cropped = panel.crop(bounds)
    cropped.save(images / name, 'WEBP', quality=92, method=6)
    dimensions[name] = {'width': cropped.width, 'height': cropped.height, 'bounds': bounds}

symbol = Image.open(original_path('Simbolo Claro.png')).convert('RGBA')
symbol = symbol.crop(symbol.getchannel('A').getbbox())
symbol.thumbnail((48, 48), Image.Resampling.LANCZOS)
favicon = Image.new('RGBA', (64, 64), '#643845')
favicon.alpha_composite(symbol, ((64-symbol.width)//2, (64-symbol.height)//2))
favicon.save(root / 'dist/assets/favicon.png')
sharing = Image.new('RGB', (1200, 630), '#F5EFE6')
photo = panel.crop((16, 283, 678, 722))
photo = photo.resize((1200, 796), Image.Resampling.LANCZOS).crop((0, 0, 1200, 390))
sharing.paste(photo, (0, 240))
logo = Image.open(original_path('Logo Escura.png')).convert('RGBA')
logo = logo.crop(logo.getchannel('A').getbbox())
logo.thumbnail((590, 185), Image.Resampling.LANCZOS)
sharing.paste(logo, ((1200-logo.width)//2, (240-logo.height)//2), logo)
sharing.save(images / 'aurena-social.jpg', 'JPEG', quality=92)
dimensions['panel'] = panel.size
(reference / 'recortes.json').write_text(json.dumps(dimensions, ensure_ascii=False, indent=2), encoding='utf-8')
print('Recursos Aurena preparados; originais preservados.')
