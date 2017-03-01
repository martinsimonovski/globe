'use strict';

module.exports = {
  up: function (queryInterface, Sequelize) {
    queryInterface.addColumn(
      'countries',
      'continentId',
      Sequelize.INTEGER
    )
  },

  down: function (queryInterface, Sequelize) {
    queryInterface.removeColumn('countries', 'continentId')
  }
};
