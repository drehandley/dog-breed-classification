# Sprint 2 — Kanban Tasks
**Copy these into GitHub Projects → Sprint 2 column**

---

## DRE
- [ ] Set up SQL database with metadata schema (file paths, labels, splits)
- [ ] Write SQL queries to pull train/val/test splits into notebook
- [ ] Write notebook intro cell and closing summary cell
- [ ] Update README for Sprint 2
- [ ] Merge Sprint 2 notebook into main branch
- [ ] Update Kanban board throughout sprint

## CAMERON
- [ ] Load all 9,346 images and flag corrupted / blank / undersized files
- [ ] Confirm all images are JPEG or PNG, convert any outliers
- [ ] Document all cleaning decisions with written commentary in notebook
- [ ] Contribute to verification section (sample batch shape + value range)

## OZOR
- [ ] Finalize class imbalance strategy (WeightedRandomSampler, oversampling, or augmentation)
- [ ] Implement chosen imbalance strategy in code
- [ ] Set up DataLoader with appropriate batch size
- [ ] Verify DataLoader output: correct shape, dtype, value range

## MANUELA
- [ ] Complete background research on torchvision transforms, Dataset class, DataLoader — share summary with team
- [ ] Build preprocessing pipeline (resize to 224×224, normalize with ImageNet values)
- [ ] Apply augmentation to train split only (Flip, Rotation, ColorJitter)
- [ ] Write custom PyTorch Dataset class that applies correct transform per split
