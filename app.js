
Type to search
Discord js Bot Guide
Support me on Patreon
Introduction
Frequently Asked Questions
Common Errors
Getting Started
Getting Started - Long Version
Getting Started - Linux TL;DR
Getting Started - Windows TL;DR
First Bot
Your First Bot
Adding a Config File
Command with arguments
A Basic Command Handler
Using Embeds in messages
Coding Guides
JSON-Based Points System
SQLite-Based Points System
Enmap-Based Points System
Introducing Enhanced Maps
Creating a Music Bot
Cleverbot Integration
Selfbots, the greatest thing in the universe
Using Emojis
Understanding
Events and Handlers
Collections
Roles
Sharding
Examples
Welcome Message every X users
Message Reply Array
Making an Eval command
Miscellaneous Examples
Discord Webhooks
Discord Webhooks (Part 1)
Discord Webhooks (Part 2)
Discord Webhooks (Part 3)
Other Guides
Installing and Using a proper editor
Using Git to share and update code
Hosting on a Raspberry Pi
Hosting Music Bots on a Raspberry Pi
Hosting on Glitch.com
Async / Await
Docker Part 1: Setup & Dockerfile
Docker Part 2: Installing, running & More
Introduction to modules
Video Guides
Episode 1
Episode 2
Episode 3
Episode 4
Episode 5
Episode 6 Part 1
Episode 6 Part 2
Episode 7
Episode 8
Episode 9
Episode 10 Part 1
Episode 10 Part 2
Published with GitBook
A Basic Command Handler Example

A Command Handler is essentially a way to separate your commands into different files, instead of having a bunch of if/else conditions inside your code (or a switch/case if you're being fancy).

In this case, the code shows you how to separate each command into its own file. This means that each command can be edited separately, and also reloaded without the need to restart your bot. Yes, really!

Want a better, updated version of this code? We're now maintaining this command handler at the community level. Guide Bot is on Github and not only can you use the code, you can also contribute if you feel proficient enough!

App.js Changes

Without going into all the details of the changes made, here is the modified app.js file:

const Discord = require("discord.js");
const client = new Discord.Client();
const fs = require("fs");

const config = require("./config.json");

// This loop reads the /events/ folder and attaches each event file to the appropriate event.
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    let eventFunction = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    // super-secret recipe to call events with all their proper arguments *after* the `client` var.
    client.on(eventName, (...args) => eventFunction.run(client, ...args));
  });
});

client.on("message", message => {
  if (message.author.bot) return;
  if(message.content.indexOf(config.prefix) !== 0) return;

  // This is the best way to define args. Trust me.
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  // The list of if/else is replaced with those simple 2 lines:
  try {
    let commandFile = require(`./commands/${command}.js`);
    commandFile.run(client, message, args);
  } catch (err) {
    console.error(err);
  }
});

client.login(config.token);
