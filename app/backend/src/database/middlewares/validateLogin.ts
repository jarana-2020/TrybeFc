import { NextFunction, Request, Response } from 'express';

const erroEmailPassword = { message: 'Incorrect email or password' };

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!email) {
    return res.status(401).json({ message: 'All fields must be filled' });
  }
  const result = emailRegEx.test(email);
  if (!result) return res.status(401).json(erroEmailPassword);
  next();
};

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) return res.status(401).json({ message: 'All fields must be filled' });
  if (password.length <= 6) {
    return res.status(401).json();
  }
  next();
};

export default validateEmail;
