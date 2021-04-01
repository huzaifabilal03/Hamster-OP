const { MessageFlags } = require("discord.js");
const { bowner } = require("../../config.json");
module.exports = {
  name: "reply",
  aliases: ["say"],
  desciption: "say command",
  category: "useful",
  usage: "reply <message> or say <message>",

  async run(client, message, args) {
    if (message.author.id !== bowner) return;
    let msg;
    message.delete();
    msg = args.slice(1).join(" ");
    msg = args.join(" ");
    message.channel.send(msg);
  }
};
