const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { ShopPackages, ShopItems } = require("../dbObjects.js");

// Allows an "Admin" to rebuild a shop for a given category.
//
// Usage:
//   !shop CATEGEORY
//
module.exports = {
  name: "shop",

  execute: async (message, args) => {
    message.delete();

    if (!Helpers.isAdmin(message.member)) {
      Logger.audit(`🔒 ${message.member.tag} attempted to rebuild the shop (${args[0]})`);
      Helpers.permissionDenied(message.member);
      return;
    }

    if (args.length != 1) {
      message.author.send({content: "The correct use of this command is `!shop <Category>`"});
      return;
    }

    const shopCategory = args[0];
    var letters = {
      a: "ᴀ",
      b: "ʙ",
      c: "ᴄ",
      d: "ᴅ",
      e: "ᴇ",
      f: "ꜰ",
      g: "ɢ",
      h: "ʜ",
      i: "ɪ",
      j: "ᴊ",
      k: "ᴋ",
      l: "ʟ",
      m: "ᴍ",
      n: "ɴ",
      o: "ᴏ",
      p: "ᴘ",
      q: "Q",
      r: "ʀ",
      s: "ꜱ",
      t: "ᴛ",
      u: "ᴜ",
      v: "ᴠ",
      w: "ᴡ",
      x: "x",
      y: "ʏ",
      z: "ᴢ",
    };

    var shopPrefix = "ꜱʜᴏᴘ-"
    var shopCategoryFancy = "";
    for (var charIndex = 0; charIndex < shopCategory.length; charIndex++) {
      let char = shopCategory.charAt(charIndex)
      shopCategoryFancy += letters[char]
    }

    let channel = message.guild.channels.cache.find(channel => channel.name.endsWith(`${shopPrefix}${shopCategoryFancy}`));
    if (channel) {
      (async () => {
        // Remove all previous messages.
        Logger.debug(`${message.author.tag} started rebuilding ${channel.name}`);
        let deleted;
        do {
          deleted = await channel.bulkDelete(100);
        } while (deleted.size != 0);

        await ShopPackages.findAll({where: {category: shopCategory, hidden: false}, include: [ShopItems]}).then((packages) => {
          packages.forEach((package) => {
            const packageName = package.name;
            const packagePrice = package.price == 0 ? "Free" : package.price;

            let contents = "";
            package.shop_items.forEach((item) => {
              contents += `- ${item.qty} x ${item.name}\r\n`;
            })

            // This can be used to add a huge space between fields.
            // {name: '\u200B', value: '\u200B'},
            let weaponEmbed = new MessageEmbed()
              .setColor(package.color)
              .setFields([
                {name: "Name", value: packageName.toString(), inline: true},
                {name: "Cost", value: packagePrice.toString(), inline: true},
                {name: "Contents", value: contents.toString()},
              ]);

            if (package.additionalInfo) {
              weaponEmbed.addFields([
                {name: 'Notes', value: package.additionalInfo.toString()},
              ]);
            }

            if (package.imageUrl) {
              weaponEmbed.setImage(package.imageUrl);
              // weaponEmbed.setThumbnail(package.imageUrl);
            }

            const buttonText = package.price == 0 ? "Claim" : "Buy Now";
            const row = new MessageActionRow()
              .addComponents(
                new MessageButton()
                  .setCustomId(`buy_${package.id}`)
                  .setLabel(buttonText)
                  .setStyle('PRIMARY'),
              );

            channel.send({ embeds: [weaponEmbed], components: [row] });
          })

          Logger.debug(`Channel ${channel.name} finished rebuilding`);
        });
      })();
    } else {
      message.author.send({content: `The \`#${shopPrefix}${shopCategoryFancy}\` channel does not exist` });
    }
  },
};
