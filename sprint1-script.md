# Sprint 1 Standup — Script
**Pluto's Repawsitory · Group 2 · Dog Breed Classification · June 11, 2026**
**Target: 5–7 minutes**

---

## SLIDE 1 — Title
**[ DRE ]**

Hey everyone — we're Pluto's Repawsitory, Group 2.
I'm Dre, group lead. With me today are Cameron, Manuela, and Ozor.
We'll walk you through what we accomplished in Sprint 1 and where we're headed next.

---

## SLIDE 2 — What We're Building
**[ DRE ]**

Our goal is to build a CNN that looks at a photo of a dog and identifies the breed.
The end product is a demo — upload a photo, get a prediction instantly.

The three challenges we're focused on:
- Visually similar breeds
- Class imbalance in the data
- Deployment

Sprint 1 was all about getting organized and understanding our data before writing any model code.

---

## SLIDE 3 — The Dataset
**[ DRE ]**

We're using the 70 Dog Breeds dataset from Kaggle.
About 9,300 images across 70 classes — already split into train, validation, and test.
Images are 224×224, which is ideal for transfer learning.

Worth noting — the dataset isn't strictly domestic breeds.
It includes wild canids like coyotes, dingos, and African wild dogs.
We flagged that as a limitation in our EDA.

---

## SLIDE 4 — Class Distribution
**[ DRE ]**

The average breed has about 114 training images.
Shih-Tzu is the most represented at 198. American Hairless is the lowest at 65.
Standard deviation is 25 — mild imbalance, but it's there.

In Sprint 2 we'll address it with augmentation or class weighting
so the model doesn't just get good at predicting the most common breeds.

---

## SLIDE 5 — Sample Image Grid
**[ CAMERON ]**

My part was building the sample image grid —
pulling one image per breed from the dataset so the team could see what we're working with.

It was eye-opening. French Bulldogs, Boston Terriers, and regular Bulldogs
look almost identical. Those are going to be the hard cases for our model.

This visual check gives us context before training —
we already know where the model is going to struggle.

---

## SLIDE 6 — Data Quality
**[ OZOR ]**

I ran through all 9,346 images and checked for corrupted files,
missing images, and anything suspiciously small.

Everything came back clean — zero corrupted, zero missing.

But I did catch a label bug. The dataset was showing 71 unique breeds instead of 70.
Turned out "American Spaniel" had a double space in the label,
so pandas was reading it as two separate breeds.
Stripped the whitespace, back to 70. Small thing — but important to catch before training.

---

## SLIDE 7 — Background Research
**[ MANUELA ]**

I researched how CNNs work for image classification.

The key takeaway: CNNs take raw pixel data and use convolution layers
to automatically learn features — edges, shapes, textures —
without being told what to look for.
At the end, a softmax function converts the output into probabilities for each class.

With 70 breeds, many of which look nearly identical,
we need a model that can detect subtle visual differences on its own.
That's exactly what CNNs are built for.

---

## SLIDE 8 — Sprint 2 Plan
**[ DRE ]**

Heading into Sprint 2, we have four priorities:

1. **Preprocessing** — resize and normalize all images
2. **Augmentation** — address under-represented breeds
3. **Splits** — verify the train / val / test distribution is solid
4. **Framework decision** — finalize TensorFlow vs PyTorch

By end of Sprint 2 we'll have a clean, ready-to-train dataset
and a preprocessing pipeline locked in.

---

## SLIDE 9 — Close
**[ DRE ]**

That's Sprint 1 for Group 2.
Data is clean, EDA is done, and we're ready to build.

Any questions?

---

## Timing Guide

| Section | Presenter | Time |
|---|---|---|
| Title + What We're Building + Dataset | Dre | ~1.5 min |
| Class Distribution | Dre | ~1 min |
| Sample Image Grid | Cameron | ~1 min |
| Data Quality | Ozor | ~1 min |
| Background Research | Manuela | ~1 min |
| Sprint 2 + Close | Dre | ~1 min |
| **Total** | | **~6.5 min** |

---

## Tips

- Speak slowly — you have more time than you think
- Don't read word for word — use it as a guide
- Look up, make eye contact
- If someone stumbles, keep going — it's a standup, not a final
- Practice it once and it'll feel natural
