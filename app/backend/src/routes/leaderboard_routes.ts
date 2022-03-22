import * as express from 'express';
import ControllerLeaderboard from '../database/controllers/leaderboards';

const leaderboardRouter = express.Router();

leaderboardRouter
  .get('/home', ControllerLeaderboard.getAllClubsAndMatchs);

export default leaderboardRouter;
