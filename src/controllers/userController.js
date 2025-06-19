import User from '../models/User.js';
import { UserModel } from '../models/User.js';

import bcrypt from 'bcrypt';
class UserController {
  async store(req, res) {
    try {
      const sentUser = new User(req.body);
      await sentUser.register();

      const { user } = sentUser;
      const { id, username, email } = user;

      return res.json({ id, username, email });
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
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

      const oldUser = await UserModel.findById(id);

      const salt = bcrypt.genSaltSync();
      const hashedPassword = bcrypt.hashSync(password, salt);

      await oldUser.updateOne({ password: hashedPassword });

      return res.json({ message: 'Senha alterada com sucesso' });
    } catch (err) {
      return res.status(400).json({
        errors: [err.message],
      });
    }
  }
}

export default new UserController();
