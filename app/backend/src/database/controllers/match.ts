import { Request, Response } from 'express';
import { CreateMatchI, MatchMessage } from '../domain/domain';
import ServiceMatch from '../services/matchs';

class MatchController {
  static async getAll(req: Request, res: Response) {
    try {
      const { inProgress } = req.query;
      if (inProgress !== undefined) {
        const status = inProgress === 'true';
        const matchs = await ServiceMatch.getAll(status);
        return res.status(200).json(matchs);
      }
      const matchs = await ServiceMatch.getAll();
      return res.status(200).json(matchs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async createMatch(req: Request, res: Response) {
    try {
      const dataMatch = req.body as CreateMatchI;
      const match = await ServiceMatch.createMatch(dataMatch);
      const matchMessage = match as MatchMessage;
      if (matchMessage.message) return res.status(401).json(matchMessage);
      return res.status(201).json(match);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ServiceMatch.updateStatus(Number(id));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async updateMatchGoals(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { homeTeamGoals, awayTeamGoals } = req.body;
      const result = await ServiceMatch
        .updateMatchGoals(Number(id), Number(homeTeamGoals), Number(awayTeamGoals));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default MatchController;
