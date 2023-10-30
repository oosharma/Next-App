from io import BytesIO
from PIL import Image, ImageDraw, ImageFont
import requests
import sys
import base64

base64_encoded = base64.b64encode(img_bytes.getvalue()).decode('utf-8')

arg1 = sys.argv[1]
arg2 = sys.argv[2]

print("hello from python, her are the args " + arg1 + " " + arg2)