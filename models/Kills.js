module.exports = (sequelize, DataTypes) => {
  return sequelize.define('kills', {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
    },
    killerName: {
      type: DataTypes.STRING,
    },
    killerInEvent: {
      type: DataTypes.BOOLEAN,
    },
    killerServerX: {
      type: DataTypes.DECIMAL(18, 9),
    },
    killerServerY: {
      type: DataTypes.DECIMAL(18, 9),
    },
    killerServerZ: {
      type: DataTypes.DECIMAL(18, 9),
    },
    killerClientX: {
      type: DataTypes.DECIMAL(18, 9),
    },
    killerClientY: {
      type: DataTypes.DECIMAL(18, 9),
    },
    killerClientZ: {
      type: DataTypes.DECIMAL(18, 9),
    },
    killerSteamId64: {
      type: DataTypes.STRING,
    },
    killerImmortal: {
      type: DataTypes.BOOLEAN,
    },
    victimName: {
      type: DataTypes.STRING,
    },
    victimInEvent: {
      type: DataTypes.BOOLEAN,
    },
    victimServerX: {
      type: DataTypes.DECIMAL(18, 9),
    },
    victimServerY: {
      type: DataTypes.DECIMAL(18, 9),
    },
    victimServerZ: {
      type: DataTypes.DECIMAL(18, 9),
    },
    victimClientX: {
      type: DataTypes.DECIMAL(18, 9),
    },
    victimClientY: {
      type: DataTypes.DECIMAL(18, 9),
    },
    victimClientZ: {
      type: DataTypes.DECIMAL(18, 9),
    },
    victimSteamId64: {
      type: DataTypes.STRING,
    },
    weaponName: {
      type: DataTypes.STRING,
    },
    weaponDamage: {
      type: DataTypes.STRING,
    },
    timeOfDay: {
      type: DataTypes.STRING,
    },
    logTimestamp: {
      type: DataTypes.DATE,
    },
    victimUserId: {
      type: DataTypes.INTEGER,
    },
    killerUserId: {
      type: DataTypes.INTEGER,
    },
    publishedAt: {
      type: DataTypes.DATE,
    },
    distance: {
      type: DataTypes.INTEGER,
    }
  }, {
    timestamps: true,
  });
};
