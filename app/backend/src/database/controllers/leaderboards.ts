import { Request, Response } from 'express';
import ServiceLeaderboard from '../services/leaderboards';

class ControllerLeaderboard {
  static async getAllClubsAndMatchs(_req: Request, res: Response) {
    try {
      const result = await ServiceLeaderboard.getClassification();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ControllerLeaderboard;
