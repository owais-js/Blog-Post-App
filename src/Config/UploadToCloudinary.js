const uploadToCloudinary = async (imageFile) => {
    const cloudName = 'dboymvlni';
    const uploadPreset = 'blogs-img'; 

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('upload_preset', uploadPreset);

    try {
        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Cloudinary Upload Error:', errorData);
            throw new Error(`Failed to upload image: ${errorData.message || response.statusText}`);
        }

        const data = await response.json();
        return data.secure_url;
    } catch (error) {
        console.error('Error during image upload:', error);
        throw new Error(error.message || 'Unknown error occurred during upload.');
    }
};

export default uploadToCloudinary;