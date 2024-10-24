"use strict";

async function up(queryInterface, Sequelize) {
  await queryInterface.bulkInsert("Quotes", [
    {
      title: "The Only Limit",
      content:
        "The only limit to our realization of tomorrow is our doubts of today.",
      author: "Franklin D. Roosevelt",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Life Happens",
      content: "Life is what happens when you're busy making other plans.",
      author: "John Lennon",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      title: "Missed Shots",
      content: "You miss 100% of the shots you don't take.",
      author: "Wayne Gretzky",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);
}

async function down(queryInterface, Sequelize) {
  await queryInterface.bulkDelete("Quotes", null, {});
}

export { up, down };
