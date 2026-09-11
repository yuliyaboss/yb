#!/usr/bin/env python3
"""Image generation client for THE WORLD THROUGH MY EYES.

Talks to the Gemini image models through the session's agent proxy, which
injects the API key — there is no key in this file or in the environment, and
none should ever be added.

    python3 gen.py sheet                    # the cast model sheet
    python3 gen.py sheet --model flash      # cheaper/faster draft pass
    python3 gen.py sheet --n 3              # three candidates to choose from

Every call writes the PNG plus a .json sidecar recording the exact model,
prompt and reference images used, so any file in this book can be traced back
to what produced it and regenerated.
"""
import argparse, base64, json, os, ssl, sys, time, urllib.request, urllib.error
from datetime import datetime, timezone

HOST = "https://generativelanguage.googleapis.com/v1beta/models"
MODELS = {
    "pro":   "gemini-3-pro-image",          # Nano Banana Pro — final art
    "flash": "gemini-3.1-flash-image",      # fast drafts and layout tests
}
HERE = os.path.dirname(os.path.abspath(__file__))


def _post(url, payload, timeout=600):
    req = urllib.request.Request(
        url, data=json.dumps(payload).encode(),
        headers={"Content-Type": "application/json"}, method="POST")
    ctx = ssl.create_default_context()      # honours SSL_CERT_FILE (proxy CA)
    with urllib.request.urlopen(req, timeout=timeout, context=ctx) as r:
        return json.loads(r.read())


def generate(prompt, out_png, model="pro", aspect="3:4", size="2K",
             refs=(), retries=3):
    """One image. Returns the path written.

    refs: paths of PNGs sent alongside the prompt as visual references — this
    is how later pages inherit the cast's look from the model sheet.
    """
    parts = []
    for p in refs:
        parts.append({"inline_data": {
            "mime_type": "image/png",
            "data": base64.b64encode(open(p, "rb").read()).decode()}})
    parts.append({"text": prompt})

    payload = {
        "contents": [{"parts": parts}],
        "generationConfig": {
            "responseModalities": ["TEXT", "IMAGE"],
            "imageConfig": {"aspectRatio": aspect, "imageSize": size},
        },
    }
    url = f"{HOST}/{MODELS.get(model, model)}:generateContent"

    last = None
    for attempt in range(1, retries + 1):
        try:
            data = _post(url, payload)
            break
        except urllib.error.HTTPError as e:
            body = e.read().decode()[:400]
            last = f"HTTP {e.code}: {body}"
            if e.code in (400, 403, 404):      # not worth retrying
                sys.exit(f"{last}\n(request was to {url})")
            print(f"  attempt {attempt} failed — {last}", file=sys.stderr)
        except Exception as e:                 # noqa: BLE001 — network flake
            last = repr(e)
            print(f"  attempt {attempt} failed — {last}", file=sys.stderr)
        if attempt == retries:
            sys.exit(f"gave up after {retries} attempts: {last}")
        time.sleep(2 ** attempt)

    blob, notes = None, []
    for cand in data.get("candidates", []):
        for part in cand.get("content", {}).get("parts", []):
            inline = part.get("inlineData") or part.get("inline_data")
            if inline and blob is None:
                blob = base64.b64decode(inline["data"])
            elif part.get("text"):
                notes.append(part["text"].strip())
    if blob is None:
        fb = json.dumps(data)[:600]
        sys.exit(f"no image in response: {fb}")

    os.makedirs(os.path.dirname(out_png) or ".", exist_ok=True)
    open(out_png, "wb").write(blob)
    json.dump({"model": MODELS.get(model, model), "aspect": aspect,
               "size": size, "refs": [os.path.basename(r) for r in refs],
               "generated": datetime.now(timezone.utc).isoformat(timespec="seconds"),
               "model_notes": notes, "prompt": prompt},
              open(os.path.splitext(out_png)[0] + ".json", "w"), indent=2)
    return out_png


def describe(path):
    from PIL import Image
    im = Image.open(path)
    g = im.convert("L")
    px = list(g.getdata())
    n = len(px)
    white = sum(1 for v in px if v >= 250) / n
    black = sum(1 for v in px if v <= 12) / n
    mid = 1 - white - black
    return (f"{os.path.basename(path)}  {im.width}x{im.height}  "
            f"white {white:5.1%}  black {black:5.1%}  midtone {mid:5.1%}")


if __name__ == "__main__":
    import prompt_kit

    ap = argparse.ArgumentParser()
    ap.add_argument("what", choices=["sheet"])
    ap.add_argument("--model", default="pro", choices=list(MODELS))
    ap.add_argument("--aspect", default="3:4")
    ap.add_argument("--size", default="2K")
    ap.add_argument("--n", type=int, default=1, help="candidates to generate")
    ap.add_argument("--tag", default="", help="suffix for the output filename")
    a = ap.parse_args()

    for i in range(1, a.n + 1):
        stem = f"cast-sheet{a.tag}" + (f"-{i}" if a.n > 1 else "")
        out = os.path.join(HERE, "sheets", stem + ".png")
        print(f"-> {stem} ({MODELS[a.model]}, {a.aspect}, {a.size})")
        generate(prompt_kit.cast_sheet_prompt(), out,
                 model=a.model, aspect=a.aspect, size=a.size)
        print("  " + describe(out))
