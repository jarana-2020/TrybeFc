import { NextFunction, Request, Response } from 'express';

const validateEmail = (req: Request, res: Response, next: NextFunction) => {
  const { email } = req.body;
  const emailRegEx = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const result = emailRegEx.test(email);
  if (!result) return res.status(401).json({ message: 'Incorrect email or password' });
  if (!email) return res.status(401).json({ message: 'All fields must be filled' });
  next();
};

export const validatePassword = (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (!password) return res.status(401).json({ message: 'All fields must be filled' });
  if (password.length <= 6) return res.status(401).json({ message: 'Incorrect email or password' });
  next();
};

export default validateEmail;
