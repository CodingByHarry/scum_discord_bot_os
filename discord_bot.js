const fs = require("fs");
const { Sequelize } = require("sequelize");
const { Client, Collection, Intents } = require("discord.js");
const { Users, ShopPackages, ShopItems, Orders } = require("./dbObjects.js");
const KillFeed = require("./lib/KillFeed.js");
const ChatFeed = require("./lib/ChatFeed.js");

console.log("Scumtopia Bot\n-------------");

Config = {};
try {
  Config = require("./config.json");
} catch (e) {
  Config.debug = false;
  Config.commandPrefix = "!";
  Config.guildId = "GUILD_ID";
  Config.botToken = "BOT_TOKEN";
  Config.botAuditChannel = "bot-audit";
  Config.raffleChannel = "CHANNEL_ID";
  Config.killFeedsChannel = "CHANNEL_ID";
  Config.chatFeedsChannel = "CHANNEL_ID";
  Config.databaseHost = "localhost";
  Config.databaseUsername = "scumbot";
  Config.databasePassword = "CHANGE_ME";
  Config.databaseName = "scumbot";

  try {
    if (fs.lstatSync("./config.json").isFile()) {
      console.log("WARNING: config.json found but we couldn't read it!\n" + e.stack);
    }
  } catch (e2) {
    fs.writeFile("./config.json", JSON.stringify(Config, null, 2), (err) => {
      if (err) console.error(err);
    });
  }
}

if (!Config.hasOwnProperty("commandPrefix")) {
  Config.commandPrefix = "!";
}

Helpers = {};
Helpers.isAdmin = (member) => {
  return member.roles.cache.some(role => role.name == "Admin");
};

Helpers.permissionDenied = (member) => {
  member.send({content: "You do not have permission to run this command."});
};

Helpers.memberFromMention = (mention) => {
  if (!mention) return;

  if (mention.startsWith('<@') && mention.endsWith('>')) {
    mention = mention.slice(2, -1);

    if (mention.startsWith('!')) {
      mention = mention.slice(1);
    }

    return client.users.cache.get(mention);
  }
};

Logger = {};
Logger.debug = (message) => {
  if (Config.debug) {
    t = new Date();
    tzOffset = t.getTimezoneOffset() * 60 * 1000;
    tLocal = t - tzOffset;
    tLocal = new Date(tLocal)
    tFormatted = tLocal.toISOString().slice(0, 19).replace('T', ' ')

    console.log(`${tFormatted} ${message}`);
  }
};

Logger.audit = (content, mentionAdmins = false) => {
  const channel = client.channels.cache.find(channel => channel.name.endsWith(Config.botAuditChannel));
  const adminRole = client.guilds.cache.get(Config.guildId).roles.cache.find(role => role.name == "Admin");

  if (mentionAdmins) { content += ` ${adminRole.toString()}`; }

  Logger.debug(content);
  channel.send({content: content});
};

const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once('ready', async () => {
  Logger.debug(`Bot online and authenticated as ${client.user.tag}!`);

  client.user.setActivity("ᴘʟᴀʏᴇʀꜱ ᴏɴʟɪɴᴇ", {type: "WATCHING"});
  setInterval(() => {
    Users.count({where: {presence: "online" }}).then(count => {
      client.user.setActivity(`${count} ᴘʟᴀʏᴇʀꜱ ᴏɴʟɪɴᴇ`, {type: "WATCHING"});
    })
  }, 30000);

  setInterval(() => {
    KillFeed.publish(client);
    ChatFeed.publish(client);
  }, 30000);
});

client.on("messageCreate", async message => {
  if (message.content[0] !== Config.commandPrefix) return;

  const [commandName, ...args] = message.content.split(" ");
  const command = client.commands.get(commandName.replace(Config.commandPrefix, ""));

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    Logger.debug(error);
    await message.reply({content: "There was an error while executing this command!", ephemeral: true});
  }
});

client.on('interactionCreate', interaction => {
  if (!interaction.isButton()) return;

  // "Buy Now" button was clicked.
  if (interaction.customId.startsWith("buy_")) {
    const customId = interaction.customId.replace("buy_", "")
    const discordId = interaction.member.id

    ShopPackages.findOne({where: {id: customId}, include: [ShopItems]}).then((package) => {
      Users.findOne({where: {discordId: discordId}}).then((user) => {
        if (user) {
          // Welcome package.
          if (package.category == "welcome") {
            if (!user.welcomePackReceived) {
              Orders.create({userId: discordId, shopPackageId: customId });
              user.update({welcomePackReceived: Sequelize.literal('CURRENT_TIMESTAMP')});
              Logger.audit(`🎁 ${user.ign} placed an order for their welcome package.`);
              // Coins.
              let coins = 0;
              package.shop_items.forEach((item) => {
                if (item.name == "Coins") {
                  coins += item.qty;
                }
              });

              Users.increment("balance", {by: coins, where: {discordId: discordId}});
              interaction.reply({ content: `Your "${package.name}" will arrive within a few seconds, please make sure you're online and **standing still**.`, ephemeral: true });
            } else {
              interaction.reply({ content: `You have already received a "${package.name}", no more for you!`, ephemeral: true });
            }
          } else {
            if (user.balance >= package.price) {
              Orders.create({userId: discordId, shopPackageId: customId });
              Logger.audit(`📦 ${user.ign} placed an order for package ${package.name}.`);
              // Coins.
              let coins = 0;
              package.shop_items.forEach((item) => {
                if (item.name == "Coins") {
                  coins += item.qty;
                }
              });

              Users.increment("balance", {by: coins, where: {discordId: discordId}});
              Users.decrement("balance", {by: package.price, where: {discordId: discordId}});
              interaction.reply({ content: `Your "${package.name}" will arrive within a few seconds, please make sure you're online and **standing still**.`, ephemeral: true });
            } else {
              interaction.reply({ content: `You only have insufficient funds for this purchase, your balance is ${user.balance} coins`, ephemeral: true });
            }
          }
        } else {
          interaction.reply({ content: `You need to register and join our SCUM server before you can purchase anything`, ephemeral: true });
        }
      });
    });
  }
});

client.login(Config.botToken);
