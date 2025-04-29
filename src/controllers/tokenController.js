import jwt from 'jsonwebtoken';

import User from '../models/user.js';

class TokenController {
  async store(req, res) {
    const { email = '', password = '' } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ['Credenciais inválidas'],
      });
    }

    const sentUser = new User(req.body);

    const foundUser = await sentUser.findUser(email);

    if (foundUser === null) {
      return res.status(401).json({
        errors: ['Usuário não existe'],
      });
    }

    if (!(await sentUser.passwordIsValid(password))) {
      return res.status(401).json({
        errors: ['Senha inválida'],
      });
    }

    const { user } = sentUser;
    const { id, username } = user;

    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { email, username } });
  }
}

export default new TokenController();
