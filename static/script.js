// Define the resizeImage function
function resizeImage(imageUrl, callback) {
    const img = new Image();
    img.onload = function() {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 300;
        const MAX_HEIGHT = 300;
        let width = img.width;
        let height = img.height;

        if (width > height) {
            if (width > MAX_WIDTH) {
                height *= MAX_WIDTH / width;
                width = MAX_WIDTH;
            }
        } else {
            if (height > MAX_HEIGHT) {
                width *= MAX_HEIGHT / height;
                height = MAX_HEIGHT;
            }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        callback(canvas.toDataURL('image/jpeg'));
    };
    img.src = imageUrl;
}

// Attach event listener to the file input
document.getElementById('imageBox').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageUrl = e.target.result;
            resizeImage(imageUrl, function(resizedImageUrl) {
                const imagePreview = document.querySelector('.Box');
                if (imagePreview) {
                    // Clear existing background image before setting a new one
                    imagePreview.style.backgroundImage = 'none';
                    // Set the new background image
                    imagePreview.style.backgroundImage = `url(${resizedImageUrl})`;

                    // Display a message
                    const uploadMessage = document.getElementById('uploadMessage');
                    if (uploadMessage) {
                        uploadMessage.textContent = 'Image uploaded successfully!';
                    }
                } else {
                    console.error("Element with class 'imagePreview' not found.");
                }
            });
        };
        reader.readAsDataURL(file);
    }
});


