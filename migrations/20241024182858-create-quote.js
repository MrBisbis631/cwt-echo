"use strict";
/** @type {import('sequelize-cli').Migration} */

async function up(queryInterface, Sequelize) {
  await queryInterface.createTable("Quotes", {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
    },
    content: {
      type: Sequelize.STRING,
    },
    author: {
      type: Sequelize.STRING,
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  });
}

async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable("Quotes");
}

export { up, down };
