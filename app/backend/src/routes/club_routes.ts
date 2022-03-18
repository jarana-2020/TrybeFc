import * as express from 'express';
import ControllerClub from '../database/controllers/club';

const clubRouter = express.Router();

clubRouter
  .get('/:id', ControllerClub.getById)
  .get('/', ControllerClub.getAll);

export default clubRouter;
