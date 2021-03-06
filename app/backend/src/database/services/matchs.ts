import { CreateMatchI } from '../domain/domain';
import Club from '../models/club';
import Match from '../models/match';
import ClubService from './club';

class ServiceMatch {
  static async getAll(status?: boolean) {
    const matchs = status === undefined
      ? await Match.findAll({
        include: [
          { model: Club, as: 'homeClub', attributes: ['clubName'] },
          { model: Club, as: 'awayClub', attributes: ['clubName'] },
        ],
      })
      : await Match.findAll({
        where: { inProgress: status },
        include: [
          { model: Club, as: 'homeClub', attributes: ['clubName'] },
          { model: Club, as: 'awayClub', attributes: ['clubName'] },
        ],
      });
    return matchs;
  }

  static async checkIfTeamExists(idHomeTeam: number, idAwayTeam: number) {
    const homeTeam = await ClubService.getById(idHomeTeam);
    const awayTeam = await ClubService.getById(idAwayTeam);
    if (!homeTeam || !awayTeam) return { message: 'There is no team with such id!' };
    return { homeTeam, awayTeam };
  }

  static async createMatch(data: CreateMatchI) {
    const { homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress } = data;

    const checkTeams = await ServiceMatch
      .checkIfTeamExists(Number(homeTeam), Number(awayTeam));

    if (checkTeams.message) return checkTeams;

    const match = await Match
      .create({ homeTeam, awayTeam, homeTeamGoals, awayTeamGoals, inProgress });

    return { id: match.id, homeTeam, homeTeamGoals, awayTeam, awayTeamGoals, inProgress };
  }

  static async updateStatus(id: number) {
    const result = await Match.update({ inProgress: false }, {
      where: { id },
    });
    return result;
  }

  static async updateMatchGoals(id: number, homeGoals: number, awayGoals: number) {
    const result = await Match
      .update({ homeTeamGoals: homeGoals, awayTeamGoals: awayGoals }, {
        where: { id },
      });
    return result;
  }
}

export default ServiceMatch;
