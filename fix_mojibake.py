#!/usr/bin/env python3
from pathlib import Path

REPLACEMENTS = [
    ("\u00c2\u00b7", "\u00b7"),  # Â· -> ·
    ("\u00e2\u20ac\u0153", "\u201c"),
    ("\u00e2\u20ac\u009d", "\u201d"),
    ("\u00e2\u20ac\x9d", "\u201d"),
    ("\u00e2\u20ac\u2122", "\u2019"),
    ("\u00e2\u20ac\u02dc", "\u2018"),
    ("\u00e2\u20ac\u201d", "\u2014"),
    ("\u00e2\u20ac\u201c", "\u2013"),
    ("â€œ", "\u201c"),
    ("â€™", "\u2019"),
    ("â€˜", "\u2018"),
    ("â€”", "\u2014"),
    ("â€“", "\u2013"),
    ("â†’", "\u2192"),
    ("â€\x9d", "\u201d"),
    ("Â·", "\u00b7"),
    ("\x9d", ""),
]

FILES = [
    "index.html",
    "weddings.html",
    "apple-cider-festival.html",
    "events.html",
    "private-parties.html",
]

for fname in FILES:
    p = Path(fname)
    if not p.exists():
        continue
    text = p.read_text(encoding="utf-8")
    # Prefer cp1252 round-trip when it helps
    try:
        recovered = text.encode("cp1252").decode("utf-8")
        if recovered.count("â") < text.count("â") or "Â·" not in recovered:
            if "â€" not in recovered and recovered.count("Â") <= text.count("Â"):
                text2 = recovered
            else:
                text2 = text
        else:
            text2 = text
    except Exception:
        text2 = text

    working = text2
    total = 0
    for bad, good in REPLACEMENTS:
        c = working.count(bad)
        if c:
            working = working.replace(bad, good)
            total += c
    if working != text:
        p.write_text(working, encoding="utf-8", newline="\n")
        print(f"Fixed {fname}: {total}")
    else:
        print(f"{fname}: no changes")
