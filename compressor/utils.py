from PIL import Image
from io import BytesIO

def compress(image):
    img = Image.open(image)
    output = BytesIO()
    img.save(output, format='JPEG', quality = 25)
    return output.getvalue()