import * as express from 'express';
import ControllerLeaderBoard from '../database/controllers/leaderboard';
import ControllerLeaderboardAway from '../database/controllers/leaderboardAway';
import ControllerLeaderboard from '../database/controllers/leaderboardsHome';

const leaderboardRouter = express.Router();

leaderboardRouter
  .get('/', ControllerLeaderBoard.getClassification)
  .get('/home', ControllerLeaderboard.getAllClubsAndMatchs)
  .get('/away', ControllerLeaderboardAway.getAllClubsAndMatchs);

export default leaderboardRouter;
