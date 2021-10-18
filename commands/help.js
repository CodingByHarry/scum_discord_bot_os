const { MessageEmbed } = require("discord.js");

// TODO: Update to dynamically read from `message.client.commands`.

// Allows a user to display the list of available commands.
//
// Usage:
//   !help - Displays available commands.
//
module.exports = {
  name: "help",

  execute: async (message, args) => {
    let helpEmbed = new MessageEmbed()
      .setColor("#5cc9f5")
      .setTitle("Scumtopia Bot Help")
      .setFields([
        {
          name: "Command List",
          value: "`!help` - Displays this list of commands\n\n \
          `!register STEAMID64` - Provide your steamid64 for example `!register 123456789087654321` to collect free coins while you play and use our shop.\n\n \
          `!balance` - Check the number of coins you have available to trade players or buy items from our shop.\n\n \
          `!pay @DiscordUserMention NumCoins` - Pay another player coins from your account for example `!pay @CoderHulk 1000`.\n\n \
          `!status` - Check if the in game bot is online.\n\n \
          `!entries NumEntries` - Allows you to buy tickets in an open raffle in the `#🎰ʀᴀꜰꜰʟᴇ` channel"
        },
      ]);

      message.reply({ embeds: [helpEmbed] });
  },
};
