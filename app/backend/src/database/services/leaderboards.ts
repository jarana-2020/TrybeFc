import { GoalsLeaderBoardI, LeaderBoardMatchs, PointsMatchI } from '../domain/domain';
import Club from '../models/club';
import Match from '../models/match';

class ServiceLeaderboard {
  static calcPoints(data: LeaderBoardMatchs) {
    let points = 0;
    let totalVictories = 0;
    const totalGames = data.homeClub?.filter((game) => game.inProgress === false).length;
    const totalPoints = data.homeClub?.reduce((_acc, dataClub) => {
      if (dataClub.homeTeamGoals > dataClub.awayTeamGoals && dataClub.inProgress === false) {
        points += 3;
        totalVictories += 1;
      }
      if (dataClub.homeTeamGoals === dataClub.awayTeamGoals && dataClub.inProgress === false) {
        points += 1;
      }
      return {
        totalPoints: points,
        totalGames,
        totalVictories,
      };
    }, {});
    return totalPoints;
  }

  static getDrawsAndLoses(data: LeaderBoardMatchs) {
    let totalDraws = 0;
    let totalLosses = 0;
    const totaDrawsAndLoses = data.homeClub?.reduce((_acc, dataClub) => {
      if (dataClub.homeTeamGoals < dataClub.awayTeamGoals && dataClub.inProgress === false) {
        totalLosses += 1;
      }
      if (dataClub.homeTeamGoals === dataClub.awayTeamGoals && dataClub.inProgress === false) {
        totalDraws += 1;
      }
      return {
        totalDraws,
        totalLosses,
      };
    }, {});
    return totaDrawsAndLoses;
  }

  static getGoals(data: LeaderBoardMatchs) {
    let goalsFavor = 0;
    let goalsOwn = 0;
    const totalGoals = data.homeClub?.reduce((_acc, dataClub) => {
      if (dataClub.inProgress === false) {
        goalsFavor += dataClub.homeTeamGoals;
        goalsOwn += dataClub.awayTeamGoals;
      }

      return {
        goalsFavor,
        goalsOwn,
        goalsBalance: goalsFavor - goalsOwn,
      };
    }, {});
    return totalGoals as GoalsLeaderBoardI;
  }

  static getClubsPoints(dataClubs: Club[]) {
    const result = dataClubs.map((club) => {
      const data = club as LeaderBoardMatchs;
      const getPoints = ServiceLeaderboard.calcPoints(data);
      const drawsAndLosers = ServiceLeaderboard.getDrawsAndLoses(data);
      const goals = ServiceLeaderboard.getGoals(data);
      const clubsHome = getPoints as PointsMatchI;
      const { totalPoints, totalGames } = clubsHome;
      const getEfficiency = (totalPoints / (totalGames * 3)) * 100;
      const efficiency = getEfficiency % 1 === 0 ? getEfficiency : getEfficiency.toFixed(2);

      return {
        name: data.clubName,
        ...getPoints as PointsMatchI,
        ...drawsAndLosers as PointsMatchI,
        ...goals,
        efficiency,
      };
    });
    return result;
  }

  static async getAllClubsAndMatchs() {
    const result = await Club.findAll({
      include: [
        { model: Match, as: 'homeClub' },
      ],
    });

    const dataClubs = ServiceLeaderboard.getClubsPoints(result);
    dataClubs.sort((clubA, clubB) => clubB.goalsOwn - clubA.goalsOwn);
    dataClubs.sort((clubA, clubB) => clubB.goalsFavor - clubA.goalsFavor);
    dataClubs.sort((clubA, clubB) => clubB.goalsBalance - clubA.goalsBalance);
    dataClubs.sort((clubA, clubB) => clubB.totalPoints - clubA.totalPoints);
    return dataClubs;
  }
}

export default ServiceLeaderboard;
