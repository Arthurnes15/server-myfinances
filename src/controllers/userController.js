import User from '../models/user.js';

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
}

export default new UserController();
