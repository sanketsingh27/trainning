"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "rolls",
      [
        {
          id: "a73a39ea-83db-4af2-9021-318b60c9e77c",
          name: "admin",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "4f532ffd-b63b-4279-8862-e5101a8a03ff",
          name: "employee",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "845b4604-95ae-4afc-ad12-41b02fc44b0e",
          name: "contractor",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: "deba153e-79b5-4b22-b68f-cd559caff7a2",
          name: "temp",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
