module.exports = (sequelize, DataTypes) => {
  return sequelize.define('shop_items', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    shopPackageId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false,
    },
    spawnName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    spawnType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    timestamps: true,
  });
};
