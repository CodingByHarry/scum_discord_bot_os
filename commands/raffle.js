const { sequelize, Users, Raffle } = require("../dbObjects.js");
const { QueryTypes } = require("sequelize");
// Allows a user to enter the raffle.
//
// Usage:
//   !raffle <open|closed> - Open or close a raffle.
//
module.exports = {
  name: "raffle",

  execute: async (message, args) => {
    message.delete();

    if (!Helpers.isAdmin(message.member)) {
      Logger.audit(`🔒 ${message.member.tag} attempted to check the details of ${args[0]}`);
      Helpers.permissionDenied(message.member);
      return;
    }

    if (message.channel.id != Config.raffleChannel) {
      const raffleChannel = message.guild.channels.cache.get(Config.raffleChannel);
      message.author.send({content: `You can only use the \`!raffle\` command in the ${raffleChannel.toString()} channel.`});
      return;
    }

    if (args.length != 1) {
      message.author.send({content: "The correct use of this command is `!raffle <open|closed>.`"});
      return;
    }

    const lastRaffle = await Raffle.findOne({order: [["createdAt", "DESC"]]});

    if (args[0].toLowerCase() == "pick") {
      const winner = await sequelize.query(
        "SELECT * FROM raffle_entries WHERE raffleId = :id ORDER BY RAND() LIMIT 1;",
        {
          replacements: {id: lastRaffle.id},
          type: QueryTypes.SELECT,
        }
      );

      if (winner.length) {
        message.channel.send({content: `🏆 Congratulations, the winner is <@${winner[0].discordId}> (#${winner[0].id})`});
      }
    } else if (args[0].toLowerCase() == "reset") {
      (async () => {
        Logger.debug(`${message.author.tag} reset ${message.channel.name}`);
        let deleted;
        do {
          deleted = await message.channel.bulkDelete(100);
        } while (deleted.size != 0);
      })();
    } else {
      const state = args[0].toLowerCase() == "open" ? "open" : "closed";

      if (lastRaffle && lastRaffle.state == state) {
        if (state == "open") {
          message.author.send({content: "There is already an open raffle."});
        } else {
          message.author.send({content: "There are no open raffles."});
        }
        return;
      }

      if (state == 'open') {
        await Raffle.create({state: 'open'});
        message.channel.send({content: "🎰 Raffle is now open and accepting entries (100 coins per entry, first entry is free). To enter the raffle type `!entries <NUM_ENTRIES>` for example `!entries 1`, is free. `!entries 3` would cost you 200 coins, first entry free."});
      } else {
        const raffle = await Raffle.findOne({where: {state: 'open'}});
        if (raffle) {
          raffle.update({state: 'closed'});
        }
        message.channel.send({content: "🎰 Raffle is now closed and will be drawn soon."});
      }
    }
  },
};
