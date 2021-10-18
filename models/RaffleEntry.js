module.exports = (sequelize, DataTypes) => {
  return sequelize.define('raffle_entries', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    raffleId: {
      type: DataTypes.INTEGER,
    },
    discordId: {
      type: DataTypes.BIGINT,
    }
  }, {
    timestamps: true,
  });
};
