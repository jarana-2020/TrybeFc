'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.createTable('matchs', {
     id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
     },
     home_team: {
      foreignKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: 'clubs', key: 'id'},
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE', 
     },
     home_team_goals: {
       type: Sequelize.INTEGER,
       allowNull: false,
     },
     away_team: {
      foreignKey: true,
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {model: 'clubs', key: 'id'},
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
     },
     away_team_goals: {
      type: Sequelize.INTEGER,
      allowNull: false,
     },
     in_progress: {
      type: Sequelize.INTEGER,
      allowNull: false,
     }
   })
  },

  down: async (queryInterface, _Sequelize) => {
    await queryInterface.dropTable('matchs');
  }
};
