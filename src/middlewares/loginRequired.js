import jwt from 'jsonwebtoken';

import UserModel from '../models/User.js';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['É preciso fazer login'],
    });
  }

  const [, token] = authorization.split(' ');

  try {
    const userData = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = userData;

    const fetchedUser = await UserModel.findOne({ email });

    if (fetchedUser === null) {
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
