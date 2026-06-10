# Background Research Dog Breed Classification with CNNs

---

## Article 1 — How CNNs Work for Image Classification

**Title:** "Image Classification with Convolutional Neural Networks (CNNs)"  
**Source:** KDnuggets  
**Link:** https://www.kdnuggets.com/2022/05/image-classification-convolutional-neural-networks-cnns.html

### What I Learned

A CNN works by looking at an image as a grid of numbers, basically just pixel values, and then scanning it in small sections to pick out patterns. It does this through something called convolution, where it uses filters to find things like edges, shapes, and textures in the image. Each filter is looking for something different, and the model stacks all of these together to build up an understanding of what is in the image.

After all that scanning and filtering, the image gets compressed down and passed through a final layer that gives you a percentage for each possible category. Since our project has 70 dog breeds, the model would output something like "65% chance this is a Golden Retriever, 20% Labrador" and so on. This final step uses something called softmax which just converts the raw numbers into probabilities.

What I found most useful from this article is understanding why CNNs are better than regular neural networks for images. A normal neural network would just look at every single pixel individually which is extremely slow and misses the bigger picture. A CNN is smarter because it looks at regions of the image and learns what combinations of pixels actually matter.

---

## Article 2 — Dog Breed Classification Using Transfer Learning (ResNet34)

**Title:** "Dog Breed Classification Using ResNet34: A Transfer Learning Approach"  
**Source:** Medium  
**Link:** https://medium.com/@adarsheluri143/dog-breed-classification-using-resnet-34-a-transfer-learning-approach-0e3a602c2238

### What I Learned

The main thing I learned from it is what fine tuning actually means in simple terms.
You take a model called ResNet34 that was already trained on millions of images from the internet. Because of that it already knows how to recognize basic things like shapes, edges and textures. Instead of building a model from zero, you just take that existing model and teach it one new specific thing, in this case dog breeds.

The author used a dataset of 5 dog breeds, organized the images into folders by breed, and used a library called fastai to retrain just the last layers of ResNet-34. The result was a model that could predict the correct breed with 99% accuracy.



---
## Article 3 - Research Paper: CNN + Transfer Learning for Dog Breeds (95%+ Accuracy)

**Title:** "Classification of Dog Breeds Using CNN Models and Support Vector Machine"  
**Source:** MDPI Bioengineering (Peer Reviewed)  
**Link:** https://www.mdpi.com/2306-5354/11/11/1157  
**PubMed:** https://pubmed.ncbi.nlm.nih.gov/39593817/

### What I Learned

The first thing that stood out to me is that they confirmed this is genuinely a hard problem. A lot of dog breeds look almost identical to each other. They gave the example of the English Foxhound, the Beagle, and the Walker Hound, even the researchers said these are hard to tell apart just by looking at them. 

The model they built still struggled with those breeds, getting only around 67% accuracy on them. That is something our team should keep in mind when we look at our results.
What they did differently from most other researchers is instead of using just one CNN model, they combined four of them together and then used a separate method to pick the most useful features from all four. By doing this they reached 95.24% accuracy on 120 breeds which was better than any other method tested on the same dataset before.

For our project we are only working with 70 breeds. Based on what this paper showed, even a single model can get to around 90% accuracy, so that is a realistic goal for us.