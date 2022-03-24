import { Request, Response } from 'express';
import GeneralLeaderBoard from '../services/leaderboard';

class ControllerLeaderBoard {
  static async getClassification(req: Request, res: Response) {
    try {
      const result = await GeneralLeaderBoard.generalClassification();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ControllerLeaderBoard;
