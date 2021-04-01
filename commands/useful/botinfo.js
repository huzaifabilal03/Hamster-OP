const discord = require("discord.js");
const { binvite } = require("../../config.json");
const { bowner } = require("../../config.json");
module.exports = {
  name: "botinfo",
  aliases: ["info", "bi", "stats"],
  category: "help",

  description: "gives details about bot",

  run: async (client, message, args) => {
    let embed = new discord.MessageEmbed()

      .setTitle(`**INFORMATION ABOUT ${client.user.username}**`)
      .setThumbnail(client.user.displayAvatarURL())
      .addField("BOT NAME", `${client.user.username}`)
      .addField("BOT TAG", client.user.tag)
      .addField("BOT ID", client.user.id)
      .addField("BOT DEVELOPER", "<@" + bowner + ">")
      .addField(
        "BOT DEVELOPER TAG",
        "```" + client.users.cache.get(bowner).tag + "```"
      )
      .addField("BOT DEVELOPER ID", bowner)
      .addField("BOT LIBRARY", `[discord.js](https://discord.js.org/#/)`)
      .addField("**Invite**", `[discord.gg/invite](${binvite})`)
      .addField(
        "**Support Server**",
        "[discord.gg/support](https://discord.gg/dw98B9pwhs)"
      )
      .setColor("RED")
      .setFooter(
        "Requested By :-" + message.author.tag,
        message.author.displayAvatarURL()
      )
      .setTimestamp((message.timestamp = Date.now()));

    message.channel.send(embed);
  }
};
