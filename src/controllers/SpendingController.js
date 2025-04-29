import { SpendingModel } from '../models/spending.js';

class SpendingController {
  async store(req, res) {
    const sentSpending = new SpendingModel(req.body);
    const err = sentSpending.validateSync();

    try {
      await sentSpending.save();

      const { id, item, cost, date, necessity } = sentSpending;

      return res.json({ id, item, cost, date, necessity });
    } catch {
      return res.status(400).json({
        errors: err.errors,
      });
    }
  }

  async index(req, res) {
    try {
      const spendings = await SpendingModel.find()
        .where({ user: req.userEmail })
        .sort({
          date: -1,
        });

      return res.json(spendings);
    } catch {
      return res.json(null);
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

      const sentSpending = await SpendingModel.findById(id);

      const updatedSenting = await sentSpending.updateOne(req.body);

      return res.json(updatedSenting);
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

      const spending = await SpendingModel.findById(id);

      await spending.deleteOne();

      return res.json({
        apagado: true,
      });
    } catch {
      return res.json(null);
    }
  }
}

export default new SpendingController();
