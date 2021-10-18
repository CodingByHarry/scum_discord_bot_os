const { MessageEmbed } = require("discord.js");
const { Users, Orders, ShopPackages } = require("../dbObjects.js");

// Allows an "Admin" to retrieve the information we have for a given user.
//
// Usage:
//   !check @CoderHulk|STEAMID64 basic - Returns the DiscordID and SteamID64.
//   !check @CoderHulk|STEAMID64 all - Returns all the useful user information we have.
//
module.exports = {
  name: "check",

  execute: async (message, args) => {
    if (!Helpers.isAdmin(message.member)) {
      Logger.audit(`🔒 ${message.member.tag} attempted to check the details of ${args[0]}`);
      Helpers.permissionDenied(message.member);
      return;
    }

    if (args.length < 1) {
      message.author.send({content: "The correct use of this command is `!check <@Username|STEAMID64> optional:<basic|all>`"});
      return;
    }

    let checkUser;
    let discordUser;

    // Get the first arg and find the DB user depending on what is provided
    if (/\b\d{17}$\b/.test(args[0]) == false) {
      discordUser = Helpers.memberFromMention(args[0]);

      if (discordUser === undefined) {
        message.reply({content: "This doesnt seem to be a valid Discord user."});
      } else {
        checkUser = await Users.findOne({where: { discordId: discordUser.id }});
      }
    } else {
      checkUser = await Users.findOne({where: { steamId64: args[0] }});
    }

    if (!checkUser)  {
      message.reply({content: "Couldnt find a database user with the info supplied. Likely not registered."});
      return;
    }

    if ((checkUser.steamId64) && (!checkUser.discordId)) {
      message.reply({content: "User found in database but no Discord ID linked. They need to register."});
      return;
    }

    discordUser = `<@${checkUser.discordId}>`;
    const detailsType = args.length == 2 ? args[1].toLowerCase() : "basic"

    switch (detailsType) {
      case "basic":

        let userDetailsBasix = new MessageEmbed()
        .setColor("#66ff66")
        .setFields([
          {name: "DiscordID", value: `${discordUser} (${checkUser.discordId.toString()})`, inline: true},
          {name: "SteamID", value: checkUser.steamId64.toString(), inline: true},
        ]);

        Logger.debug(`👀 ${message.author.tag} checked the basic details of ${discordUser.username || checkUser.ign} (${checkUser.discordId})`);
        message.channel.send({ embeds: [userDetailsBasix] });

        break;
      case "all":

        let userDetailsAll = new MessageEmbed()
        .setColor("#66ff66")
        .setFields([
          {name: "DiscordID", value: `${discordUser} (${checkUser.discordId.toString()})`, inline: true},
          {name: "SteamID", value: checkUser.steamId64.toString(), inline: true},
          {name: "Balance", value: checkUser.balance.toString(), inline: true},
          {name: "Presence", value: checkUser.presence.toString(), inline: true},
          {name: "IGN", value: checkUser.ign.toString(), inline: true},
          {name: "Created At", value: checkUser.presenceUpdatedAt.toString(), inline: true},
        ]);

        Logger.debug(`👀 ${message.author.tag} checked the details of ${discordUser.username || checkUser.ign} (${checkUser.discordId})`);
        message.channel.send({ embeds: [userDetailsAll] });
        break;
      case "orders":
        let orders = await Orders.findAll({
          where: { userId: checkUser.discordId },
          order: [['createdAt', 'DESC']],
          limit: 5,

        }).then(result => {
          result.forEach(
            (order) => {
              let package = ShopPackages.findOne({where: { id: order.shopPackageId }}).then(package =>{
                let orderDetails = new MessageEmbed()
                .setColor("#66ff66")
                .setFields([
                  {name: "ID", value: order.id.toString(), inline: true},
                  {name: "Package", value: `${package.name} (${order.shopPackageId.toString()})`, inline: true},
                  {name: "Delivered", value: `${order.delivered.toString()}`, inline: true},
                  {name: "Time", value: order.createdAt.toString()},
                ]);
                message.channel.send({ embeds: [orderDetails] });
              })
            }
          );
        });
        break;
      default:
        message.author.send({content: "The correct use of this command is `!check <@Username|STEAMID64> <basic|all|orders>`"});
        break;
      }
  },
};
