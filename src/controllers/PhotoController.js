import multer from 'multer';

import multerConfig from '../config/multer.js';
import PhotoModel from '../models/photo.js';
import urlConfig from '../config/urlPhoto.js';

const upload = multer(multerConfig).single('photo');

class PhotoController {
  async store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      const { originalname, filename } = req.file;

      let { url } = req.file;
      url = `${urlConfig.url}/images/${filename}`;

      const photo = await PhotoModel.create({ originalname, filename, url });

      return res.json(photo);
    });
  }
}

export default new PhotoController();
