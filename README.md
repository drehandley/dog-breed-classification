# Dog Breed Classifier — Pluto's Repawsitory

A convolutional neural network that identifies dog breeds from photos. Built as a capstone project for The Knowledge House Data Science Fellowship, Phase 3.

![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat-square&logo=pytorch&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=flat-square&logo=jupyter&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat-square&logo=scikit-learn&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![Google Colab](https://img.shields.io/badge/Colab-F9AB00?style=flat-square&logo=googlecolab&logoColor=white)

---

## The Problem

Animal shelters manually identify dog breeds on intake — a process that's slow, inconsistent, and error-prone. Misidentified breeds affect adoption listings and housing eligibility for adopters. We built a model that gives shelters an automated first pass from a single photo.

## Pipeline Overview

**Raw data → SQL database → preprocessing → training → app (Sprint 4)**

1. **EDA** — explored class distribution, image dimensions, and class imbalance across 69 breeds
2. **SQL database** — built a SQLite metadata store tracking file path, label, split, dimensions, and quality flags for all 8,692 images
3. **Preprocessing** — custom PyTorch Dataset class, ImageNet normalization, augmentation on train only (flip, rotation, color jitter), WeightedRandomSampler for class imbalance
4. **Training** — pretrained ResNet50 and MobileNetV2, base layers frozen, classification head replaced with Linear(2048, 69) and Linear(1280, 69). Trained with CrossEntropyLoss + Adam
5. **App** — FastAPI backend + demo interface, Sprint 4

The inference pipeline applies the same resize (224×224) and normalization (mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]) as training — so the model never sees a distribution it wasn't trained on.

---

## Demo

**Live:** https://dog-breed-classification-wtir.onrender.com

Upload any dog photo → the model returns the top 3 predicted breeds with confidence scores. The interface includes a breed library of all 69 classes with real photos, stat breakdowns, and group filters.

**Run locally:**
```bash
cd app && uvicorn app:app --reload --port 8000
# open http://localhost:8000
```

---

## Results — Model Comparison

We trained two models and compared performance on 682 held-out test images across 69 breeds.

### ResNet50 — Google Colab T4 GPU

| Metric | Score |
|--------|-------|
| Accuracy | 97.51% |
| Precision | 97.70% |
| Recall | 97.51% |
| F1 Score | 97.52% |

**Loss Curves — Both Models**

![Loss Curves](outputs/ozor_loss_curves.png)

Both models trained with a two-phase strategy: frozen backbone (15 epochs) then full fine-tuning (15 more). ResNet50 converges faster and reaches lower loss overall. MobileNetV2 takes longer to converge but stays tighter across Phase 2 with less overfitting.

**Confusion Matrix**

![ResNet50 Confusion Matrix](outputs/resnet50_loss_curve.png)

Near-perfect diagonal across all 69 classes. The few misclassifications cluster around visually similar breeds — Golden Retrievers vs. Labradors, similar Terrier varieties.

### MobileNetV2 — Google Colab T4 GPU

| Metric | Score |
|--------|-------|
| Accuracy | 95.75% |
| Precision | 96.19% |
| Recall | 95.75% |
| F1 Score | 95.68% |

Lightweight architecture (~3.5M params vs ResNet50's ~25M). Uses depthwise-separable convolutions — faster to train and more efficient for deployment without a GPU. Despite fewer parameters, performance trails ResNet50 by ~1.8% across all metrics.

---

## Dataset

[70 Dog Breeds Image Dataset](https://www.kaggle.com/datasets/gpiosenka/70-dog-breedsimage-data-set) — Kaggle

69 breeds, ~8,692 images, pre-split into train / valid / test. Images resized to 224×224. We used the dataset's built-in 70/15/15 split rather than the common 80/20 default, giving the model more meaningful validation signal across rare breeds.

![Breed Distribution Dashboard](outputs/tableau_breed_distribution.png)

## Database Schema

![ERD](docs/Sprint%202%20ERD%20-%20Pluto's%20Repawsitory.png)

---

## Repo Structure

```
plutos-repawsitory/
├── app/                          # FastAPI backend + frontend (deploy this to HF Spaces)
│   ├── app.py                    # API: /predict endpoint, model loading
│   ├── Dockerfile                # HF Spaces deployment
│   ├── requirements.txt
│   ├── models/
│   │   └── mobilenet_v2_dogbreed_regularized.pt
│   └── static/
│       └── index.html            # Frontend: scan + breed library
├── src/                          # React/Vite version (Lovable-ready)
├── notebooks/
│   ├── 01_eda.ipynb
│   └── 02_preprocessing.ipynb
├── outputs/                      # Loss curves, confusion matrices
├── docs/                         # ERD and diagrams
├── sprint2_database.py           # SQLite metadata pipeline
├── dogs_updated.csv
└── README.md
```

---

## Setup

```bash
git clone https://github.com/drehandley/dog-breed-classification.git
cd dog-breed-classification
pip install torch torchvision pandas scikit-learn matplotlib seaborn

# Download dataset
kaggle datasets download -d gpiosenka/70-dog-breedsimage-data-set --unzip -p data/

# Run notebooks in order
# 01_eda → 02_preprocessing → 03_model_training
```

For ResNet50: open `03_model_training_resnet50.ipynb` in Google Colab, set runtime to T4 GPU.

---

## Sprint Plan

| Sprint | Dates | Focus | Status |
|--------|-------|-------|--------|
| 1 | 6/3 – 6/11 | Project setup, EDA | Done |
| 2 | 6/11 – 6/25 | SQL database, preprocessing | Done |
| 3 | 6/25 – 7/9 | Model training and evaluation | Done |
| 4 | 7/9 – 7/16 | Demo app, presentation | Done |

---

## Team

| Name | Role |
|------|------|
| Dre (Lead) | Architecture, SQL database, notebook structure |
| Cameron | Data cleaning, label fixes, training loop |
| Manuela | Preprocessing pipeline, augmentation, evaluation |
| Ozor | Class imbalance, WeightedRandomSampler, loss curves |

---

## Challenges

- **Class imbalance** — some breeds had significantly fewer images. Solved with WeightedRandomSampler so underrepresented breeds weren't ignored during training.
- **CPU training limits** — MobileNetV2 was chosen for its smaller footprint on local CPU. ResNet50 moved to Google Colab with a T4 GPU.
- **Label bugs** — whitespace inconsistencies in the original CSV caused silent label mismatches. Fixed before any preprocessing ran.

## What's Next

- Fine-tune deeper ResNet50 layers for additional accuracy gains
- Expand to mixed-breed identification
- Deploy to animal shelters as a free intake tool

---

*The Knowledge House — Data Science Fellowship, Phase 3*
*Dataset: [gpiosenka on Kaggle](https://www.kaggle.com/datasets/gpiosenka/70-dog-breedsimage-data-set)*
