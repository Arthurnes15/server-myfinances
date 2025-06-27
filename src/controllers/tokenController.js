import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

import UserModel from '../models/User.js';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const sentUser = new UserModel(req.body);
    const sentEmailUser = sentUser.email;

    const foundUser = await UserModel.findOne({ email: sentEmailUser });

    if (foundUser === null) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    async function passwordIsValid(password) {
      return bcrypt.compare(password, foundUser.password);
    }

    if (!(await passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { id, username } = foundUser;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { email, username } });
  }
}

export default new TokenController();
