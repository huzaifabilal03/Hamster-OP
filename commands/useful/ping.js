const discord = require("discord.js");

module.exports = {
  name: "ping",
  category: "info",
  description: "Returns latency and API ping",

  run: async (client, message, args) => {
    let embed = new discord.MessageEmbed()
      .setTitle("BOT LATENCY")
      .addField("Latency", `\`${Date.now() - message.createdTimestamp}ms\``)
      .addField("API Latency", `\`${Math.round(client.ws.ping)}ms\``)
      .setColor("WHITE")
      .setThumbnail(client.user.displayAvatarURL())
      .setFooter(
        "Requested By : " + message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp((message.timestamp = Date.now()));

    message.channel.send(embed);
  }
};
