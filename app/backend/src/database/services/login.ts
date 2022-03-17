import * as bcrypt from 'bcryptjs';
import { ErrorMessage } from '../domain/domain';
import User from '../models/user';

class LoginService {
  static async getUser(email: string, password: string) {
    const result = await User.findOne({
      where: { email },
    });
    const user = result as User;
    const match = bcrypt.compareSync(password, user.password);
    console.log('bcrypt', match);
    console.log('result', result);
    console.log('senhas', user.password, password);

    const message: ErrorMessage = { message: 'Incorrect email or password' };
    if (!result || !match) return message;
    return {
      id: user.id,
      username: user.username,
      role: user.role,
      email: user.email,
    };
  }

  static async validateLogin(email: string) {
    const user = await User.findOne({
      where: { email },
    });
    return user;
  }
}

export default LoginService;
