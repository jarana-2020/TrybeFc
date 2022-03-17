import { ErrorMessage, UserRequest } from '../domain/domain';
import User from '../models/user';

export class LoginService {
  static async getUser(data: UserRequest) {
    const { email, password } = data;
    const user = await User.findOne({
      where: { email, password },
    });
    const message: ErrorMessage = { message: 'Incorrect email or password' };
    if (!user) return message;
    return user;
  }
}

export default LoginService;
