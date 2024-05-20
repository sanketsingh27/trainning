"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ AadharCardDetails, Address, Rolls }) {
      this.belongsTo(AadharCardDetails, {
        foreignKey: "aadharId",
        as: "aadhar_card_details",
      });

      this.hasMany(Address, { foreignKey: "userId", as: "addresses" });

      this.belongsToMany(Rolls, {
        through: "UserRoles",
        as: "rolls",
        foreignKey: "userId",
        otherKey: "roleId",
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
      aadharId: {
        type: DataTypes.UUID,
        allowNull: true,
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
