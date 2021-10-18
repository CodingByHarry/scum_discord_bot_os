const { Users } = require("../dbObjects.js");

// Allows a user to check if the bot is online. Currently hardcodes the SteamID.
//
// Usage:
//   !status
//
module.exports = {
  name: "status",

  execute: async (message, args) => {

    const bot_id = "76561199202858953";

    Users.findOne({where: {steamId64: bot_id}}).then((bot) => {
      if (bot) {
        if (bot.presence == "offline") {
          Logger.audit(`The bot is offline. Please get it back up!`, true);
          message.reply({content: "The bot is offline and wont be doing deliveries. The admins have been alerted already."});
        } else {
          message.reply({content: "The bot is online. Please open a support ticket if youre experiencing issues."});
        }
      } else {
        message.author.send({content: "Couldnt find the bot user!?"});
      }
    });

  },
};
