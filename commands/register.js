const { sequelize, Users } = require("../dbObjects.js");
const { QueryTypes } = require("sequelize");

// Allows a user to register their Steam ID64. This action then allows them to receive coins and use the shop etc.
//
// Usage:
//   !register 112345678987654321
//
module.exports = {
  name: "register",

  execute: async (message, args) => {
    // Delete the command message.
    message.delete();

    // Make sure the user has provided an argument.
    if (args.length != 1) {
      message.author.send({content: "The correct use of this command is `!register YOURSTEAMID64`"});
      return;
    }

    // Make sure the argument provided resembles a steamid64.
    if (/\b\d{17}$\b/.test(args[0]) == false) {
      Logger.audit(`📝 ${message.author.tag} failed to register using ${args[0]}`);
      message.author.send({content: "You failed to register, please check your SteamID64 and try again"});
      return;
    }

    const existingUsers = await sequelize.query(
      "SELECT * FROM users WHERE discordId = :discordId OR steamId64 = :steamId64 LIMIT 1",
      {
        replacements: {discordId: message.author.id, steamId64: args[0]},
        type: QueryTypes.SELECT,
      }
    );

    if (existingUsers.length) {
      const existingUser = existingUsers[0];

      if (existingUser.discordId == message.author.id) {
        if (existingUser.steamId64 == args[0]) {
          // Add the "Registered" role to the member.
          let role = message.guild.roles.cache.find(role => role.name === "Registered");
          message.member.roles.add(role).catch(console.error);

          message.author.send({content: "Welcome back, you're already registered."});
        } else if (!existingUser.steamId64.length) {
          Users.update({steamId64: args[0]}, {where: {discordId: message.author.id}});

          // Add the "Registered" role to the member.
          let role = message.guild.roles.cache.find(role => role.name === "Registered");
          message.member.roles.add(role).catch(console.error);

          message.author.send({content: "Thank you for registering :tada:. Don't forget to claim your free gift from the \`#🎁ꜱʜᴏᴘ-ᴡᴇʟᴄᴏᴍᴇ\` channel."});
        } else {
          Logger.audit(`📝 ${message.author.tag} attempted to register again using the SteamID64 (${arg[0]}), we found them in our database but with a different SteamID64 ${existingUser.steamId64}.`);
          message.author.send({content: "Welcome back, you're already registered. However you have a different SteamID64 registered, if this is a problem please open a support ticket."});
        }
      } else if (existingUser.steamId64 == args[0]) {
        Users.update({discordId: message.author.id}, {where: {steamId64: args[0]}});

        // Add the "Registered" role to the member.
        let role = message.guild.roles.cache.find(role => role.name === "Registered");
        message.member.roles.add(role).catch(console.error);

        message.author.send({content: "Thank you for registering :tada:. Don't forget to claim your free gift from the \`#🎁ꜱʜᴏᴘ-ᴡᴇʟᴄᴏᴍᴇ\` channel."});
      } else {
        Logger.audit(`📝 An unhandled error was detected trying to register ${member.author.tag}`);
        message.author.send({content: "Looks like we had an issue registering you, please open a support ticket."});
      }
    } else {
      Users.create({
        discordId: message.author.id,
        steamId64: args[0],
      });

      // Add the "Registered" role to the member.
      let role = message.guild.roles.cache.find(role => role.name === "Registered");
      message.member.roles.add(role).catch(console.error);

      message.author.send({content: "Thank you for registering :tada:. Don't forget to claim your free gift from the \`#🎁ꜱʜᴏᴘ-ᴡᴇʟᴄᴏᴍᴇ\` channel."});
    }
  },
};
