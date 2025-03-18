import jwt from 'jsonwebtoken';
import User from '../models/UserModel';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['É preciso fazer login'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = new User(req.body);

    const fetchedUser = user.findUser(email);

    if (!fetchedUser) {
      return res.status(401).json({
        errors: ['Usuário inválido'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch {
    return res.status(401).json({
      errors: ['Token expirado ou inválido'],
    });
  }
};
