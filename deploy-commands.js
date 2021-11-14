const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, guildId, token } = require('./config.json');

const commands = [
	new SlashCommandBuilder().setName('commands').setDescription('Lists all bot commands!'),
	new SlashCommandBuilder().setName('site').setDescription('Displays the PatCoin Website!'),
	new SlashCommandBuilder().setName('tracker').setDescription('Displays PatBoard Tracker Link'),
	new SlashCommandBuilder().setName('buy').setDescription('Displays link to PancakeSwap'),
	new SlashCommandBuilder().setName('address').setDescription('Displays Contract Address'),
	new SlashCommandBuilder().setName('admin').setDescription('Displays Admin Users'),
	new SlashCommandBuilder().setName('price').setDescription('Displays PatCoin Price Info'),
]
	.map(command => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
	.then(() => console.log('Successfully registered application commands.'))
	.catch(console.error);