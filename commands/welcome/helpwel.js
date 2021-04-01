const discord = require("discord.js");
const { prefix, binvite, sserver } = require("../../config.json");
module.exports = {
  name: "helpwelcome",
  aliases: ["welcome"],
  category: "help",
  description: "KNOW ABOUT THE CREATOR OF BOT",

  run: async (client, message, args) => {
    let embed = new discord.MessageEmbed()
      .setTitle(`NON EMBED WELCOMER HELP`)
      .addField("How It Works", `THIS IS NON EMBED WELCOMER :-`)
      .addField(
        "Welcome Example",
        "`" +
          prefix +
          "welcomeexample or " +
          prefix +
          "wexample` to see how the welcomer looks like"
      )
      .addField(
        "Set Channel",
        "`" + prefix + "setwelcome <#channel> `" + "to set welcome channel"
      )
      .addField(
        "Set Message",
        "`" + prefix + "setwmsg <msg>` to set welcome message make sure to use"
      )
      .addField(
        "Reset Message",
        "`" + prefix + "resetmsg` to reset welcome message"
      )
      .addField(
        "Disable Welcomer",
        "`" + prefix + "disable` to disable non embed welcome"
      )
      .addField(
        "Miscellaneous Settings",
        "use {member} in your description for mentioning the new member"
      )
      .addField("Invite", "[discord.gg/invite](" + binvite + ")")
      .addField("**Support Server**", "[discord.gg/support](" + sserver + ")")
      .setImage(
        "https://cdn.discordapp.com/attachments/817403879305379851/817434114545549312/Screenshot_20210305-220039.jpg"
      )
      .setColor("RED")
      .setThumbnail(client.user.avatarURL())
      .setFooter(
        "Requested By :-" + message.author.tag,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp((message.timestamp = Date.now()));
    message.channel.send(embed);
  }
};
