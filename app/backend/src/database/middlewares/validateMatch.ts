import { NextFunction, Request, Response } from 'express';
import { MatchI } from '../domain/domain';

const validateMatch = (req: Request, res: Response, next: NextFunction) => {
  const dataMatch = req.body as MatchI;
  const { homeClub, awayClub } = dataMatch;
  if (Number(homeClub) === Number(awayClub)) {
    return res.status(401).json({ message: 'Error, both Clubs are equal' });
  }
  next();
};

export default validateMatch;
