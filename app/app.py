from fastapi import FastAPI, File, UploadFile
from fastapi.staticfiles import StaticFiles
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import torch
import torchvision.models as models
import torch.nn as nn
from torchvision import transforms
from PIL import Image
import io
import os
import time

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── 69 breeds in exact training order (sorted from SQLite DB) ──
CLASS_NAMES = [
    'Afghan', 'African Wild Dog', 'Airedale', 'American Hairless', 'American Spaniel',
    'Basenji', 'Basset', 'Beagle', 'Bearded Collie', 'Bermaise', 'Bichon Frise',
    'Blenheim', 'Bloodhound', 'Bluetick', 'Border Collie', 'Borzoi', 'Boston Terrier',
    'Boxer', 'Bull Mastiff', 'Bull Terrier', 'Bulldog', 'Cairn', 'Chihuahua',
    'Chinese Crested', 'Chow', 'Clumber', 'Cockapoo', 'Cocker', 'Collie', 'Corgi',
    'Dalmation', 'Dhole', 'Dingo', 'Doberman', 'Elk Hound', 'French Bulldog',
    'German Sheperd', 'Golden Retriever', 'Great Dane', 'Great Perenees', 'Greyhound',
    'Groenendael', 'Irish Spaniel', 'Irish Wolfhound', 'Japanese Spaniel', 'Komondor',
    'Labradoodle', 'Labrador', 'Lhasa', 'Malinois', 'Maltese', 'Mex Hairless',
    'Newfoundland', 'Pekinese', 'Pit Bull', 'Pomeranian', 'Poodle', 'Pug',
    'Rhodesian', 'Rottweiler', 'Saint Bernard', 'Schnauzer', 'Scotch Terrier',
    'Shar_Pei', 'Shiba Inu', 'Shih-Tzu', 'Siberian Husky', 'Vizsla', 'Yorkie'
]

# ── Load model once on startup ──
DEVICE = torch.device('cpu')
MODEL_PATH = os.path.join(os.path.dirname(__file__), 'models', 'mobilenet_v2_dogbreed_regularized.pt')

model = models.mobilenet_v2(weights=None)
model.classifier[1] = nn.Sequential(
    nn.Dropout(0.5),
    nn.Linear(model.last_channel, len(CLASS_NAMES))
)
model.load_state_dict(torch.load(MODEL_PATH, map_location=DEVICE))
model = model.to(DEVICE)
model.eval()

# ── Same preprocessing as training ──
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
    transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
])


@app.get("/health")
async def health():
    return {"status": "ok", "breeds": len(CLASS_NAMES), "model": "MobileNetV2"}


@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    try:
        image_data = await file.read()
        image = Image.open(io.BytesIO(image_data)).convert('RGB')
        tensor = transform(image).unsqueeze(0).to(DEVICE)

        t0 = time.perf_counter()
        with torch.no_grad():
            output = model(tensor)
            probs = torch.softmax(output, dim=1)[0]
            top3_probs, top3_idx = torch.topk(probs, 3)
        inference_ms = round((time.perf_counter() - t0) * 1000)

        results = [
            {"breed": CLASS_NAMES[idx.item()], "confidence": round(prob.item() * 100, 1)}
            for prob, idx in zip(top3_probs, top3_idx)
        ]
        return JSONResponse({"predictions": results, "inference_ms": inference_ms})

    except Exception as e:
        return JSONResponse({"error": str(e)}, status_code=500)


# ── Serve frontend ──
app.mount("/", StaticFiles(directory=os.path.join(os.path.dirname(__file__), "static"), html=True), name="static")
