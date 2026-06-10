# Background Research Dog Breed Classification with CNNs

---

## Article 1 — How CNNs Work for Image Classification

**Title:** "Image Classification with Convolutional Neural Networks (CNNs)"  
**Source:** KDnuggets  
**Link:** https://www.kdnuggets.com/2022/05/image-classification-convolutional-neural-networks-cnns.html

### What I Learned
CNNs take images as numerical data (pixels) and use the convolution operation to reduce the 
representation down to only the features that actually matter for classification things like 
edges, shapes, and textures. At the end, a softmax activation function converts the network's 
output into class probabilities, one per category.

This was helpful for understanding why CNNs are used for dog breeds the model doesn't need 
to be told what a floppy ear or a spotted coat looks like, it figures those distinguishing 
features out on its own during training.

---

## Article 2 — Dog Breed Classification Using Transfer Learning (ResNet34)

**Title:** "Dog Breed Classification Using ResNet34: A Transfer Learning Approach"  
**Source:** Medium  
**Link:** https://medium.com/@adarsheluri143/dog-breed-classification-using-resnet-34-a-transfer-learning-approach-0e3a602c2238

### What I Learned
Fine-tuning means taking a pretrained model like ResNet34  already trained on millions of 
ImageNet images and retraining it on a smaller, task specific dataset like dog breeds. 
Instead of building from scratch, you leverage the model's existing knowledge and adapt it 
to your specific problem, getting strong results with far less data and compute.

This article is almost exactly what our project is doing, so it was very relevant to read through.

---