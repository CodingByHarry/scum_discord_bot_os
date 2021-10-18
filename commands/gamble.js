const { Users } = require("../dbObjects.js");

// Allows a user to gamble red or black for a chance to double their money.
//
// Usage:
//   !gamble red|black
//
module.exports = {
  name: "gamble",

  execute: async (message, args) => {
    if (args.length != 1) {
      message.author.send({content: "The correct use of this command is `!gamble <red|black>` for example `!gamble red`"});
      return;
    }

    let bet = args[0].toLowerCase();
    const user = await Users.findOne({where: {discordId: message.member.id}});
    const gamble_amount = Number(100);

    if ((bet != "red") && (bet != "black")) {
      message.reply({content: `Invalid bet. You can only do red or black. !gamble red|black`});
      return;
    }

    if (user) {
      if (user.balance >= gamble_amount) {
        await user.decrement("balance", {by: gamble_amount});
        result = Math.floor(Math.random() * 2);

        //Black == 0
        //  Red == 1
        if ((result == 0) && (bet == "black")) {
          await user.increment("balance", {by: gamble_amount *2});
          message.reply({content: `Congratulations! You won ${gamble_amount.toString()} coins!`});
          Logger.audit(`💰 ${message.author.tag} gambled ${gamble_amount.toString()} and won ${(gamble_amount *2).toString()} coins.`);
        } else if ((result == 1) && (bet == "red")) {
          await user.increment("balance", {by: gamble_amount *2});
          message.reply({content: `Congratulations! You won ${(gamble_amount * 2).toString()} coins!`});
          Logger.audit(`💰 ${message.author.tag} gambled ${gamble_amount.toString()} and won ${(gamble_amount *2).toString()} coins.`);
        } else {
          message.reply({content: `Ouch! You just lost ${gamble_amount.toString()}`});
          Logger.audit(`💰 ${message.author.tag} gambled ${gamble_amount.toString()} and lost.`);
        }
      } else {
        message.reply({content: `You have insufficient funds to pay the buy in fee of ${gamble_amount.toString()}.`});
      }
    }
  },
};
