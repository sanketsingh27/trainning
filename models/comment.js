"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Video, Image }) {
      // define association here
      this.belongsTo(Video, { foreignKey: "commentableId", as: "videos" });
      this.belongsTo(Image, { foreignKey: "commentableId", as: "images" });
    }

    toJSON() {
      return { ...this.get(), createdAt: undefined, updatedAt: undefined };
    }
  }
  Comment.init(
    {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      text: { type: DataTypes.STRING, allowNull: false },
      commentableId: { type: DataTypes.UUID, allowNull: false },
      commentableType: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      tableName: "Comments",
      modelName: "Comment",
    }
  );
  return Comment;
};
