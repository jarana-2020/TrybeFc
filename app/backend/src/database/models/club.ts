import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './match';

export default class Club extends Model {
  id: number;

  clubName: string;
}
Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  clubName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'club_name',
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'club',
});

Club.hasMany(Match, { foreignKey: 'home_team', as: 'homeClub' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'awayClub' });
Match.belongsTo(Club, { foreignKey: 'home_team', as: 'homeClub' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'awayClub' });
