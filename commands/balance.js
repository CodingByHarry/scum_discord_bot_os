const { Users } = require("../dbObjects.js");

// Allows a user to check their own balance. Also allows an "Admin" user to check the balance of anyone.
//
// Usage:
//   !balance - Check your own balance.
//   !balance @CoderHulk - Check the balance of another user.
//
module.exports = {
  name: "balance",

  execute: async (message, args) => {
    // Delete the command message.
    message.delete();

    // Who's balance are we checking...
    member = args.length ? Helpers.memberFromMention(args[0]) : message.member

    // Ensure the command was sent by an admin when checking someone elses balance.
    if (args.length && !Helpers.isAdmin(message.member) && message.member != member) {
      Logger.audit(`🔒 ${message.member.tag} attempted to check the balance of ${args[0]}`);
      Helpers.permissionDenied(message.member);
      return;
    }

    if (member) {
      Users.findOne({where: {discordId: member.id}}).then((user) => {
        if (user) {
          if (args.length) {
            Logger.debug(`💰 ${message.author.tag} checked ${member.username}'s balance (${user.balance} coins)`);
            message.author.send({content: `💰 ${member.username}'s balance is ${user.balance} coins`});
          } else {
            Logger.debug(`💰 ${message.author.tag} checked their balance (${user.balance} coins)`);
            message.author.send({content: `💰 Your balance is ${user.balance} coins`});
          }
        } else {
          message.author.send({content: "Could not find the user in our database"});
        }
      });
    } else {
      message.author.send({content: `Unable to find Discord user for ${args[0]}`});
    }
  },
};
