const { MessageEmbed } = require("discord.js");
const { Orders } = require("../dbObjects.js");

// Allows admins to re-deliver an order.
//
// Usage:
//   !redeliver [id] - redeliver the order with the defined ID
//
module.exports = {
  name: "redeliver",

  execute: async (message, args) => {
    if (!Helpers.isAdmin(message.member)) {
      Logger.audit(`🔒 ${message.member.tag} attemped to redeliver the order ${args[0]}`);
      Helpers.permissionDenied(message.member);
      return;
    }

    if (args.length < 1) {
      message.author.send({content: "The correct use of this command is `!redeliver <orderid>`"});
      return;
    }

    await Orders.update({ delivered: false }, { where: {id: args[0] } });
    message.reply({content: `Order ${args[0]} is being set to undelivered and will be delivered shortly.`});
  },
};
