const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
  name: "disable",
  aliases: ["resetwelcome", "rwelcome"],
  category: "moderation",
  usage: "setwelcome <#channel>",
  description: "Set the welcome channel",

  run: (client, message, args) => {
    //  let channel = message.mentions.channels.first();
    //   if (!channel) {
    //      return message.channel.send("Please Mention the channel first");
    //    }

    //Now we gonna use quick.db
    db.delete(`welchannel_${message.guild.id}`);
    message.channel.send(`Welcomer Disabled.!`);
  }
};
