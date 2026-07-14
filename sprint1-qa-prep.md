# Sprint 1 — Q&A Prep Guide
**Pluto's Repawsitory · Dre's Cheat Sheet**

Use this to understand what's behind each slide so you can answer anything confidently.

---

## SLIDE 1 — Title
**What it is:** Intro slide. Group name, project name, team members.

**Why it matters:** Sets the tone. You're the group lead — own the room from the start.

**Possible questions:**
- *What does "Pluto's Repawsitory" mean?*
  → It's a play on "repository" — Pluto is a dog name, repawsitory = repository. Just a fun group name.

---

## SLIDE 2 — What We're Building
**What it is:** The project goal — a CNN that classifies dog breeds from photos.

**What a CNN is:** A Convolutional Neural Network. It's a type of deep learning model designed specifically for images. Instead of being told "look for ears" or "look for fur color," it learns those features on its own by looking at thousands of examples.

**What the demo is:** A web app where someone uploads a dog photo and gets the breed back instantly. Think of it like Google Lens but just for dogs.

**The 3 challenges:**
1. **Visually similar breeds** — some breeds look nearly identical (French Bulldog vs Boston Terrier). The model has to learn subtle differences.
2. **Class imbalance** — some breeds have way more training images than others, which can bias the model.
3. **Deployment** — getting the model out of a Jupyter notebook and into something anyone can use.

**Possible questions:**
- *Why a CNN and not another model?*
  → CNNs are the standard for image classification. They're specifically designed to detect spatial patterns in images — other models like linear regression can't do that.
- *What does "deploy" mean?*
  → Making the model accessible to users, usually as a web app. We're planning to use Streamlit or Gradio.

---

## SLIDE 3 — The Dataset
**What it is:** Info about the data we're training on.

**The numbers:**
- 70 breeds (classes)
- ~9,300 total images
- Already split: Train (7,946) / Validation (700) / Test (700)
- Image size: 224×224 pixels

**Why 224×224?** That's the standard input size for most pretrained models like ResNet and MobileNet. Using the same size means we can use transfer learning — borrowing a model that's already been trained on millions of images.

**The wild canids issue:** The dataset includes coyotes, dingos, and African wild dogs. These aren't domestic dog breeds. We flagged it as a limitation — our model might learn to classify them, but technically they're outside our scope.

**Possible questions:**
- *Where did you get the dataset?*
  → Kaggle. It's called the "70 Dog Breeds Image Dataset" by gpiosenka.
- *Why is the train/val/test split important?*
  → Train = what the model learns from. Validation = used during training to check if it's improving. Test = held out completely, used once at the end to measure real performance. Keeping them separate prevents cheating.
- *What is transfer learning?*
  → Instead of training a model from scratch, you start with one that's already learned general image features (like edges and shapes) from millions of photos. Then you retrain just the last few layers on your specific data. It's faster and works better with smaller datasets.

---

## SLIDE 4 — Class Distribution
**What it is:** How evenly the 70 breeds are represented in the training data.

**The numbers:**
- Mean: 114 images per breed
- Max: Shih-Tzu at 198
- Min: American Hairless at 65
- Standard deviation: ~25

**What standard deviation means here:** Most breeds fall within 25 images of the average (114). So roughly between 89–139. A std dev of 25 on a mean of 114 is relatively tight — it's a mild imbalance, not a severe one.

**Why imbalance is a problem:** If the model sees 198 Shih-Tzu images and only 65 American Hairless images, it might learn to predict Shih-Tzu more often just because it's seen it more. That's bias.

**How we'll fix it (Sprint 2):**
- **Augmentation** — artificially create more images for underrepresented breeds by flipping, rotating, or zooming existing ones
- **Class weighting** — tell the model to penalize mistakes on rare breeds more heavily

**Possible questions:**
- *Is 25 a high or low standard deviation?*
  → Low-to-moderate. The range (65–198) is the bigger concern, not the std dev itself. It's manageable.
- *What's augmentation?*
  → Taking an existing image and creating variations — flipping it horizontally, rotating it slightly, adjusting brightness. The model treats each variation as a new image, which helps balance the dataset.

---

## SLIDE 5 — Sample Image Grid
**What it is:** Cameron pulled one image per breed and displayed them in a grid so the team could visually inspect the data.

**Why it matters:** You can't just trust the numbers. Actually looking at the images reveals things stats don't — like how similar certain breeds look to each other.

**Key finding:** French Bulldogs, Boston Terriers, and regular Bulldogs are very visually similar. The model will likely struggle to tell them apart.

**Possible questions:**
- *Why is visual inspection important?*
  → It catches problems you can't see in a spreadsheet — wrong labels, corrupt images, or breeds that look so similar the model might always confuse them.
- *What does this mean for the model?*
  → We know going in which breeds will be hard. We can watch for those in evaluation and potentially give them extra training attention.

---

## SLIDE 6 — Data Quality
**What it is:** Ozor checked all 9,346 images for corruption, missing files, and size issues.

**Results:** Everything clean — zero corrupted files, zero missing images.

**The label bug:** The dataset showed 71 unique class labels instead of 70. "American Spaniel" had a double space in the folder name, so Python's pandas library was treating "American Spaniel" and "American  Spaniel" as two different breeds. Ozor caught it and fixed it by stripping extra whitespace.

**Why this matters:** If you train with 71 classes when there are only 70, your model has a broken output layer. It could silently hurt performance without you knowing why.

**Possible questions:**
- *How did you check for corrupted images?*
  → We tried to open every image with Python's PIL library. If it throws an error, it's corrupted.
- *Why would a double space cause that problem?*
  → File systems and string comparisons are exact. "American Spaniel" and "American  Spaniel" are literally different strings to a computer, so pandas counts them as separate categories.

---

## SLIDE 7 — Background Research
**What it is:** Manuela researched how CNNs work so the team has a shared understanding before building.

**How CNNs work (simple version):**
1. Image goes in as pixel values (numbers between 0–255 for each color channel)
2. Convolution layers scan the image looking for patterns — edges first, then shapes, then complex features
3. Pooling layers shrink the image down to keep only the important parts
4. Fully connected layers combine everything
5. Softmax at the end converts raw scores into probabilities for each of the 70 breeds
6. The breed with the highest probability is the prediction

**Why this matters for our project:** With 70 similar-looking breeds, we need a model that can detect subtle differences automatically. That's exactly what the convolution layers do.

**Possible questions:**
- *What is softmax?*
  → A math function that converts a list of raw scores into probabilities that add up to 100%. So instead of "breed 12 scores 4.7," you get "breed 12: 82% confidence."
- *What's the difference between a CNN and a regular neural network?*
  → Regular neural networks treat every pixel independently — they lose spatial context. CNNs look at neighborhoods of pixels together, which is how they detect shapes and patterns.

---

## SLIDE 8 — Sprint 2 Plan
**What it is:** The four things we're building next.

**The four tasks:**
1. **Preprocessing** — resize all images to 224×224 (some may not be exact), normalize pixel values from 0–255 to 0–1. Normalization helps the model train faster and more stably.
2. **Augmentation** — flip, rotate, zoom images for under-represented breeds to balance the dataset.
3. **Verify splits** — make sure train/val/test don't overlap and the class distribution is consistent across all three.
4. **TensorFlow vs PyTorch** — both are deep learning frameworks. We need to pick one. PyTorch is more flexible and popular in research. TensorFlow has strong deployment tools (TensorFlow Lite, TensorFlow.js).

**Possible questions:**
- *Why do you need to normalize pixel values?*
  → Models train better when inputs are on a small, consistent scale. Raw pixel values (0–255) are large and uneven. Normalizing to 0–1 makes gradient descent more stable.
- *Which framework are you leaning toward?*
  → We haven't finalized yet — that's the Sprint 2 decision. PyTorch is likely given its flexibility, but we're evaluating both.

---

## SLIDE 9 — Close
Just a clean exit. Invite questions, stay confident.

If someone asks something you don't know — say: *"That's something we're investigating in Sprint 2"* or *"Good question, we'll look into that."* Never guess.

---

## General Questions You Might Get

**Q: What makes this project hard?**
→ The visual similarity between breeds is the main challenge. Also 70 classes is a lot — most beginner projects do 2–10.

**Q: What accuracy are you aiming for?**
→ We haven't set a target yet — that'll come after Sprint 2 baseline training. Transfer learning models typically hit 80–90%+ on similar tasks.

**Q: Why not just use a pretrained model off the shelf?**
→ We will — transfer learning is the plan. But we still need to fine-tune it on our specific 70-breed dataset. No pretrained model knows exactly these 70 classes.

**Q: What's your deployment plan?**
→ A Streamlit or Gradio web app. User uploads a photo, model returns the top prediction (and maybe top 3 with confidence scores).
