const discord = require("discord.js");
const { prefix, binvite } = require("../../config.json");

module.exports = {
  name: "welcomeexample",
  aliases: ["example"],
  category: "help",
  description: "KNOW ABOUT THE CREATOR OF BOT",
  run: async (client, message, args) => {
    let msg = `**Welcome <@${message.author.id}> To ${message.guild}**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Make Sure To Take Self Roles.**

**Make Sure You Read Rules.**

**Have Fun In Chatting.**`;

    message.channel.send(msg);
  }
};
