import { Request, Response } from 'express';
import ServiceMatch from '../services/matchs';

class MatchController {
  static async getAll(_req: Request, res: Response) {
    const matchs = await ServiceMatch.getAll();
    return res.status(200).json(matchs);
  }
}

export default MatchController;
