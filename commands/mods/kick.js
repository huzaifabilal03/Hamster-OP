const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const { bowner } = require("../../config.json");

module.exports = {
  name: "kick",
  category: "moderation",
  description: "Kicks the user",
  accessableby: "Administrator",
  usage: "[name | nickname | mention | ID] <reason> (optional)",
  aliases: ["kickuser"],

  run: async (client, message, args) => {
    try {
      if (!message.member.hasPermission("KICK_MEMBERS"))
        return message.channel.send(
          "**You Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**"
        );

      if (!message.guild.me.hasPermission("KICK_MEMBERS"))
        return message.channel.send(
          "**I Do Not Have Permissions To Kick Members! - [KICK_MEMBERS]**"
        );

      if (!args[0]) return message.channel.send("**Enter A User To Kick!**");

      var kickMember =
        message.mentions.members.first() ||
        message.guild.members.cache.get(args[0]) ||
        message.guild.members.cache.find(
          r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()
        ) ||
        message.guild.members.cache.find(
          ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase()
        );

      if (!kickMember)
        return message.channel.send("**User Is Not In The Guild!**");

      if (kickMember.id === message.member.id)
        return message.channel.send("**You Cannot Kick Yourself!**");

      if (
        message.member.roles.highest.position <=
        kickMember.roles.highest.position
      )
        return message.reply(
          "Your Role isn't High Enough to Kick **``" +
            kickMember.user.tag +
            "``**"
        );

      if (
        message.guild.me.roles.highest.position <=
        kickMember.roles.highest.position
      )
        return message.reply(
          "My Role Isn't High Enough to Kick **``" +
            kickMember.user.tag +
            "``**"
        );

      if (kickMember.id === bowner) return message.reply("HE IS MY OWNER");
      var av = kickMember.user.displayAvatarURL({ dynamic: true });
      var reason = args.slice(1).join(" ");

      try {
        const sembed2 = new MessageEmbed()

          .setColor("RED")
          .setAuthor(
            "Kicked By : " + message.author.tag,
            message.author.displayAvatarURL({ namic: true })
          )
          .setDescription(
            `**From Server : ${message.guild.name} for - ${reason ||
              "No Reason!"}**`
          )
          .setFooter(message.guild.name, message.guild.iconURL());
        kickMember
          .send(sembed2)
          .then(() => kickMember.kick())
          .catch(() => null);
      } catch {
        kickMember.kick(message.author.tag + " For No Reason Provided");
      }
      if (reason) {
        var sembed = new MessageEmbed()
          .setColor("RED")
          .setAuthor(kickMember.user.tag, av)
          .setDescription(
            `**${kickMember.user.username}** has been kicked for ${reason}`
          )
          .setFooter(
            "Kicked By : " + message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          );

        message.channel.send(sembed);
        kickMember.kick(message.author.tag + " For " + reason);
      } else {
        var sembed2 = new MessageEmbed()
          .setColor("RED")
          .setAuthor(kickMember.user.tag, av)
          .setDescription(
            `**${kickMember.user.username}** has been kicked : no reason provided`
          )
          .setFooter(
            "Kicked By : " + message.author.tag,
            message.author.displayAvatarURL({ dynamic: true })
          );
        message.channel.send(sembed2);

        kickMember.kick(
          "[" + message.author.tag + "]" + ` ${reason || " No Reason Provided"}`
        );
      }

      let channel = db.fetch(`modlog_${message.guild.id}`);
      if (!channel) return;
      const embed = new MessageEmbed()
        .setAuthor(`${message.guild.name} Modlogs`, message.guild.iconURL())
        .setColor("RED")
        .setThumbnail(kickMember.user.displayAvatarURL({ dynamic: true }))
        .setFooter(message.guild.name, message.guild.iconURL())
        .addField("**Moderation**", "kick")
        .addField("**User Kicked**", kickMember.user.username)
        .addField("**Kicked By**", message.author.username)
        .addField("**Reason**", `${reason || "**No Reason**"}`)
        .addField("**Date**", message.createdAt.toLocaleString())
        .setTimestamp();

      var sChannel = message.guild.channels.cache.get(channel);
      if (!sChannel) return;
      sChannel.send(embed);
      kickMember.kick(
        "[" + message.author.tag + "]" + ` ${reason || " No Reason Provided"}`
      );
    } catch (e) {
      return message.channel.send(`**${e.message}**`);
    }
  }
};
