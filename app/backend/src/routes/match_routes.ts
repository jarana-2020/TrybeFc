import * as express from 'express';
import MatchController from '../database/controllers/match';

const matchRouter = express.Router();

matchRouter
  .get('/', MatchController.getAll);

export default matchRouter;
