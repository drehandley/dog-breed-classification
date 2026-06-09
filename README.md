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

- 70 breeds, ~7,946 images
- Pre-split into train, valid, and test folders
- Images resized to 224x224

---

## Project Structure

```
dog-breed-classification/
├── notebooks/
│   ├── 01_eda.ipynb              # Exploratory data analysis
│   ├── 02_preprocessing.ipynb   # Cleaning, resizing, augmentation
│   └── 03_modeling.ipynb        # CNN training and evaluation
├── data/                        # Raw and processed data (gitignored)
├── docs/
│   └── report.md                # Project report
└── README.md
```

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

- [ ] GitHub repo created, all members added as collaborators
- [ ] Each member has their own branch
- [ ] Kanban board set up with tasks assigned
- [ ] Background research — papers and blog posts on dog breed classification / CNNs
- [ ] Problem definition — questions, features, definition of done
- [ ] Value statement — why this matters
- [ ] Limitations — expected challenges
- [ ] EDA notebook (`01_eda.ipynb`) merged to main covering:
  - Class distribution bar chart
  - Sample image grid per breed
  - Image dimension distribution
  - Class imbalance check
  - Written summary + preprocessing plan for Sprint 2

---

## Team

| Name | Role |
|------|------|
| Dre | Group Lead |
| Cameron | TBD |
| Manuela | TBD |
| Ozor | TBD |

---

## Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=flat&logo=jupyter&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white)
![scikit-learn](https://img.shields.io/badge/scikit--learn-F7931E?style=flat&logo=scikit-learn&logoColor=white)

---

## Acknowledgements

Fellowship: The Knowledge House — Data Science Phase 3
