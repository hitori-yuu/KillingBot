/**
 * @file Message Based Commands Handler
 * @author Naman Vrati
 * @since 1.0.0
 * @version 3.3.0
 */

// Declares constants (destructured) to be used in this file.

const { Collection, ChannelType, EmbedBuilder } = require("discord.js");
require('dotenv').config()
const logsModel = require('../models/logsSchema');
const logschannelsModel = require('../models/logschannelsSchema');

// Prefix regex, we will use to match in mention prefix.

const escapeRegex = (string) => {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
};

module.exports = {
	name: "messageCreate",

	/**
	 * @description Executes when a message is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').Message & { client: import('../typings').Client }} message The message which was created.
	 */

	async execute(message) {
		// Declares const to be used.

		const { client, guild, channel, content, author } = message;

		// Checks if the bot is mentioned in the message all alone and triggers onMention trigger.
		// You can change the behavior as per your liking at ./messages/onMention.js

		if (
			message.content == `<@${client.user.id}>` ||
			message.content == `<@!${client.user.id}>`
		) {
			require("../messages/onMention").execute(message);
			return;
		}

		/**
		 * @description Converts prefix to lowercase.
		 * @type {String}
		 */

		const checkPrefix = process.env.PREFIX.toLowerCase();

		/**
		 * @description Regex expression for mention prefix
		 */

		const prefixRegex = new RegExp(
			`^(<@!?${client.user.id}>|${escapeRegex(checkPrefix)})\\s*`
		);

		// Checks if message content in lower case starts with bot's mention.

		if (!prefixRegex.test(content.toLowerCase())) return;

		/**
		 * @description Checks and returned matched prefix, either mention or prefix in config.
		 */

		const [matchedPrefix] = content.toLowerCase().match(prefixRegex);

		/**
		 * @type {String[]}
		 * @description The Message Content of the received message seperated by spaces (' ') in an array, this excludes prefix and command/alias itself.
		 */

		const args = content.slice(matchedPrefix.length).trim().split(/\s+/);

		/**
		 * @type {String}
		 * @description Name of the command received from first argument of the args array.
		 */

		const commandName = args.shift().toLowerCase();

		// Check if mesage does not starts with prefix, or message author is bot. If yes, return.

		if (!message.content.startsWith(matchedPrefix) || message.author.bot)
			return;

		const command =
			client.commands.get(commandName) ||
			client.commands.find(
				(cmd) => cmd.aliases && cmd.aliases.includes(commandName)
			);

		// It it's not a command, return :)

		if (!command) return;

		// Owner Only Property, add in your command properties if true.

		if (command.ownerOnly && message.author.id !== process.env.OWNER.toString() && process.env.OWNER_2.toString()) {
			return message.reply({ content: "そのコマンドはオーナー専用だぜ。" });
		}

		// Guild Only Property, add in your command properties if true.

		if (command.guildOnly && message.channel.type === ChannelType.DM) {
			return message.reply({
				content: "そのコマンドはDMじゃあ実行できないぜ。",
			});
		}

		// Author perms property
		// Will skip the permission check if command channel is a DM. Use guildOnly for possible error prone commands!

		if (command.permissions && message.channel.type !== ChannelType.DM) {
			const authorPerms = message.channel.permissionsFor(message.author);
			if (!authorPerms || !authorPerms.has(command.permissions)) {
				return message.reply({ content: "君はこのコマンドを実行する権限がないみたいなんだ、ドンマイ。" });
			}
		}

		// Args missing

		if (command.args && !args.length) {
			let reply = `引数がないみたいだぜ、確認してくれ。`;

			if (command.usage) {
				reply += `\n使用方法が違うみたいだ。\n使用方法: \`${process.env.PREFIX}${command.name} ${command.usage}\``;
			}

			return message.channel.send({ content: reply });
		}

		// Cooldowns

		const { cooldowns } = client;

		if (!cooldowns.has(command.name)) {
			cooldowns.set(command.name, new Collection());
		}

		const now = new Date();
		const timestamps = cooldowns.get(command.name);
		const cooldownAmount = (command.cooldown || 3) * 1000;

		if (timestamps.has(message.author.id)) {
			const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

			if (now < expirationTime) {
				const timeLeft = (expirationTime - now) / 1000;
				return message.reply({
					content: `ちょっとまってくれ、\`${command.name}\` を実行するにはあと **${timeLeft.toFixed(1)}秒** 待ってくれ。`,
				});
			}
		}

		timestamps.set(message.author.id, now);
		setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

		try {
			command.execute(message, args);

			var ch_name = message.channel.name
			var ch_id = message.channel.id
			var ch_dm = false

			if (message.channel.type === ChannelType.DM) ch_dm = true;
			if (ch_dm == true) ch_name = ch_id = 'None'

            const logData = await logsModel.create({
				type: 'NORMAL_COMMAND',
				command: command.name,
				args: args || 'None',
				executer: {
					name: message.author.username,
					id: message.author.id,
				},
				locate: {
					name: ch_name,
					id: ch_id,
					dm: ch_dm,
				},
				date: now.toLocaleString({ timeZone: 'Asia/Tokyo' }),
            });
            logData.save();


			var ch = `${message.channel.name}(${message.channel.id})`
			if (ch_dm == true) ch = 'DM';

			const logEmbed = new EmbedBuilder()
			.setColor("#4a488e")
			.setTitle("コマンドログ")
			.setThumbnail(message.author.displayAvatarURL({extension: "png", size: 4096}))
			.addFields(
				{ name: 'コマンドの種類', value: 'NORMAL_COMMAND' },
				{ name: 'コマンドの名前', value: command.name },
				{ name: 'コマンドの引数', value: args.join(', ').toString() || 'None' },
				{ name: 'コマンドの実行者', value: `${message.author.username}(${message.author.id})` },
				{ name: 'コマンドの実行場所', value: ch },
				{ name: 'コマンドの実行日時', value: now.toLocaleString({ timeZone: 'Asia/Tokyo' }) },
			);
			const channelsData = await logschannelsModel.find();
			channelsData.forEach(function(channel) {
				client.channels.cache.get(channel.id).send({embeds: [logEmbed]});
			});

		} catch (error) {
			console.error(error);
			message.reply({
				content: "エラーが発生したぞ？！",
			});
		}
	},
};
