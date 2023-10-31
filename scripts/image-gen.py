# responds with base64 encoded image and saves image to output_image.png
from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import requests
import sys
import base64

subheading_text1 = sys.argv[1]
subheading_text2 = sys.argv[2]
subheading_text3 = sys.argv[3]
 
# Define font paths
font_bold = "OpenSans-Bold.ttf"
font_light = "OpenSans-Light.ttf"

# Define colors
color_blue = (38, 40, 61)
color_white = (255, 255, 255)

# Define image dimensions and margin
img_width = 1080
img_height = 1290
margin = 20

# Create new image
img = Image.new("RGB", (img_width, img_height), color_blue)
draw = ImageDraw.Draw(img)

# Load and resize image 1
img1 = Image.open('header-image.png')
img1_aspect_ratio = img1.width / img1.height
img1_new_height = int((img_width - margin*2) / img1_aspect_ratio)
img1 = img1.resize((img_width - margin*2, img1_new_height))

img2 = Image.open('footer-image.png')
img2_width = img_width
img2_aspect_ratio = img2.width / img2.height
img2_new_height = int(img2_width / img2_aspect_ratio)
img2 = img2.resize((img2_width, img2_new_height))

# Paste image 1 onto main image
img.paste(img1, (margin, margin))

# Add heading and subheading text
font_heading = ImageFont.truetype(font_bold, 100)
font_subheading1 = ImageFont.truetype(font_bold, 35)
font_subheading = ImageFont.truetype(font_light, 35)

heading_text = "Pending"
# subheading_text1 = "4226 Comet Cir, Union City, CA 94587"
# subheading_text2 = "$638,888 | 3 Beds | 2 Baths"
# subheading_text3 = "1,255 sq. ft. (Built-Up) | 1,975 sq. ft. (Lot Size)"

heading_size = draw.textsize(heading_text, font_heading)
subheading_size1 = draw.textsize(subheading_text1, font_subheading1)
subheading_size2 = draw.textsize(subheading_text2, font_subheading)
subheading_size3 = draw.textsize(subheading_text3, font_subheading)

heading_x = margin
heading_y = margin + img1_new_height + 10
heading_center_x = img_width / 2 - heading_size[0] / 2
subheading_center_x = img_width / 2 - subheading_size1[0] / 2
subheading_center_x2 = img_width / 2 - subheading_size2[0] / 2
subheading_center_x3 = img_width / 2 - subheading_size3[0] / 2

draw.text((heading_center_x, heading_y), heading_text, font=font_heading, fill=color_white)
draw.text((subheading_center_x, heading_y + heading_size[1] + 10), subheading_text1, font=font_subheading1, fill=color_white)
draw.text((subheading_center_x2, heading_y + heading_size[1] + 10 + subheading_size1[1] + 10), subheading_text2, font=font_subheading, fill=color_white)
draw.text((subheading_center_x3, heading_y + heading_size[1] + 10 + subheading_size1[1] + 10 + subheading_size2[1] + 10), subheading_text3, font=font_subheading, fill=color_white)

pin_img = Image.open('pin.png')
pin_height = heading_size[1] - 56
pin_aspect_ratio = pin_img.width / pin_img.height
pin_width = int(pin_height * pin_aspect_ratio)
pin_img = pin_img.resize((pin_width, pin_height))
img.paste(pin_img, (int(heading_center_x) - 39 , heading_y + 32))

# Paste image 2 onto main image
img.paste(img2, (0, img_height - img2_new_height))

# Save image
img_bytes = BytesIO()
img.save(img_bytes, format='PNG')
img_bytes.seek(0)
with open("output_image.png", "wb") as f:
    f.write(img_bytes.getvalue())
    
    
base64_encoded = base64.b64encode(img_bytes.getvalue()).decode('utf-8')

print(base64_encoded)

