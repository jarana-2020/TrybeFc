import { ClassificationI } from '../domain/domain';
import ServiceLeaderboardAway from './leaderboardAway';
import ServiceLeaderboard from './leaderboardsHome';

class GeneralLeaderBoard {
  static getResultClassification(team: ClassificationI, dataTeam: ClassificationI) {
    const { name, totalDraws, totalLosses, goalsFavor,
      goalsOwn, goalsBalance, totalPoints, totalGames, totalVictories } = team;
    const points = totalPoints + dataTeam.totalPoints;
    const games = totalGames + dataTeam.totalGames;
    const getEfficiency = (points / (games * 3)) * 100;
    const efficiency = getEfficiency % 1 === 0 ? getEfficiency : Number(getEfficiency.toFixed(2));
    return {
      name,
      totalPoints: points,
      totalGames: games,
      totalVictories: totalVictories + dataTeam.totalVictories,
      totalDraws: totalDraws + dataTeam.totalDraws,
      totalLosses: totalLosses + dataTeam.totalLosses,
      goalsFavor: goalsFavor + dataTeam.goalsFavor,
      goalsOwn: goalsOwn + dataTeam.goalsOwn,
      goalsBalance: goalsBalance + dataTeam.goalsBalance,
      efficiency,
    };
  }

  static async generalClassification() {
    const homeClubs = await ServiceLeaderboard.getClassification();
    const awayClubs = await ServiceLeaderboardAway.getClassification();
    const classification = homeClubs.map((team) => {
      const newClassification = awayClubs.filter((club) => club.name === team.name);
      if (!newClassification[0]) return team;
      const dataTeam = newClassification[0];
      return GeneralLeaderBoard.getResultClassification(team, dataTeam);
    });
    return ServiceLeaderboard.sortClassification(classification);
  }
}

export default GeneralLeaderBoard;
