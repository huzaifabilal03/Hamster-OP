const db = require("quick.db");
const { url } = require("../../event/verify.js");
module.exports = {
  name: "rsetwelcomemsg",
  aliases: ["rsetwmessage", "rsetwmsg", "resetwelcomemessage"],
  category: "moderation",
  usage: "prefix <new-prefix>",
  description: "Change the guild prefix",
  run: async (client, message, args) => {
    //PERMISSION
    if (!message.member.hasPermission("ADMINISTRATOR")) {
      return message.channel.send("You don't have permission to reset welcome message.!");
    }
    db.delete(`msg_${message.guild.id}`);
    return await message.channel.send("Non Embed Welcome Message Reset Success.!");
  }
};
