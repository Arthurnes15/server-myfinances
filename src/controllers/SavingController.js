import SavingModel from '../models/saving.js';

class SavingController {
  async store(req, res) {
    const sentSaving = new SavingModel(req.body);

    const { id, name, price, investment, user } = sentSaving;

    sentSaving.percentage = ((investment * 100) / price).toFixed(2);

    const err = sentSaving.validateSync();

    try {
      await sentSaving.save();

      return res.json({ id, name, price, investment, user });
    } catch {
      return res.status(400).json({
        errors: err.errors,
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
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID pendente'],
        });
      }

      const sentSaving = await SavingModel.findById(id);

      const updatedSaving = await sentSaving.updateOne(req.body);

      return res.json(updatedSaving);
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

      await saving.deleteOne();

      return res.json({
        apagado: true,
      });
    } catch {
      return res.json(null);
    }
  }
}

export default new SavingController();
