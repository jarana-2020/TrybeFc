import Club from '../models/club';
import Match from '../models/match';

class ServiceMatch {
  static async getAll() {
    const matchs = await Match.findAll({
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return matchs;
  }

  static async getByStatus(status: boolean) {
    const matchs = await Match.findAll({
      where: { inProgress: status },
      include: [
        { model: Club, as: 'homeClub', attributes: ['clubName'] },
        { model: Club, as: 'awayClub', attributes: ['clubName'] },
      ],
    });
    return matchs;
  }
}

export default ServiceMatch;
