import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import validator from 'validator';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model('User', UserSchema);

class User {
  constructor(body) {
    this.body = body;
    this.user = null;
  }

  async register() {
    this.validate();

    await this.userExists();

    const salt = bcrypt.genSaltSync();
    this.body.password = bcrypt.hashSync(this.body.password, salt);

    this.user = await UserModel.create(this.body);
  }

  async userExists() {
    this.user = await UserModel.findOne({ email: this.body.email });
    if (this.user) throw new Error('Usuário já existe');
  }

  async findUser(email) {
    const user = await UserModel.findOne({ email: email });
    return user;
  }

  async passwordIsValid(password) {
    this.validate();
    this.user = await UserModel.findOne({ email: this.body.email });
    return bcrypt.compare(password, this.user.password);
  }

  validate() {
    if (!validator.isEmail(this.body.email)) {
      throw new Error('E-mail inválido');
    }

    if (this.body.password.length < 6 || this.body.password.length > 50) {
      throw new Error('A senha precisa ter entre 6 e 50 caracteres');
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== 'string') {
        this.body[key] = '';
      }
    }

    this.body = {
      username: this.body.username,
      email: this.body.email,
      password: this.body.password,
    };
  }
}

export default User;
