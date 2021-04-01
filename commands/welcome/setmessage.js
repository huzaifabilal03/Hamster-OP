const db = require("quick.db");
const { prefix } = require("../../config.json");
const { msg } = require("../../event/verify.js");
const discord = require("discord.js");
module.exports = {
  name: "setmessage",
  aliases: ["setwmessage", "setwmsg", "setmessage"],
  category: "moderation",
  usage: `${prefix}setmessage <message>`,
  description: "Change the guild prefix",

  run: async (client, message, args) => {
    //PERMISSION
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send(
        "You don't have permission to set welcome message"
      );
    }
    if (!args[0]) {
      return message.channel.send("Please provide a message to set");
    }
    let msg = args.slice(0).join(" ");
    db.set(`msg_${message.guild.id}`, `${msg}`);
    message.channel.send("New welcome message is now " + msg);
  }
};
