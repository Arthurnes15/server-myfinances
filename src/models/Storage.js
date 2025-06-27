import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';

class Storage {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET,
    });
  }

  async uploadImage(image) {
    try {
      const uploadResult = await cloudinary.uploader
        .upload(image, {
          overwrite: true,
          resource_type: 'image',
        })
        .catch((error) => {
          console.log(error);
        });

      return uploadResult;
    } catch (error) {
      console.log('Error uploading image: ', error);
    }
  }

  async deleteImage(image) {
    try {
      await cloudinary.uploader.destroy(image).catch((err) => console.log(err));
    } catch (error) {
      console.log('Error deleting image: ', error);
    }
  }
}

export default new Storage();
