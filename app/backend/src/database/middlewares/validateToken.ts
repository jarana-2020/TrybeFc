import { NextFunction, Response } from 'express';
import * as fs from 'fs';
import { verify } from 'jsonwebtoken';
import { PersonalRequest, TokenData } from '../domain/domain';
import User from '../models/user';
import LoginService from '../services/login';

const key = fs.readFileSync('./jwt.evaluation.key', 'utf8');

const validateToken = async (req: PersonalRequest, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }
  try {
    const decode = verify(authorization, key);
    const token = decode as TokenData;
    const result = await LoginService.validateLogin(token.email);
    const user = result as User;
    req.email = user.email;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

export default validateToken;
