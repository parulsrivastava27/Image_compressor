from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse
from .utils import compress

# Create your views here.
def index(request):

    if request.method == 'POST':

        if 'image' in request.FILES:

            uploaded_image = request.FILES['image']

            compressed_image = compress(uploaded_image)

            response = HttpResponse(compressed_image, content_type = 'image/jpeg')
            response['Content-Disposition'] = 'attachment; filename=compressed_image.jpg'
            return response

        else:
            messages.info(request, 'No image selected')
            return render(request, 'index.html')
            
    return render(request, 'index.html')
