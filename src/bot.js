// Requirements
const Discord = require('discord.js');
const autJSON = require('../auth.json');
const fs = require('fs');
const { Logger } = require('./util/logging');
const bot = new Discord.Client(); // Initialize Discord Bot

// Login and launch bot
bot.login(autJSON.token);

// At startup
bot.on('ready', function() {
  Logger.info('El Risitas ready to issou');// Log in console to be assure that it started
  Logger.info('Serving in ' + bot.guilds.cache.array().length + ' server(s).');// Number of servers that invited the bot
  bot.user.setUsername('El Risitas');// Username of the bot
  bot.user.setActivity('!issou, !risitas', { type: 'PLAYING' });// Its status
});

bot.on('error', function(evt) {
  Logger.error('Error occured : ' + evt.message);
});

// Message parsing
bot.on('message', (message) => {
  if (message.content.substr(0, 1) == '!') {// Prefix chosen: !
    let args = message.content.substr(1).split(' ');
    const cmd = args[0];
    args = args.splice(1);
    // Commands
    switch (cmd) {
    // Messages
    case 'help':
      const embed = new Discord.MessageEmbed()
        .setTitle('Usage')
        .setDescription('!ah\tHis friend\'s laugh (Denis)\n!atahoy\tAtahoy!\n!banador\tMi en bañador\n!chancla\tLa chancla!\n!cocinero\tEl Cocinero!\n!help\tYou\'ll get this help\n!issou\tEl Famoso\n!ping\tReally bad Joke\n!risitas\tA random laugh\n!yatangaki\t Yatangaki!')
        .setColor(0xFF0000)
        .setThumbnail('https://joelcancela.ddns.net/api/discord/risitas');
      sendMessage(message, embed);
      break;
    case 'ping':
      sendMessage(message, 'Pong you racist');
      break;
      // Sounds
    case 'ah':
      joinChannelAndPlaySound(message, './sounds/ah.mp3');
      break;
    case 'atahoy':
      joinChannelAndPlaySound(message, './sounds/atahoy.mp3');
      break;
    case 'banador':
      joinChannelAndPlaySound(message, './sounds/banador.mp3');
      break;
    case 'chancla':
      joinChannelAndPlaySound(message, './sounds/chancla.mp3');
      break;
    case 'cocinero':
      joinChannelAndPlaySound(message, './sounds/cocinero.mp3');
      break;
    case 'issou':
      joinChannelAndPlaySound(message, './sounds/issou.mp3');
      break;
    case 'risitas':
      joinChannelAndPlaySound(message, './sounds/risitas_laughs/' + getRandomInt(0, 8) + '.mp3');
      break;
    case 'yatangaki':
      joinChannelAndPlaySound(message, './sounds/yatangaki.mp3');
      break;
    }
  }
});

/**
 * Joins the voice channel of the user that sent the command and plays the provided sound
 * @param {Message} message https://discord.js.org/#/docs/main/stable/class/Message
 * @param {string} soundfileRelativePath path to the sound file to play
 */
function joinChannelAndPlaySound(message, soundfileRelativePath) {
  if (message.member.voice.channel) {
    message.member.voice.channel.join()
      .then((connection) => {
        const dispatcher = connection.play(fs.createReadStream(soundfileRelativePath));
        dispatcher.on('error', Logger.error);
        dispatcher.on('finish', () => {
          connection.disconnect();
        });
      })
      .catch(Logger.error);
  } else {
    message.reply('You need to join a voice channel first!');
  }
}

/**
 * Sends a message to the channel where the provided message was posted
 * @param {Message} message
 * @param {MessageEmbed|string} messageToSend
 */
function sendMessage(message, messageToSend) {
  message.channel.send(messageToSend).catch(Logger.error);
}

/**
 * Returns a random number between min and max included
 * @param {number} min
 * @param {number} max
 * @return {number} between min and max included
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
