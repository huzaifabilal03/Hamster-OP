const { prefix } = require("../../config.json");

module.exports = {
  name: "lock",
  description: "Hides The Mentioned Channels for everyone",
  usage: `\`${prefix}hide <Channel(s)>\``,
  async run(client, message, args) {
    if (!message.guild.me.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(
        `I Don't Have Permission To Use This Command! Manage Channels`
      );
    if (!message.member.permissions.has("MANAGE_CHANNELS"))
      return message.channel.send(
        `You Don't Have Permission To Use This Command! Manage Channels`
      );
    if (args[0] !== "all") {
      if (!args[0])
        return (
          message.channel.updateOverwrite(
            message.channel.guild.roles.everyone,
            {
              SEND_MESSAGES: false
            },
            message.author.tag
          ) &&
          message.channel.send(
            "<#" + message.channel + "> Is Now Locked For Everyone.!"
          )
        );
    }
  }
};
