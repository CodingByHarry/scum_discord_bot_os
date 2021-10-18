const { MessageEmbed } = require("discord.js");

// ALet adm
//
// Usage:
//   !ticket - Shows the ticket info for opening a ticket
//
module.exports = {
  name: "support",

  execute: async (message, args) => {
    message.reply({content: "Please open a support ticket for help. This is the quickest way to get assistance from an admin - thanks. <#880032059391873075>"});
  },
};
