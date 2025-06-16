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
          // TODO: Public ID
        })
        .catch((error) => {
          console.log(error);
        });

      return uploadResult;
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }
}

export default new Storage();
