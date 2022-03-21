import { NextFunction, Request, Response } from 'express';
import { MatchI } from '../domain/domain';

const validateMatch = (req: Request, res: Response, next: NextFunction) => {
  const dataMatch = req.body as MatchI;
  const { homeTeam, awayTeam } = dataMatch;
  if (Number(homeTeam) === Number(awayTeam)) {
    return res.status(401)
      .json({ message: 'It is not possible to create a match with two equal teams' });
  }
  next();
};

export default validateMatch;
