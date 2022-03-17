import * as express from 'express';
import validateEmail, { validatePassword } from '../database/middlewares/validateLogin';
import { LoginController } from '../database/controllers/login';
import validateToken from '../database/middlewares/validateToken';

const loginRouter = express.Router();

loginRouter
  .get('/validate', validateToken, LoginController.get)
  .use(validateEmail)
  .use(validatePassword)
  .post('/', LoginController.add);

export default loginRouter;
