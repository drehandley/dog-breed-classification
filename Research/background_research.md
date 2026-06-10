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

---

## Article 4 — Transfer Learning for Beginners

**Title** : "Transfer Learning For Beginner" 
**Source** : Towards Data Science 
**Link** : https://towardsdatascience.com/transfer-learning-for-beginner-9b59490d1b9d/

### What I Learned

The first thing I learned from this article is that you do not have to build a model from scratch. You take one that was already trained on a massive dataset called ImageNet which has 14 million images across 1000 categories. That model already knows how to recognize shapes, textures, patterns and all kinds of visual features. You then take that model, remove the last layer which was built for ImageNet's 1000 categories, and replace it with a new layer for your specific task. In our case that would be 70 dog breeds instead of 1000 categories.

---

## Article 5 — TensorFlow Official Guide on Transfer Learning

**Title** : "Transfer Learning and Fine-Tuning" 
**Source** : TensorFlow Official Documentation 
**Link** :https://www.tensorflow.org/tutorials/images/transfer_learning

## What I Learned

A pretrained model works like a general understanding of the visual world. It has already seen so many different images that it knows what makes objects look different from each other. When you give it a new task like dog breeds, it does not start from scratch. It builds on top of what it already knows.

The guide also showed two approaches you can take. The first is to freeze all the pretrained layers and only train the final classification layer which is faster. The second is to unfreeze a few of the top layers and train those along with the new layer which takes longer but can give better results.

---

## Article 6 — Automatic Dog Breed Classification Using Deep Learning

**Title**: "Automatic Dog Breed Classification Using Deep Learning" 
**Source** : Applied and Computational Engineering (Peer Reviewed, 2023) 
**Link** : https://www.ewadirect.com/proceedings/ace/article/view/2412

## What I Learned

This was a published research paper that focused specifically on dog breed classification which made it very directly relevant to our project. The researchers tested several different CNN models on a dog breed dataset and found that a model called DenseNet201 performed the best, reaching 87.34% accuracy.

What I found interesting is that they pointed out a reason why knowing a dog's breed actually matters in real life. It is not just for labeling purposes. Different breeds have different health risks and different lifespans, so being able to identify a breed automatically from a photo could genuinely help veterinarians and pet owners make better decisions. This connects directly to the real world use case our project is built around.