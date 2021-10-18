const { Users } = require("../dbObjects.js");

// Allows a user to pay someone using coins from their balance.
//
// Usage:
//   !pay @CoderHulk 100 - Give @CoderHulk 100 coins.
//
module.exports = {
  name: "pay",

  execute: async (message, args) => {
    if (args.length != 2) {
      message.author.send({content: "The correct use of this command is `!pay <User> <NumberOfCoins> for example `!pay @CoderHulk 100`"});
      return;
    }

    let numberOfCoins = Number(args[1]);
    const debtor = await Users.findOne({where: {discordId: message.member.id}});
    const creditorMember = Helpers.memberFromMention(args[0]);
    const creditor = await Users.findOne({where: {discordId: creditorMember.id}});

    if (debtor && creditor) {
      if (debtor.discordId == creditor.discordId) {
        message.reply({content: "You cannot pay yourself."});
        return;
      }

      if (isNaN(numberOfCoins) || !Number.isInteger(numberOfCoins)) {
        message.reply({content: "You need to provide a whole number for example `100`"});
        return;
      }

      if (numberOfCoins < 0) { numberOfCoins = Math.abs(numberOfCoins) }

      if (debtor.balance >= numberOfCoins) {
        await debtor.decrement("balance", {by: numberOfCoins});
        await creditor.increment("balance", {by: numberOfCoins});

        Logger.audit(`💰 ${message.author.tag} paid ${creditorMember.tag} ${numberOfCoins} coins.`);
        message.reply({content: `${message.author.toString()} paid ${creditorMember.toString()} ${numberOfCoins} coins.`});
      } else {
        message.reply({content: `You have insufficient funds to pay ${creditorMember.toString()} ${numberOfCoins} coins.`});
      }
    }
  },
};
