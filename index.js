const Discord = require("discord.js")
const config = require("./config.json")
const prefix = "~"
const client = new Discord.Client()

client.login(config.BOT_TOKEN)

client.on("message", function (message) {
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;

    const commandBody = message.content.slice(prefix.length);
    const args = commandBody.split(' ');
    const command = args.shift().toLowerCase();

    if (command === "ping") {
        const timeTaken = Date.now() - message.createdTimestamp
        message.reply(`Pong~ This message had a latency of ${timeTaken}ms`)
    }

    if (command === "roll") {
        const parameters = args.toString().split('d');
        const numofroll = parseInt(parameters[0])
        const rollammount = parseInt(parameters [1])
        var rolltotal = 0
        var counter = 0
        var i = 0

        while (i < numofroll) {
            var total = Math.floor(Math.random() * rollammount) + 1;
            rolltotal = rolltotal + total
            i++
            counter = counter + 1
        }
    
        message.reply(`The total is ${rolltotal}~`)
    }
})