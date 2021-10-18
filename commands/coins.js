const { Users } = require("../dbObjects.js");

// Allows an "Admin" to add or remove coins from a user.
//
// Usage:
//   !coins @CoderHulk 100 - Give @CoderHulk 100 coins.
//   !coins @CoderHulk -100 - Take 100 coins from @CoderHulk.
//
module.exports = {
  name: "coins",

  execute: async (message, args) => {
    // Delete the command message.
    message.delete();

    if (args.length != 2) {
      message.author.send({content: "The correct use of this command is `!coins <User> <NumberOfCoins>`"});
      return;
    }

    // Ensure the command was sent by an admin when checking someone elses balance.
    if (args.length && !Helpers.isAdmin(message.member)) {
      Logger.audit(`🔒 ${message.member.tag} attempted to check the balance of ${args[0]}`);
      Helpers.permissionDenied(message.member);
      return;
    }

    // Who's balance are we adjusting...
    member = args.length ? Helpers.memberFromMention(args[0]) : message.member
    const numberOfCoins = Number(args[1]);

    if (member) {
      Users.findOne({where: {discordId: member.id}})
        .then((user) => {
          if (user) {
            if (numberOfCoins > 0) {
              return user.increment("balance", {by: numberOfCoins});
            } else {
              return user.decrement("balance", {by: Math.abs(numberOfCoins)});
            }
          } else {
            message.author.send({content: "We are unable to find you, have you registered? If you think there is an issue please open a support ticket"});
          }
        }).then((user) => {
          if (user) {
            return user.reload();
          }
        }).then((user) => {
          if (user) {
            Logger.audit(`💰 ${message.author.tag} adjusted ${member.username}'s balance by ${numberOfCoins} coins. Their balance is now ${user.balance} coins.`);
            message.author.send({content: `${member.username}'s balance was adjusted, their balance is now ${user.balance} coins`});
          }
        });
    } else {
      message.author.send({content: `Unable to find Discord user for ${args[0]}`});
    }
  },
};
