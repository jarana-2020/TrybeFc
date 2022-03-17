import * as express from 'express';
import validateEmail, { validatePassword } from '../database/middlewares/validateLogin';
import { LoginController } from '../database/controllers/login';

const loginRouter = express.Router();

loginRouter
  .use(validateEmail)
  .use(validatePassword)
  .post('/', LoginController.add);

export default loginRouter;
