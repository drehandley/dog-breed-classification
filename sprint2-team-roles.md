# Sprint 2 — Team Roles & Responsibilities
**Pluto's Repawsitory · Group 2**

---

## DRE — Group Lead & SQL / Database
**Sprint 1:** Led the project, built the EDA notebook, analyzed class distribution (found mean 114 images/breed, Shih-Tzu max at 198, American Hairless min at 65, std dev ~25), identified the wild canid limitation in the dataset, and wrote the full Section 8 written summary.

**Sprint 2:** Setting up the SQL database that stores metadata for all 9,346 images — file paths, breed labels, and which split each image belongs to (train/val/test). This is the foundation everything else connects to. The notebook will pull data from this database instead of reading raw files directly, which is how real ML pipelines work. Also writing the notebook intro and closing summary, updating the README, and merging all branches into main.

**Why this matters:** Without a structured database, the pipeline is just a pile of file paths. SQL gives the team a single source of truth for the data and makes the notebook reproducible for anyone who runs it.

---

## CAMERON — Data Cleaning
**Sprint 1:** Built the sample image grid — pulled one image per breed from the dataset and displayed them visually so the team could see what they're working with. Identified that French Bulldogs, Boston Terriers, and regular Bulldogs look almost identical, flagging them as hard classification cases.

**Sprint 2:** Loading all 9,346 images and checking every single one for problems — files that fail to open, blank images, anything with unusually small dimensions, and inconsistent formats (making sure everything is JPEG or PNG). Documenting every issue found and every decision made directly in the notebook with written commentary.

**Why this matters:** Cameron's Sprint 1 visual check showed us the data looks reasonable, but looking isn't the same as verifying. Sprint 2 is the systematic version of that — making sure nothing broken enters the preprocessing pipeline. Garbage in = garbage out.

---

## OZOR — Class Imbalance & DataLoader
**Sprint 1:** Ran the full data quality and integrity check across all 9,346 images — zero corrupted files, zero missing images. Also caught the label bug where "American Spaniel" had a double space, causing pandas to count 71 breeds instead of 70. Fixed it by stripping the whitespace.

**Sprint 2:** Taking the class imbalance Dre identified in Sprint 1 (some breeds have 198 images, others only 65) and deciding how to fix it. Will implement WeightedRandomSampler or manual oversampling so the model doesn't favor common breeds. Also setting up the DataLoader with the right batch size and verifying a sample batch loads correctly with the right shape and value range.

**Why this matters:** Ozor already proved the data is clean in Sprint 1. Now he's making sure the model sees it fairly — if it trains on 3x more Shih-Tzu images than American Hairless, it'll just get good at predicting Shih-Tzu. The imbalance fix is what prevents that.

---

## MANUELA — Preprocessing Pipeline & PyTorch Dataset
**Sprint 1:** Researched how CNNs work for image classification — convolution layers, feature learning, softmax output — and shared those findings with the team so everyone had a shared understanding before Sprint 2.

**Sprint 2:** Building the actual preprocessing pipeline. This means resizing every image to 224×224 (required for transfer learning), normalizing pixel values using ImageNet mean and standard deviation values, and applying data augmentation (random flips, rotations, color changes) to the training split only. Wrapping all of this in a custom PyTorch Dataset class that loads an image and applies the right transforms depending on whether it's train, validation, or test data.

**Why this matters:** Manuela's Sprint 1 research explained what CNNs need. Sprint 2 is delivering it — the Dataset class she builds is the direct connection between the raw image files and the model. Without it, training can't start.

---

## How It All Connects
```
DRE (SQL database)
    ↓
CAMERON (clean the images)
    ↓
MANUELA (preprocessing pipeline + Dataset class)
    ↓
OZOR (balance the classes + DataLoader)
    ↓
Model-ready batches → Sprint 3 training
```
Each person's work feeds the next. The order matters.
