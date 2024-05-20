"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Comment }) {
      // define association here
      this.hasMany(Comment, { foreignKey: "commentableId", as: "comments" });
    }

    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  Image.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      height: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      width: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      tableName: "images",
      modelName: "Image",
    }
  );
  return Image;
};
