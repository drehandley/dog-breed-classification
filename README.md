# Dog Breed Classification

A deep learning project that classifies dog breeds from images using a Convolutional Neural Network (CNN). Built as a capstone project for The Knowledge House Data Science Fellowship — Phase 3.

---

## Project Overview

We are training a convolutional neural network to accurately identify dog breeds from photographs. The ultimate goal of this project is to deploy an interactive web demo where a user can upload a photo of a dog and instantly receive the predicted breed.

**Key Engineering & Research Questions:**
*   **Visual Similarity:** How effectively does the model differentiate between visually similar breeds?
*   **Class Imbalance:** How does class imbalance across different breeds affect performance, and what data augmentation or loss-function strategies best address it?
*   **Deployment:** How can we build and optimize a lightweight interactive demo for user-facing inference?

---

## Dataset

**Dog Breed Image Dataset** — Available on[ [Kaggle](https://www.kaggle.com/datasets/khushikhushikhushi/dog-breed-image-dataset)](https://www.kaggle.com/datasets/gpiosenka/70-dog-breedsimage-data-set)

---

## Tech Stack

![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Jupyter](https://img.shields.io/badge/Jupyter-F37626?style=flat&logo=jupyter&logoColor=white)
![TensorFlow](https://img.shields.io/badge/TensorFlow-FF6F00?style=flat&logo=tensorflow&logoColor=white)
![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?style=flat&logo=pytorch&logoColor=white)
![Streamlit](https://img.shields.io/badge/Streamlit-FF4B4B?style=flat&logo=streamlit&logoColor=white)
![Pandas](https://img.shields.io/badge/Pandas-150458?style=flat&logo=pandas&logoColor=white)

> *Note: Final deep learning framework (TensorFlow/PyTorch) and deployment tool (Streamlit/Gradio) to be finalized during Sprint 2.*

---

## Project Structure

```text
dog-breed-classification/
├── notebooks/
│   ├── 01_eda.ipynb              # Exploratory data analysis & class distribution
│   ├── 02_preprocessing.ipynb   # Image cleaning, resizing, and augmentation pipelines
│   └── 03_modeling.ipynb        # CNN architecture training and evaluation
├── data/                        # Raw and processed datasets (gitignored)
├── models/                      # Saved weights, model architectures, and pickles (gitignored)
├── docs/
│   └── report.md                # Final project report and findings
├── requirements.txt             # Environment dependencies
└── README.md
