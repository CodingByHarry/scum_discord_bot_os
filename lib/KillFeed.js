const { sequelize, Kills } = require("../dbObjects.js");
const { Sequelize, QueryTypes } = require("sequelize");
const { MessageEmbed } = require("discord.js");

module.exports = {
  publish: (client) => {
    const channel = client.guilds.cache.get(Config.guildId).channels.cache.get(Config.killFeedsChannel);

    Kills.findAll({where: {publishedAt: null}, order: ['logTimestamp', 'timeOfDay']}).then(kills => {
      kills.forEach(kill => {
        const eventColor = "#5e2ec4";
        const unknownWeaponColor = "#135fff";
        const explosiveColor = "#f0b90a";
        const weaponColor = "#db2725";

        if (kill.weaponName == null) {
          let killEmbed = new MessageEmbed()
            .setColor(kill.killerInEvent ? eventColor : unknownWeaponColor)
            .setFields([
              {name: "Killer", value: `🎖️ ${kill.killerName.toString()}`},
              {name: "Victim", value: `💀 ${kill.victimName.toString()}`},
              {name: "Weapon", value: "Unknown", inline: true},
              {name: "Distance", value: `${kill.distance.toString()}m`, inline: true},
            ]);

          kill.update({publishedAt: Sequelize.literal('CURRENT_TIMESTAMP')});
          channel.send({embeds: [killEmbed]});
        } else if (kill.weaponName.endsWith("_EVENT_C")) { // BPC_Weapon_98k_Karabiner_EVENT_C
          const weaponParts = kill.weaponName.match(/(.*)_EVENT_C/);
          const weaponLookupName = weaponParts[0];
          sequelize.query(
            "SELECT * FROM weapon_images WHERE lookup = :lookup LIMIT 1",
            {
              replacements: {lookup: weaponLookupName},
              type: QueryTypes.SELECT,
            }
          ).then(weaponImageRows => {
            const weaponImage = weaponImageRows.length ? weaponImageRows[0] : null;
            const weaponName = weaponImage ? weaponImage.name : weaponParts[1];
            const weaponImageUrl = weaponImage ? weaponImage.url : null;

            let killEmbed = new MessageEmbed()
              .setColor(eventColor)
              .setFields([
                {name: "Killer", value: `🎖️ ${kill.killerName.toString()}`},
                {name: "Victim", value: `💀 ${kill.victimName.toString()}`},
                {name: "Weapon", value: weaponName.toString(), inline: true},
                {name: "Distance", value: `${kill.distance.toString()}m`, inline: true},
              ])
              .setFooter(`📅 Participating in an event`);

              if (weaponImageUrl) {
                killEmbed.setThumbnail(weaponImageUrl);
              }

            kill.update({publishedAt: Sequelize.literal('CURRENT_TIMESTAMP')});
            channel.send({embeds: [killEmbed]});
          });
        } else if (/_C_\d*/.test(kill.weaponName)) { // BP_Frag_Grenade_C_2147049456
          const weaponParts = kill.weaponName.match(/(.*)_C_(\d*)/);
          const weaponLookupName = weaponParts[1];

          sequelize.query(
            "SELECT * FROM weapon_images WHERE lookup = :lookup LIMIT 1",
            {
              replacements: {lookup: weaponLookupName},
              type: QueryTypes.SELECT,
            }
          ).then(weaponImageRows => {
            const weaponImage = weaponImageRows.length ? weaponImageRows[0] : null;
            const weaponName = weaponImage ? weaponImage.name : weaponParts[1];
            const weaponImageUrl = weaponImage ? weaponImage.url : null;

            let killEmbed = new MessageEmbed()
            .setColor(kill.killerInEvent ? eventColor : explosiveColor)
              .setFields([
                {name: "Victim", value: `💀 ${kill.victimName.toString()}`},
                {name: "Weapon", value: weaponName.toString()}
              ]);

              if (weaponImageUrl) {
                killEmbed.setThumbnail(weaponImageUrl);
              }

            kill.update({publishedAt: Sequelize.literal('CURRENT_TIMESTAMP')});
            channel.send({embeds: [killEmbed]});
          });
        } else if (kill.weaponName.endsWith("_C")) { // BP_Weapon_MK18_C
          const weaponParts = kill.weaponName.match(/(.*)_C/);
          const weaponLookupName = weaponParts[1];

          sequelize.query(
            "SELECT * FROM weapon_images WHERE lookup = :lookup LIMIT 1",
            {
              replacements: {lookup: weaponLookupName},
              type: QueryTypes.SELECT,
            }
          ).then(weaponImageRows => {
            const weaponImage = weaponImageRows.length ? weaponImageRows[0] : null;
            const weaponName = weaponImage ? weaponImage.name : weaponParts[1];
            const weaponImageUrl = weaponImage ? weaponImage.url : null;

            let killEmbed = new MessageEmbed()
            .setColor(kill.killerInEvent ? eventColor : weaponColor)
              .setFields([
                {name: "Killer", value: `🎖️ ${kill.killerName.toString()}`},
                {name: "Victim", value: `💀 ${kill.victimName.toString()}`},
                {name: "Weapon", value: weaponName.toString(), inline: true},
                {name: "Distance", value: `${kill.distance.toString()}m`, inline: true},
              ])

              if (weaponImageUrl) {
                killEmbed.setThumbnail(weaponImageUrl);
              }

            kill.update({publishedAt: Sequelize.literal('CURRENT_TIMESTAMP')});
            channel.send({embeds: [killEmbed]});
          });
        }
      });
    });
  }
}
