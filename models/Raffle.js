module.exports = (sequelize, DataTypes) => {
  return sequelize.define('raffles', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
    },
    state: {
      type: DataTypes.STRING,
    }
  }, {
    timestamps: true,
  });
};
