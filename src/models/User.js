import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'O nome de usuário é um campo obrigatório'],
  },
  email: { type: String, required: [true, 'Email é um campo obrigatório'] },
  password: {
    type: String,
    required: [true, 'A senha é um campo obrigatório'],
    minLength: [6, 'A senha deve conter no mínimo 6 caracteres'],
    maxLength: [50, 'A senha deve conter no máximo 50 caracteres'],
  },
});

UserSchema.pre('save', function (next) {
  const salt = bcrypt.genSaltSync();
  this.password = bcrypt.hashSync(this.password, salt);

  next();
});

export default mongoose.model('User', UserSchema);
