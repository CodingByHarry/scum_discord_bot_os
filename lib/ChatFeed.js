const { Chat } = require("../dbObjects.js");
const { MessageEmbed } = require("discord.js");
const { Sequelize } = require("sequelize");

module.exports = {
  publish: (client) => {
    const channel = client.guilds.cache.get(Config.guildId).channels.cache.get(Config.chatFeedsChannel);
    const adminRole = client.guilds.cache.get(Config.guildId).roles.cache.find(role => role.name == "Admin");

    Chat.findAll({where: {publishedAt: null}, order: ['sentAt']}).then(chats => {
      chats.forEach(chat => {
        const Colors = {
          Global: "#02f9f9", // Cyan
          Local: "#ffffff", // White
          Squad: "#21f700", // Lime green
        }

        const color = Colors[chat.context];
        let content = chat.content;
        if (chat.mentionAdmins) { content += ` ${adminRole.toString()}`; }

        let chatEmbed = new MessageEmbed()
          .setColor(color)
          .setAuthor(`${chat.authorIgn} (${chat.authorSteamId64})`)
          .setDescription(content);

        chat.update({publishedAt: Sequelize.literal('CURRENT_TIMESTAMP')});
        channel.send({embeds: [chatEmbed]});
      });
    });
  }
}
