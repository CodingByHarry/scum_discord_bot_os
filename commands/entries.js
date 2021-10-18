const { Users, Raffle, RaffleEntry } = require("../dbObjects.js");
const { Op } = require("sequelize");

// Allows a user to enter the raffle.
//
// Usage:
//   !entries <NUM_OF_ENTRIES> - Enter X number of times into the raffle.
//
module.exports = {
  name: "entries",

  execute: async (message, args) => {
    if (message.channel.id != Config.raffleChannel) {
      message.delete();
      const raffleChannel = message.guild.channels.cache.get(Config.raffleChannel);
      message.author.send({content: `You can only use the \`!entries\` command in the ${raffleChannel.toString()} channel.`});
      return;
    }

    if (args.length != 1) {
      message.delete();
      message.author.send({content: "The correct use of this command is `!entries <NumberOfEntries>.`"});
      return;
    }

    const numEntries = Number(args[0]);
    if (isNaN(numEntries) || !Number.isInteger(numEntries) || numEntries <= 0) {
      message.delete();
      message.author.send({content: "You need to provide a whole number greater than zero (0) for example `2`"});
      return;
    }

    const raffle = await Raffle.findOne({where: {state: 'open'}})
    if (!raffle) {
      message.delete();
      message.author.send({content: "You cannot enter, there are no open raffles."});
      return;
    }

    const paidEntries = numEntries > 1 ? numEntries - 1 : 1;
    const cost = paidEntries * 100;

    const user = await Users.findOne({where: {discordId: message.author.id, balance: {[Op.gte]: cost}}})
    if (user) {
      user.decrement("balance", {by: cost});
      Logger.audit(`💰 ${message.author.tag} entered ${numEntries} times into the raffle.`);

      for(var i = 0; i < numEntries; i++) {
        await RaffleEntry.create({raffleId: raffle.id, discordId: message.author.id});
        await message.react("🎟️");
      }
    } else {
      message.delete();
      message.author.send({content: `Make sure you have registered and have sufficient funds to enter.`});
    }
  },
};
