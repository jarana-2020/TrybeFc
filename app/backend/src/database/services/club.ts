import Club from '../models/club';

class ClubService {
  static async getAll() {
    const clubs = await Club.findAll();
    return clubs;
  }

  static async getById(id: number) {
    const club = await Club.findOne({
      where: { id },
    });
    return club;
  }
}

export default ClubService;
