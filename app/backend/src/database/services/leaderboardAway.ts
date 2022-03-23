import { CreateMatchI, GoalsLeaderBoardI, LeaderBoardMatchs, PointsMatchI } from '../domain/domain';
import Club from '../models/club';
import Match from '../models/match';

class ServiceLeaderboardAway {
  static getPoints(data: CreateMatchI[]): PointsMatchI {
    let points = 0;
    let totalVictories = 0;
    const gamesFinished = data.filter((game) => game.inProgress === false);
    const totalPoints = gamesFinished.reduce((_acc, dataClub) => {
      if (dataClub.homeTeamGoals < dataClub.awayTeamGoals) {
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
    return totalPoints as PointsMatchI;
  }

  static getDrawsAndLoses(data: CreateMatchI[]) {
    let totalDraws = 0;
    let totalLosses = 0;
    const gamesFinished = data.filter((game) => game.inProgress === false);
    const totaDrawsAndLoses = gamesFinished.reduce((_acc, dataClub) => {
      if (dataClub.homeTeamGoals > dataClub.awayTeamGoals) {
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
    const drawsAndLosers = ServiceLeaderboardAway.getDrawsAndLoses(data);
    const totalGoals = gamesFinished.reduce((_acc, dataClub) => {
      goalsFavor += dataClub.awayTeamGoals;
      goalsOwn += dataClub.homeTeamGoals;

      return {
        ...drawsAndLosers,
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
      };
    }, {});
    return totalGoals as GoalsLeaderBoardI;
  }

  static getEfficiency(points: PointsMatchI) {
    const { totalPoints, totalGames } = points;
    const getEfficiency = (totalPoints / (totalGames * 3)) * 100;
    const efficiency = getEfficiency % 1 === 0 ? getEfficiency : getEfficiency.toFixed(2);
    return efficiency;
  }

  static getClubsPoints(dataClubs: Club[]) {
    const result = dataClubs.map((club) => {
      const data = club as LeaderBoardMatchs;
      const clubsInfo = data.awayClub;
      const arrayMatchs = clubsInfo as CreateMatchI[];
      const getPoints = ServiceLeaderboardAway.getPoints(arrayMatchs);
      const goals = ServiceLeaderboardAway.getGoalsDrawsLosers(arrayMatchs);
      const efficiency = ServiceLeaderboardAway.getEfficiency(getPoints);

      return {
        name: data.clubName,
        ...getPoints as PointsMatchI,
        ...goals,
        efficiency,
      };
    });
    return result;
  }

  static async getClassification() {
    const result = await Club.findAll({
      include: [
        { model: Match, as: 'awayClub', attributes: { exclude: ['home_team', 'away_team'] } },
      ],
    });

    const dataClubs = ServiceLeaderboardAway.getClubsPoints(result);
    dataClubs.sort((clubA, clubB) => clubB.goalsOwn - clubA.goalsOwn);
    dataClubs.sort((clubA, clubB) => clubB.goalsFavor - clubA.goalsFavor);
    dataClubs.sort((clubA, clubB) => clubB.goalsBalance - clubA.goalsBalance);
    dataClubs.sort((clubA, clubB) => clubB.totalPoints - clubA.totalPoints);
    return dataClubs;
  }
}

export default ServiceLeaderboardAway;
