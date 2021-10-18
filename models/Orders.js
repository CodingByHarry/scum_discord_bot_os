module.exports = (sequelize, DataTypes) => {
  return sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: true,
    },
    shopPackageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    delivered: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
};
