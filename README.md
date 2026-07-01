# Dog Breed Classification

A deep learning project that classifies dog breeds from images using a CNN. Built as a capstone project for The Knowledge House Data Science Fellowship — Phase 3.

---

## Project Overview

We're training a convolutional neural network to identify dog breeds from photos. The goal is an interactive demo where a user uploads a photo of a dog and the model returns the predicted breed.

**Key questions we're answering:**
- How does the model handle visually similar breeds?
- How does class imbalance across breeds affect performance and what strategies can address it?
- How can we build an interactive demo where a user uploads a photo and gets a predicted breed back?

---

## Dataset

**70 Dog Breeds Image Dataset** — [Kaggle](https://www.kaggle.com/datasets/gpiosenka/70-dog-breedsimage-data-set)

- 70 breeds, ~8,694 images
- Pre-split into train, valid, and test folders
- Images resized to 224×224

---

## Project Structure

```
dog-breed-classification/
├── notebooks/
│   ├── 01_eda.ipynb                        # Exploratory data analysis
│   ├── 02_preprocessing.ipynb              # Cleaning, resizing, augmentation
│   ├── 03_model_training.ipynb             # MobileNetV2 training and evaluation
│   └── 03_model_training_resnet50.ipynb    # ResNet50 training and evaluation (Colab)
├── data/                        # Raw and processed data (gitignored)
├── models/                      # Saved model weights (gitignored)
├── outputs/                     # Plots and evaluation outputs (gitignored)
├── docs/
│   └── report.md                # Project report
├── sprint2_database.py          # SQL metadata database script
├── dogs_updated.csv             # Cleaned CSV (Cameron)
└── README.md
```

> `dog_breeds_metadata.db` is gitignored — run `sprint2_database.py` locally to generate it.

---

## Sprint Plan

| Sprint | Dates | Focus |
|--------|-------|-------|
| Sprint 1 | 6/3 – 6/11 | Project foundation and EDA |
| Sprint 2 | 6/11 – 6/25 | Storage, preprocessing, augmentation |
| Sprint 3 | 6/25 – 7/9 | CNN model training and evaluation |
| Sprint 4 | 7/9 – 7/16 | Demo app, final cleanup, presentation |

---

## Sprint 1 Deliverables

- [x] GitHub repo created, all members added as collaborators
- [x] Each member has their own branch
- [x] Kanban board set up with tasks assigned
- [x] Background research — papers and blog posts on dog breed classification / CNNs
- [x] Problem definition — questions, features, definition of done
- [x] Value statement — why this matters
- [x] Limitations — expected challenges
- [x] EDA notebook (`01_eda.ipynb`) merged to main covering:
  - Class distribution bar chart
  - Sample image grid per breed
  - Image dimension distribution
  - Class imbalance check
  - Written summary + preprocessing plan for Sprint 2

---

## Sprint 2 Deliverables

- [x] SQL metadata database designed and built (`sprint2_database.py`)
  - Stores file path, label, split, height, width, channels, format, duplicate flag, corrupted flag for all 8,694 images
  - ERD diagram designed in Lucidchart before implementation

### Database Schema (ERD)

![Sprint 2 ERD](docs/Sprint%202%20ERD%20-%20Pluto's%20Repawsitory.png)
- [x] Cleaned CSV (`dogs_updated.csv`) — fixed label whitespace bug, verified 70 breeds
- [x] Preprocessing pipeline (`02_preprocessing.ipynb`):
  - Custom PyTorch `Dataset` class loading images from CSV
  - Separate transform pipelines for train vs. val/test
  - Augmentation on train only (RandomHorizontalFlip, RandomRotation, ColorJitter)
  - ImageNet normalization (mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225])
  - `WeightedRandomSampler` to address class imbalance
  - DataLoaders verified — correct shape, dtype, and value range confirmed
- [x] Full Sprint 2 notebook assembled end-to-end and merged to main
- [x] README updated

---

## Sprint 3 Deliverables

- [x] Model architecture set up — MobileNetV2 (pretrained, frozen base, Linear(1280, 70) head)
- [x] ResNet50 trained on Google Colab GPU — Linear(2048, 70) head, 143,430 trainable parameters
- [x] Both models trained for 15 epochs using CrossEntropyLoss + Adam optimizer
- [ ] Training loop — Cameron (cross entropy loss, Adam, train/val loop)
- [ ] Loss curve plots + written interpretation — Ozor
- [ ] Evaluation metrics + confusion matrix — Manuela (accuracy, precision, recall, F1)
- [ ] Written performance analysis comparing MobileNetV2 vs ResNet50
- [ ] All sections merged into single notebook on main
- [ ] Notebook run top to bottom with all cell outputs visible
- [ ] README updated

### Sprint 3 Results (ResNet50 — Google Colab T4 GPU)

| Metric | Score |
|--------|-------|
| Accuracy | 96.14% |
| Precision | 96.30% |
| Recall | 96.14% |
| F1 Score | 96.09% |

---

## Team

| Name | Role |
|------|------|
| Dre | Group Lead — SQL database, metadata schema, notebook structure |
| Cameron | Data cleaning — CSV verification, label fixes, image QA |
| Manuela | Preprocessing pipeline — Dataset class, transforms, augmentation |
| Ozor | Class imbalance — WeightedRandomSampler, DataLoader setup |

---

## Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=flat&logo=jupyter&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat&logo=sqlite&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)

---

## Acknowledgements

Fellowship: The Knowledge House — Data Science Phase 3
