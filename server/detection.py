import numpy as np # linear algebra
import pandas as pd # data processing, CSV file I/O (e.g. pd.read_csv)
import matplotlib.pyplot as plt
import cv2
import random
import sys
from tqdm import tqdm
import tensorflow as tf
from tensorflow.keras.preprocessing.image import load_img,ImageDataGenerator
import os
from keras.models import load_model 
#from google.colab.patches import cv2_imshow
import math

def crop(img):

  blurred = cv2.blur(img, (3,3))
  canny = cv2.Canny(blurred, 50, 200)
  ## find the non-zero min-max coords of canny
  pts = np.argwhere(canny>0)
  y1,x1 = pts.min(axis=0)
  y2,x2 = pts.max(axis=0)
  ## crop the region
  cropped = img[y1:y2, x1:x2]

  return cropped

def convolution(image, kernel, average=False):

  image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
  image_row, image_col = image.shape
  kernel_row, kernel_col = kernel.shape
  output = np.zeros(image.shape)

  pad_height = int((kernel_row - 1) / 2)
  pad_width = int((kernel_col - 1) / 2)
  padded_image = np.zeros((image_row + (2 * pad_height), image_col + (2 * pad_width)))
  padded_image[pad_height:padded_image.shape[0] - pad_height, pad_width:padded_image.shape[1] - pad_width] = image
  
  for row in range(image_row):
    for col in range(image_col):
      output[row, col] = np.sum(kernel * padded_image[row:row + kernel_row, col:col + kernel_col])
      if average:
        output[row, col] /= kernel.shape[0] * kernel.shape[1]
 
  return output

def dnorm(x, mu, sd):

  return 1 / (np.sqrt(2 * np.pi) * sd) * np.e ** (-np.power((x - mu) / sd, 2) / 2)
 
def gaussian_kernel(size, sigma=1):

  kernel_1D = np.linspace(-(size // 2), size // 2, size)
  for i in range(size):
    kernel_1D[i] = dnorm(kernel_1D[i], 0, sigma)

  kernel_2D = np.outer(kernel_1D.T, kernel_1D.T)
  kernel_2D *= 1.0 / kernel_2D.max()
  
  return kernel_2D
 
 
def gaussian_blur(image, kernel_size):

  kernel = gaussian_kernel(kernel_size, sigma=math.sqrt(kernel_size))
  return convolution(image, kernel, average=True)
 
 
def histogram_eq(image):

  img_array = np.asarray(image)
  img_array = img_array.astype(int)
  histogram_array = np.bincount(img_array.flatten(), minlength=256)
    
  num_pixels = np.sum(histogram_array)
  histogram_array = histogram_array/num_pixels

  chistogram_array = np.cumsum(histogram_array)

  transform_map = np.floor(255 * chistogram_array).astype(np.uint8)

  img_list = list(img_array.flatten())

  eq_img_list = [transform_map[p] for p in img_list]
  eq_img_array = np.reshape(np.asarray(eq_img_list), img_array.shape)

  backtorgb = cv2.cvtColor(eq_img_array,cv2.COLOR_GRAY2RGB)
    
  return backtorgb


input = cv2.imread(sys.argv[1])
print(sys.argv[1])
cropped = crop(input)
gaussian = gaussian_blur(cropped, 5)
histogram = histogram_eq(gaussian)

input = cv2.resize(histogram,(224,224))
input = input.reshape(1,224,224,3)

model = tf.keras.models.load_model("detect_best.h5")
pred = model.predict(input)
classes = pred.argmax(axis=-1)

result = ""

if classes == [0]:
  result = "Yok"

else:
  result = "Var"


print(result)