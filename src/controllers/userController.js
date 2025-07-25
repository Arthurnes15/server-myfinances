import UserModel from '../models/User.js';
import validator from 'validator';

import bcrypt from 'bcrypt';
class UserController {
  async store(req, res) {
    const sentUser = new UserModel(req.body);
    const err = sentUser.validateSync();

    try {
      const { id, username, email } = sentUser;

      if (!validator.isEmail(email)) {
        return res.status(400).json({
          errors: ['Email inválido'],
        });
      }

      const existentUser = await UserModel.findOne({ email });

      if (username === existentUser?.username) {
        return res.status(400).json({
          errors: ['Este nome de usuário já está em uso'],
        });
      }

      if (email === existentUser?.email) {
        return res.status(400).json({
          errors: ['Este e-mail já está em uso'],
        });
      }

      await sentUser.save();

      return res.status(200).json({ id, username, email });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        errors: [err.errors],
      });
    }
  }

  async updatePassword(req, res) {
    try {
      const id = req.userId;
      const { password } = req.body;

      if (password.length < 6) {
        throw new Error('A senha deve conter 6 caracteres no mínimo');
      }

      if (password.length > 50) {
        throw new Error('A senha deve conter 50 caracteres no máximo');
      }

      const user = await UserModel.findById(id);

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);

      await user.updateOne({ password: hashedPassword });

      return res.json({ message: 'Senha alterada com sucesso' });
    } catch (err) {
      return res.status(400).json({
        errors: [err.message],
      });
    }
  }

  async updateForgottenPassword(req, res) {
    try {
      const { email, newPassword } = req.body;

      const user = await UserModel.findOne({ email });

      if (!user) {
        return res.status(400).json({
          errors: ['Este usuário não existe'],
        });
      }

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(newPassword, salt);

      await user.updateOne({ password: hashedPassword });

      return res.json({ message: 'Senha alterada com sucesso' });
    } catch (err) {
      return res.status(400).json({
        errors: [err.message],
      });
    }
  }
}

export default new UserController();
