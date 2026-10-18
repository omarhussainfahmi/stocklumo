"""Generate compact raster fallbacks from Stocklumo's original SVG mark (Pillow)."""
from pathlib import Path
import re
import xml.etree.ElementTree as ET
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
IMAGES = ROOT / "MarketDesk/wwwroot/images"
MARK = ET.parse(IMAGES / "stocklumo-mark-dark.svg").getroot()


def outline(data):
    tokens = re.findall(r"[A-Za-z]|-?\d+(?:\.\d+)?", data)
    points, cursor, origin, i = [], (0, 0), (0, 0), 0
    command = "M"
    while i < len(tokens):
        if tokens[i].isalpha():
            command = tokens[i]
            i += 1
        relative = command.islower()
        if command.upper() == "Z":
            points.append(origin)
            cursor = origin
            continue
        count = 6 if command.upper() == "C" else 2
        values = list(map(float, tokens[i:i + count]))
        i += count
        pairs = [(values[n] + (cursor[0] if relative else 0), values[n + 1] + (cursor[1] if relative else 0)) for n in range(0, count, 2)]
        if command.upper() == "C":
            start = cursor
            for step in range(1, 25):
                t = step / 24
                points.append(tuple((1-t)**3*start[j] + 3*(1-t)**2*t*pairs[0][j] + 3*(1-t)*t*t*pairs[1][j] + t**3*pairs[2][j] for j in (0, 1)))
        else:
            points.append(pairs[0])
            if command.upper() == "M":
                origin = pairs[0]
        cursor = pairs[-1]
        if command.upper() == "M":
            command = "l" if relative else "L"
    return points


def mark(draw, x, y, scale):
    for path in MARK.findall("{http://www.w3.org/2000/svg}path"):
        draw.polygon([(x + a*scale, y + b*scale) for a, b in outline(path.attrib["d"])], fill=path.attrib["fill"])


icon = Image.new("RGB", (720, 720), "#081b30")
mark(ImageDraw.Draw(icon), 152, 100, 6.5)
icon.resize((180, 180), Image.Resampling.LANCZOS).save(IMAGES / "apple-touch-icon.png", optimize=True)
icon.resize((32, 32), Image.Resampling.LANCZOS).save(IMAGES / "favicon-32.png", optimize=True)
icon.save(ROOT / "MarketDesk/wwwroot/favicon.ico", sizes=[(16,16), (32,32), (48,48)])

image = Image.new("RGB", (2400, 1260), "#07151e")
draw = ImageDraw.Draw(image)
for x in range(0, 2400, 72): draw.line((x, 0, x, 1260), fill="#102b31", width=1)
for y in range(0, 1260, 72): draw.line((0, y, 2400, y), fill="#102b31", width=1)
draw.line((100, 104, 2300, 104), fill="#35dfb0", width=3)
mark(draw, 120, 192, 2)
fonts = Path("C:/Windows/Fonts")
bold = lambda size: ImageFont.truetype(str(fonts / "segoeuib.ttf"), size)
regular = lambda size: ImageFont.truetype(str(fonts / "segoeui.ttf"), size)
draw.text((290, 193), "Stocklumo", font=bold(112), fill="#eef5f7")
draw.text((120, 458), "Your personal", font=bold(142), fill="#eef5f7")
draw.text((120, 630), "market desk.", font=bold(142), fill="#35dfb0")
draw.text((126, 874), "Track prices. Explore companies. Follow what matters.", font=regular(49), fill="#a4b8c3")
draw.text((126, 1090), "STOCKLUMO.ONRENDER.COM", font=bold(34), fill="#a4b8c3")
image.resize((1200, 630), Image.Resampling.LANCZOS).save(IMAGES / "stocklumo-share.png", optimize=True)
print("Generated share image, favicon and Apple touch icon from the existing brand.")
