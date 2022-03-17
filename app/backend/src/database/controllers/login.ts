import { Request, Response } from 'express';
import * as fs from 'fs';
import { sign } from 'jsonwebtoken';
import { LoginService } from '../services/login';

const key = fs.readFileSync('./jwt.evaluation.key', 'utf-8');

export class LoginController {
  static async add(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await LoginService.getUser({ email, password });
      const error = result as Error;
      if (error.message) return res.status(401).json(error);
      const token = sign({ email }, key);

      return res.status(200).json({ user: result, token });
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default LoginController;
