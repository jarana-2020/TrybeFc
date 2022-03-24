/* eslint-disable max-lines-per-function */
import { ClassificationI, CreateMatchI, LeaderBoardMatchs } from '../domain/domain';
import Club from '../models/club';
import Match from '../models/match';

class ServiceLeaderboard {
  static getPoints(data: CreateMatchI[]): ClassificationI {
    let points = 0;
    let totalVictories = 0;
    const gamesFinished = data.filter((game) => game.inProgress === false);
    const totalPoints = gamesFinished.reduce((_acc, dataClub) => {
      if (dataClub.homeTeamGoals > dataClub.awayTeamGoals) {
        points += 3;
        totalVictories += 1;
      }
      if (dataClub.homeTeamGoals === dataClub.awayTeamGoals) {
        points += 1;
      }
      return {
        totalPoints: points,
        totalGames: gamesFinished.length,
        totalVictories,
      };
    }, {});
    return totalPoints as ClassificationI;
  }

  static getDrawsAndLoses(data: CreateMatchI[]) {
    let totalDraws = 0;
    let totalLosses = 0;
    const gamesFinished = data.filter((game) => game.inProgress === false);
    const totaDrawsAndLoses = gamesFinished.reduce((_acc, dataClub) => {
      if (dataClub.homeTeamGoals < dataClub.awayTeamGoals) {
        totalLosses += 1;
      }
      if (dataClub.homeTeamGoals === dataClub.awayTeamGoals) {
        totalDraws += 1;
      }
      return {
        totalDraws,
        totalLosses,
      };
    }, {});
    return totaDrawsAndLoses;
  }

  static getGoalsDrawsLosers(data: CreateMatchI[]) {
    let goalsFavor = 0;
    let goalsOwn = 0;
    const gamesFinished = data.filter((game) => game.inProgress === false);
    const drawsAndLosers = ServiceLeaderboard.getDrawsAndLoses(data);
    const totalGoals = gamesFinished.reduce((_acc, dataClub) => {
      goalsFavor += dataClub.homeTeamGoals;
      goalsOwn += dataClub.awayTeamGoals;

      return {
        ...drawsAndLosers,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
      };
    }, {});
    return totalGoals as ClassificationI;
  }

  static getEfficiency(points: ClassificationI) {
    const { totalPoints, totalGames } = points;
    const getEfficiency = (totalPoints / (totalGames * 3)) * 100;
    const efficiency = getEfficiency % 1 === 0 ? getEfficiency : getEfficiency.toFixed(2);
    return Number(efficiency);
  }

  static getClubsPoints(dataClubs: Club[]): ClassificationI[] {
    const result = dataClubs.map((club) => {
      const data = club as LeaderBoardMatchs;
      const clubsInfo = data.homeClub;
      const arrayMatchs = clubsInfo as CreateMatchI[];
      const getPoints = ServiceLeaderboard.getPoints(arrayMatchs);
      const goals = ServiceLeaderboard.getGoalsDrawsLosers(arrayMatchs);
      const efficiency = ServiceLeaderboard.getEfficiency(getPoints);

      return {
        name: data.clubName,
        ...getPoints,
        ...goals,
        efficiency,
      };
    });
    return result;
  }

  static sortClassification(clubs: ClassificationI[]) {
    clubs.sort((clubA, clubB) => clubB.goalsOwn - clubA.goalsOwn)
      .sort((clubA, clubB) => clubB.goalsFavor - clubA.goalsFavor)
      .sort((clubA, clubB) => clubB.goalsBalance - clubA.goalsBalance)
      .sort((clubA, clubB) => clubB.totalPoints - clubA.totalPoints);

    return clubs;
  }

  static async getClassification() {
    const result = await Club.findAll({
      include: [
        { model: Match, as: 'homeClub', attributes: { exclude: ['home_team', 'away_team'] } },
      ],
    });
    const dataClubs = ServiceLeaderboard.getClubsPoints(result);
    return ServiceLeaderboard.sortClassification(dataClubs);
  }
}

export default ServiceLeaderboard;
