import { Request, Response } from 'express';
import ServiceMatch from '../services/matchs';

class MatchController {
  static async getAll(_req: Request, res: Response) {
    try {
      const matchs = await ServiceMatch.getAll();
      return res.status(200).json(matchs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getByStatus(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      const status = inProgress === 'true';
      const matchs = await ServiceMatch.getByStatus(status);
      return res.status(200).json(matchs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default MatchController;
