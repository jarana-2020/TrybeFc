import { Request, Response } from 'express';
import ServiceLeaderboardAway from '../services/leaderboardAway';

class ControllerLeaderboardAway {
  static async getAllClubsAndMatchs(_req: Request, res: Response) {
    try {
      const result = await ServiceLeaderboardAway.getClassification();
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ControllerLeaderboardAway;
