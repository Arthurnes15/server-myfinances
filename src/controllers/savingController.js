import SavingModel from '../models/Saving.js';
import CloudinaryStorage from '../models/Storage.js';
class SavingController {
  async store(req, res) {
    const sentSaving = new SavingModel(req.body);

    const { id, name, price, investment, percentage, image, user } = sentSaving;

    const err = sentSaving.validateSync();

    try {
      await sentSaving.save();

      return res
        .status(200)
        .json({ id, name, price, investment, percentage, image, user });
    } catch {
      return res.status(400).json({
        errors: err,
      });
    }
  }

  async index(req, res) {
    try {
      const savings = await SavingModel.find()
        .where({ user: req.userEmail })
        .sort({
          createdOn: -1,
        });

      return res.status(200).json(savings);
    } catch {
      return res.status(500).json(null);
    }
  }

  async update(req, res) {
    try {
      const { name, investment, price, image } = req.body;
      const { id } = req.params;
      let percentage = 0;

      if (!id) {
        return res.status(400).json({
          errors: ['ID pendente'],
        });
      }

      const oldSaving = await SavingModel.findById(id);
      percentage = ((investment * 100) / price).toFixed(2);
      await oldSaving.updateOne({ percentage });

      const oldImage = oldSaving.image;

      const isImageBase64 = image.split(':')[0] === 'data';

      if (isImageBase64) {
        if (oldImage !== null) {
          const imageArray = oldImage.split('/');
          const imageFile = imageArray[imageArray.length - 1];
          const imageName = imageFile.split('.')[0];
          await CloudinaryStorage.deleteImage(imageName).catch((err) =>
            console.log('Error deleting file', err)
          );
        }
        const uploadedImage = await CloudinaryStorage.uploadImage(image);
        await oldSaving
          .updateOne({ image: uploadedImage.secure_url })
          .catch((err) => console.log('Error uploading file', err));
      }

      const updatedSaving = await oldSaving.updateOne({
        name,
        price,
        investment,
      });

      return res.status(200).json(updatedSaving);
    } catch (err) {
      return res.status(400).json({
        errors: err,
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID pendente'],
        });
      }

      const saving = await SavingModel.findById(id);

      const { image } = saving;

      if (image !== null) {
        const imageArray = image.split('/');
        const imageFile = imageArray[imageArray.length - 1];
        const imageName = imageFile.split('.')[0];
        await CloudinaryStorage.deleteImage(imageName).catch((err) =>
          console.log(err)
        );
      }

      await saving.deleteOne();

      return res.json({
        deleted: true,
      });
    } catch {
      return res.json(null);
    }
  }
}

export default new SavingController();
