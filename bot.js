// Requirements
var Discord = require('discord.js');
var Logger = require('winston');
var autJSON = require('./auth.json');
const fs = require('fs');

// Configure logger settings
Logger.remove(Logger.transports.Console);
Logger.add(Logger.transports.Console, {
    colorize: true
});
Logger.level = 'debug';

// Initialize Discord Bot
var bot = new Discord.Client();

// Login and launch bot
bot.login(autJSON.token);

// At startup
bot.on('ready', function (evt) {
    Logger.info('El Risitas ready to issou');// Log in console to be assure that it started
    Logger.info('Serving in ' + bot.guilds.cache.array().length + ' server(s).');// Number of servers that invited the bot
    bot.user.setUsername("El Risitas");// Username of the bot
    bot.user.setPresence({ game: { name: "!issou", type: 0 } });// Its status
});

bot.on('error', function (evt) {
    Logger.error("Error occured : " + evt.message);
});

// Message parsing
bot.on('message', response => {
    if (response.content.substr(0, 1) == '!') {// Prefix chosen: !
        var args = response.content.substr(1).split(' ');
        var cmd = args[0];
        args = args.splice(1);
        // Commands
        switch (cmd) {
            // Messages
            case 'help':
                const embed = new Discord.MessageEmbed()
                    .setTitle("Usage")
                    .setDescription("!ah\tHis friend's laugh (Denis)\n!atahoy\tAtahoy!\n!banador\tMi en bañador\n!chancla\tLa chancla!\n!cocinero\tEl Cocinero!\n!help\tYou'll get this help\n!issou\tEl Famoso\n!ping\tReally bad Joke\n!risitas\tA random laugh\n!yatangaki\t Yatangaki!")
                    .setColor(0xFF0000)
                    .setThumbnail("https://api.joelcancela.fr/discord/risitas.png");
                sendMessage(response, embed);
                break;
            case 'ping':
                sendMessage(response, "Pong you racist");
                break;
            // Sounds
            case 'ah':
                playSound(response, './sounds/ah.mp3');
                break;
            case 'atahoy':
                playSound(response, './sounds/atahoy.mp3');
                break;
            case 'banador':
                playSound(response, './sounds/banador.mp3');
                break;
            case 'chancla':
                playSound(response, './sounds/chancla.mp3');
                break;
            case 'cocinero':
                playSound(response, './sounds/cocinero.mp3');
                break;
            case 'issou':
                playSound(response, './sounds/issou.mp3');
                break;
            case 'risitas':
                playSound(response, './sounds/risitas_laughs/' + getRandomInt(0, 8) + '.mp3');
                break;
            case 'yatangaki':
                playSound(response, './sounds/yatangaki.mp3');
                break;
        }
    }
});

function playSound(responseEntity, soundfileRelativePath) {
    if (responseEntity.member.voice.channel) {
        responseEntity.member.voice.channel.join()
            .then(connection => {
                const dispatcher = connection.play(fs.createReadStream(soundfileRelativePath));
                dispatcher.on('error', console.error);
                dispatcher.on("finish", () => {
                    connection.disconnect();
                });
                dispatcher.destroy();
            })
            .catch(console.log);
    } else {
        responseEntity.reply('You need to join a voice channel first!');
    }
}

function sendMessage(responseEntity, message) {
    responseEntity.channel.send(message).catch(console.error);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
