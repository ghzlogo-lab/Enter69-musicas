from pathlib import Path
import json, re

ROOT = Path(__file__).parent
MUSIC = ROOT / "music"
COVERS = ROOT / "covers"
OUT = ROOT / "songs.json"

AUDIO_EXT = {".mp3", ".wav", ".m4a", ".ogg", ".aac", ".flac"}
IMAGE_EXT = {".jpg", ".jpeg", ".png", ".webp"}

def clean_name(name):
    return re.sub(r"[_-]+", " ", name).rsplit(".", 1)[0].strip()

def find_cover(stem):
    for ext in IMAGE_EXT:
        p = COVERS / f"{stem}{ext}"
        if p.exists():
            return f"covers/{p.name}"
    for ext in IMAGE_EXT:
        p = COVERS / f"{stem.lower()}{ext}"
        if p.exists():
            return f"covers/{p.name}"
    return "covers/default.svg"

songs = []
for p in sorted(MUSIC.iterdir(), key=lambda x: x.name.lower()):
    if p.is_file() and p.suffix.lower() in AUDIO_EXT:
        songs.append({
            "title": clean_name(p.name),
            "artist": "Minha música",
            "file": f"music/{p.name}",
            "cover": find_cover(p.stem)
        })

OUT.write_text(json.dumps(songs, ensure_ascii=False, indent=2), encoding="utf-8")
print(f"Catálogo criado: {len(songs)} música(s).")
