const Sequelize = require('sequelize');
const { databaseHost, databaseUsername, databasePassword, databaseName } = require("./config.json");

const sequelize = new Sequelize(databaseName, databaseUsername, databasePassword, {
  host: databaseHost,
  dialect: "mysql",
  logging: false,
});

const Users = require('./models/Users.js')(sequelize, Sequelize.DataTypes);
const ShopPackages = require('./models/ShopPackages.js')(sequelize, Sequelize.DataTypes);
const ShopItems = require('./models/ShopItems.js')(sequelize, Sequelize.DataTypes);
const Orders = require('./models/Orders.js')(sequelize, Sequelize.DataTypes);
const Kills = require('./models/Kills.js')(sequelize, Sequelize.DataTypes);
const Raffle = require('./models/Raffle.js')(sequelize, Sequelize.DataTypes);
const RaffleEntry = require('./models/RaffleEntry.js')(sequelize, Sequelize.DataTypes);
const Chat = require('./models/Chat.js')(sequelize, Sequelize.DataTypes);

// Relationships
ShopItems.belongsTo(ShopPackages);
ShopPackages.hasMany(ShopItems);

module.exports = {
  sequelize,
  Users,
  ShopPackages,
  ShopItems,
  Orders,
  Kills,
  Raffle,
  RaffleEntry,
  Chat
};
