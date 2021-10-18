# SCUM Discord Bot

We created this bot for our own personal SCUM server and never intended to open source it. It was created in a way to just work for our setup with little regard for good principles and efficiency. Please keep this in mind when using it and make your own adjustments as needed.

There are 3 parts to this project
 - [Discord Bot (this page)](https://github.com/CodingByHarry/scum_discord_bot_os)
 - [Log Parser](https://github.com/CodingByHarry/scum_log_parser_os)
 - [SCUM Game Bot](https://github.com/CodingByHarry/scum_game_bot_os)

Features
 - Kill feed
 - Chat feed
 - Bounties
 - Discord Shop with automatic item delivery
 - Reward coins for playtime
 - Raffle
 - Events
 - Full admin command set
 - Lightly started squad tracking

## Getting started

You will need node 16.x and a MySQL instance set up.
The admin locked commands require a Discord role named "Admin" to use.

Install node packages.

```sh
npm install
```

Edit the config.json file with with necessary options. [You will need to set up a Discord BOT to get the botToken.](https://discord.com/developers/applications) All the channel IDs can be fetched by using Developer mode on the Discord app.

Run the bot (should setup a service for prod -- read below)

```sh
node discord_bot.js
```

## Create a service (centos)

Create a new systemd /etc/systemd/system

```sh
[Unit]
Description=Scumtopia Discord Bot
After=network.target

[Service]
Type=simple
User=root
WorkingDirectory=/root/servers/scumbot/scum_discord_bot -- CHANGE ME
ExecStart=/usr/bin/node discord_bot.js -- CHANGE ME
Restart=on-failure

[Install]
WantedBy=multi-user.target
```

- `cd` into the directory
- `git pull origin` to grab the latest code
- `service scumbot restart` restart the service to pickup new code changes

## Supported Commands

Admin Commands

`!check <Discord|SteamID> <all|orders>(optional)` - check user details

`!coins <DiscordUser> <+100|-100|200> ` - adjust user coins by adding, removing or hard set (no +/-)

`!shop <category>` - repopulate the shop items. run in the shop category channels to update the shop

`!raffle <open|close|pick>` - open, close or pick a winner for the raffle

`!redeliver <OrderID>` - redeliver an order for whatever reason

Anyone commands

`!balance ` lets users check their coin balance

`!entries <amount>` - enter in to the raffle x times

`!gamble <black|red>` - wasn't really used or finalised, but let players gamble 100 coins for a chance to double their money

`!help` - displays the command info

`!pay <DiscordUser> <Amount>` - allows players to transfer funds to each other

`!register <SteamID64>` - required for players to begin using the bot. registers their discord id in the database

`!status` - checks if the bot is online and pings admins if not

`!support` - shows info on how to submit a support ticket (probably change this for your use)

`!bounty <@DiscordUsername> <NumberOfCoins>` - place a bounty on the user for a set amount of coins

## Contribute / Licensing / Credits
This bot is not to be used in a commercial scenario or for a profit driven server. This was released for other SCUM server owners to setup and use for free without being preasured in to paying for it by other SCUM bots. We would appreciate you crediting us (the authors) although not required.

Feel free to open a pull request if you think there are changes that should be made. I'll review them eventually.

Credits to [myself](https://github.com/CodingByHarry/) and [Daniel](https://github.com/danieldraper) as well as the SCUMTOPIA community for their support and testing.
