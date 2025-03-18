import User from '../models/UserModel';

class UserController {
  async store(req, res) {
    try {
      const newUser = new User(req.body);
      await newUser.register();

      return res.json(newUser);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new UserController();
