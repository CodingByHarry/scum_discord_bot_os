module.exports = (sequelize, DataTypes) => {
  return sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    discordId: {
      type: DataTypes.BIGINT,
    },
    scumId: {
      type: DataTypes.STRING,
    },
    steamId64: {
      type: DataTypes.STRING,
      unique: true,
    },
    welcomePackReceived: {
      type: DataTypes.DATE,
    },
    balance: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    presence: {
      type: DataTypes.STRING,
      defaultValue: "offline",
      allowNull: false,
    },
    presenceUpdatedAt: {
      type: DataTypes.DATE,
    },
    ign: {
      type: DataTypes.STRING,
    },
  }, {
    timestamps: true,
  });
};
