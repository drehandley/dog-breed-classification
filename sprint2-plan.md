# Sprint 2 Plan — Storage, Cleaning, and Preprocessing
**Pluto's Repawsitory · Group 2 · Dog Breed Classification**
**Sprint Dates: June 11 – June 24, 2026**

---

## Day-by-Day Goals

| Date | Goal |
|------|------|
| **6/11** | Sprint 1 standup presentation. Debrief as a team. Assign Sprint 2 tasks. Everyone reads the background research topics tonight. |
| **6/16** | Background research complete. SQL database schema designed and set up. Each member has their task started. |
| **6/17** | Data cleaning code written and running. All corrupted/inconsistent files flagged and documented. Class imbalance decision finalized. |
| **6/18** | Preprocessing pipeline built — Dataset class, transforms, and DataLoader working. Sample batch verified (correct shape, dtype, value range). |
| **6/23** | Full notebook assembled end-to-end: SQL → Cleaning → Preprocessing → Verification → Summary. README updated. |
| **6/24** | Sprint 2 standup. Notebook merged to main. Kanban updated. Submission form completed. |

---

## Task Assignments

### DRE (Group Lead)
- Set up SQL database and metadata schema (file paths, labels, split assignments)
- Write SQL queries to pull train / val / test splits into the notebook
- Write the notebook introduction cell and closing summary cell
- Update README to reflect Sprint 2 progress
- Final merge of Sprint 2 notebook into main
- Keep Kanban board up to date throughout the sprint

### CAMERON
- Data cleaning — load all 9,346 images, flag any that fail to open, are blank, or have small dimensions
- Document every cleaning decision with written commentary in the notebook
- Confirm all files are JPEG/PNG and convert any outliers
- Contribute to the verification section (load a sample batch, confirm shape and value range)

### OZOR
- Handle class imbalance — finalize the strategy (augmentation, oversampling, or class weighting)
- Implement WeightedRandomSampler or manual oversampling for underrepresented breeds
- Write the DataLoader setup with appropriate batch size
- Verify DataLoader output: shape, dtype, and value range are correct

### MANUELA
- Background research lead — summarize findings for the team on torchvision transforms, Dataset class, and DataLoader
- Build the preprocessing pipeline:
  - Resize to 224×224
  - Normalize using ImageNet mean/std values
  - Apply augmentation to train split only (RandomHorizontalFlip, RandomRotation, ColorJitter)
- Write the custom PyTorch Dataset class that loads images and applies the right transform per split

---

## What the Notebook Must Include (in order)

1. Introduction cell — what the notebook does, what sprint it belongs to
2. SQL connection + queries pulling train / val / test from the database
3. Data cleaning — code, outputs, written commentary for every decision
4. Preprocessing pipeline — Dataset class, transforms, DataLoader setup
5. Verification — sample batch with shape, dtype, and value range confirmed
6. Closing summary — what was done, what decisions were made

---

## Key Technical Decisions to Make by 6/16

- **Class imbalance strategy** — WeightedRandomSampler vs manual oversampling vs heavier augmentation
- **Batch size** — start with 32, adjust based on memory
- **Augmentation choices** — RandomHorizontalFlip + RandomRotation(15) + ColorJitter are safe defaults
- **SQL tool** — SQLite is the simplest option (no server needed), stores metadata locally

---

## ImageNet Normalization Values (copy these exactly)
```python
mean = [0.485, 0.456, 0.406]
std  = [0.229, 0.224, 0.225]
```
Use these with `transforms.Normalize(mean, std)` — required since we're using a pretrained backbone.

---

## Definition of Done
- [ ] SQL database populated with file paths, labels, and split assignments
- [ ] Jupyter notebook runs top to bottom without errors
- [ ] Sample batch loads with correct shape: `(batch_size, 3, 224, 224)`
- [ ] README updated
- [ ] Kanban board reflects completed Sprint 2 tasks
- [ ] Notebook merged to main branch
- [ ] Submission form completed before deadline
