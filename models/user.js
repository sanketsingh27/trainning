"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ AadharCardDetails }) {
      this.hasOne(AadharCardDetails, {
        foreignKey: "userId",
        as: "aadhar_card_details",
      });
    }
    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "User's FullName cant be empty" },
          notNull: { msg: "User's FullName cant be null" },
        },
      },
      country_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "User's country_code cant be empty" },
          notNull: { msg: "User's country_code cant be null" },
          isInt: { msg: "country_code must be an integer" },
        },
      },
    },
    {
      sequelize,
      tableName: "users",
      modelName: "User",
    }
  );
  return User;
};
