import { Request, Response } from 'express';
import ClubService from '../services/club';

class ControllerClub {
  static async getAll(_req: Request, res: Response) {
    try {
      const clubs = await ClubService.getAll();
      return res.status(200).json(clubs);
    } catch (error) {
      return res.status(500).json(error);
    }
  }

  static async getById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const idClub = Number(id);
      const club = await ClubService.getById(idClub);
      return res.status(200).json(club);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
}

export default ControllerClub;
