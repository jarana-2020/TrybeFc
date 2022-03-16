import { DataTypes, Model } from 'sequelize';
import db from '.';
import Match from './match';

export default class Club extends Model {

}
Club.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  club_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  underscored: true,
  sequelize: db,
  timestamps: false,
  modelName: 'club',
});

Club.hasMany(Match, { foreignKey: 'home_team', as: 'match' });
Club.hasMany(Match, { foreignKey: 'away_team', as: 'match' });
Match.belongsTo(Club, { foreignKey: 'home_team', as: 'club' });
Match.belongsTo(Club, { foreignKey: 'away_team', as: 'club' });
