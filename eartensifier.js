const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();
client.settings = require("./settings.js");
client.responses = require("./utils/responses.js");

["commands","events"].forEach(handler => {
  require(`./utils/handlers/${handler}`)(client)
})

client.errors = require('./utils/errors.js');

const tokens = require("./tokens.json");

client.on("shardDisconnect", () => console.log("Disconnecting..."));
client.on("shardReconnecting", () => console.log("Reconnecting..."));
client.on("shardError", e => console.log(e));
client.on("shardWarn", w => console.log(w));

client.login(tokens.discordToken);