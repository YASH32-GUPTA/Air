import dotenv from 'dotenv';
dotenv.config();

import cloudinary from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'Air',
        format: async (req, file) => ['png', 'jpeg', 'jpg'], // supports promises as well
    },
});

console.log('Cloudinary config:', {
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
}); 



export { cloudinary, storage };
