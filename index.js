var http = require("http");
var https = require("https");
const Discord = require("discord.js")
const config = require("./config.json")
const game_id_list = require("./game_id")

const Medal_Key = config.MEDAL_KEY
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

    if (command === "medal") {
        const parameters = args

        if (parameters[0] === "trending") {
            var game = parameters[1]
            var game_id = game_id_search(game).toString()
            
            var options = {
                host: 'developers.medal.tv',
                port: 443,
                path: '/v1/trending?limit=3&categoryId=' + game_id,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': Medal_Key
                }
        }
            getJSON(options, function(statusCode, result) {
                var resultURL1 = result["contentObjects"][0]["directClipUrl"]
                var resultURL2 = result["contentObjects"][1]["directClipUrl"]
                var resultURL3 = result["contentObjects"][2]["directClipUrl"]
                message.reply(resultURL1)
                message.reply(resultURL2)
                message.reply(resultURL3)
            })

    }
}

function game_id_search(game_name) {
    game_id_list.forEach(function (arrayItem) {
        if (game_name === arrayItem['categoryName'] || game_name === arrayItem['alternativeName'] || game_name === arrayItem['slug']) {
            game_id = arrayItem['categoryId']
        }
    })
    return game_id
}

function getJSON(options, onResult)
{
    var prot = options.port == 443 ? https : http;
    var req = prot.request(options, function(res)
    {
        var output = '';
        res.setEncoding('utf8');

        res.on('data', function (chunk) {
            output += chunk;
        });

        res.on('end', function() {
            var obj = JSON.parse(output);
            onResult(res.statusCode, obj);
        });
    });

    req.on('error', function(err) {
        res.send('error: ' + err.message);
    });

    req.end();
}})