module.exports = (sequelize, DataTypes) => {
  return sequelize.define('chats', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    sentAt: {
      type: DataTypes.DATE,
    },
    context: {
      type: DataTypes.STRING,
    },
    content: {
      type: DataTypes.STRING,
    },
    authorSteamId64: {
      type: DataTypes.STRING,
    },
    authorIgn: {
      type: DataTypes.STRING,
    },
    authorScumId: {
      type: DataTypes.STRING,
    },
    mentionAdmins: {
      type: DataTypes.BOOLEAN,
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
  }, {
    timestamps: true,
  });
};
