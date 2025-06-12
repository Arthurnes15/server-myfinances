import InvoiceModel from '../models/Invoice.js';

class InvoiceController {
  async store(req, res) {
    const sentInvoice = new InvoiceModel(req.body);
    const err = sentInvoice.validateSync();

    try {
      await sentInvoice.save();

      const {
        id,
        item,
        total,
        installmentsNumber,
        installmentsValue,
        date,
        status,
        months,
      } = sentInvoice;

      return res.json({
        id,
        item,
        total,
        installmentsNumber,
        date,
        status,
        months,
        installmentsValue,
      });
    } catch {
      return res.status(500).json({
        errors: err.errors,
      });
    }
  }

  async index(req, res) {
    try {
      const invoices = await InvoiceModel.find()
        .where({ user: req.userEmail })
        .sort({
          date: -1,
        });

      return res.status(200).json(invoices);
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

      const oldInvoice = await InvoiceModel.findById(id);

      const updatedInvoice = await oldInvoice.updateOne(req.body);

      return res.json({ updatedInvoice });
    } catch (err) {
      return res.json({
        errors: err,
      });
    }
  }

  async updateMonth(req, res) {
    const { index, checked } = req.body;
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        errors: ['ID pendente'],
      });
    }

    const oldInvoice = await InvoiceModel.findById(id);
    const { months, total, installmentsValue } = oldInvoice;

    const deletedMonth = months.splice(index, 1);

    await oldInvoice.updateOne({ months });

    deletedMonth[0].checked = checked;
    months.splice(index, 0, deletedMonth[0]);

    const allCheckedMonths = [];

    months.forEach((month) => {
      if (month.checked === true) allCheckedMonths.push(month);
    });

    const toPay = (total - allCheckedMonths.length * installmentsValue).toFixed(
      1
    );

    await oldInvoice.updateOne({ restToPay: toPay });

    if (allCheckedMonths.length === months.length) {
      await oldInvoice.updateOne({ status: 'Paga' });
    } else {
      await oldInvoice.updateOne({ status: 'Pendente' });
    }

    await oldInvoice.updateOne({ months });

    return res.json(months);
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ['ID pendente'],
        });
      }

      const invoice = InvoiceModel.findById(id);

      await invoice.deleteOne();

      return res.json({
        deleted: true,
      });
    } catch {
      return res.json(null);
    }
  }
}

export default new InvoiceController();
