const discord = require("discord.js");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "avatar",
  aliases: ["av"],
  category: "info",
  description: "Get dp of any user",
  run: async (client, message, args) => {
    let target;

    if (message.mentions.users.first()) {
      target = message.mentions.users.first();
    } else if (args[0]) {
      target = message.guild.members.cache.get(args[0]).user;
    } else {
      target = message.author;
    }
    message.delete();

    let avatar = target.displayAvatarURL({ dynamic: true, size: 512 });
    let embed = new discord.MessageEmbed();

    embed.setAuthor(
      `AVATAR of ${target.username}`,
      message.author.displayAvatarURL({ dynamic: true })
    );
    embed.setDescription(`[Download](${avatar})`);
    embed.setImage(avatar);
    embed.setColor("RANDOM");
    embed.setFooter(
      `Requested by ${message.author.username}`,
      message.author.displayAvatarURL({ dynamic: true })
    );
    message.channel.send(embed);
  }
};
