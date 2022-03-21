import { Request, Response } from 'express';
import { CreateMatchI, MatchMessage } from '../domain/domain';
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

  static async updateById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await ServiceMatch.updateById(Number(id));
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default MatchController;
