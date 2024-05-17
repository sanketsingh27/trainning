"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Address extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User }) {
      this.belongsTo(User, {
        foreignKey: "userId",
        as: "user",
      });
    }

    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  Address.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
      street: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "street value is required",
          },
          notEmpty: {
            msg: "street value cant be empty",
          },
        },
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "country value is required",
          },
          notEmpty: {
            msg: "country value cant be empty",
          },
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        validate: {
          notNull: {
            msg: "userId value is required",
          },
          notEmpty: {
            msg: "userId value cant be empty",
          },
        },
      },
    },
    {
      sequelize,
      tableName: "addresses",
      modelName: "Address",
    }
  );
  return Address;
};
