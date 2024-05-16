"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class AadharCardDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      // define association here
      this.belongsTo(User, { foreignKey: "userId", as: "user" });
    }

    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  AadharCardDetails.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "name value is required",
          },
          notEmpty: {
            msg: "name value cant be empty",
          },
        },
      },
      aadharNumber: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "aadharNumber value is required",
          },
          notEmpty: {
            msg: "aadharNumber value can't be empty",
          },
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: "user value is required",
          },
          notEmpty: {
            msg: "user value can't be empty",
          },
        },
      },
    },
    {
      tableName: "aadhar_card_details",
      sequelize,
      modelName: "AadharCardDetails",
    }
  );
  return AadharCardDetails;
};
