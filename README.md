# El Risitas Discord Bot

Just another meme bot for Discord.

## How to use

* Get a Discord token application [here](https://discordapp.com/developers/applications/me), create a new app and copy your token into the ``token`` value field of ```authTO_EDIT.json```.

* Rename ```authTO_EDIT.json``` to ```auth.json```

* Install Node.js dependencies and launch the bot

```node
npm install
node bot
```

* Invite the bot to your Discord (You must have the *Manage Server* permission) [here.](https://discordapp.com/oauth2/authorize?&client_id=411637700156850176&scope=bot&permissions=36719616)

* The bot can be hosted using docker :

```bash
docker build -t <yourname>/el_risitas_bot .
docker run -d <yourname>/el_risitas_bot
```

## Available commands

* !ah - El Risitas will bring his friend Denis Brogniart.
* !help - Lists all available commands.
* !ping - Ouch.

### Risitas famous catchphrases

* !atahoy
* !banador
* !chancla
* !cocinero
* !issou
* !risitas - Risitas random laugh.
* !yatangaki
