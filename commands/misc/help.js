require('dotenv').config()
const { EmbedBuilder, ChannelType } = require("discord.js");

module.exports = {
	name: "help",
	description: "俺の全コマンド、もしくは特定のコマンドに関する情報を一覧表示するぜ",
	aliases: ["commands"],
	usage: "[コマンドの名前]",
	cooldown: 2,

	async execute(message, args) {
		const { commands } = message.client;

		// If there are no args, it means it needs whole help command.

		if (!args.length) {
			/**
			 * @type {EmbedBuilder}
			 * @description Help command embed object
			 */

			let helpEmbed = new EmbedBuilder()
				.setColor("#4a488e")
				.setTitle("全コマンドの一覧")
				.setDescription(
					"`" + commands.map((command) => command.name).join("`, `") + "`"
				)

				.addFields([
					{
						name: "使用方法",
						value: `\nコマンドを入力するときは、 \`help [コマンド名]\` と入力するとコマンドの情報が表示されるぜ。`,
					},
				]);

			// Attempts to send embed in DMs.

			return message.author
				.send({ embeds: [helpEmbed] })

				.then(() => {
					if (message.channel.type === ChannelType.DM) return;

					// On validation, reply back.

					message.reply({
						content: "俺のすべてをお前のDMに送信した。",
					});
				})
				.catch((error) => {
					// On failing, throw error.

					console.error(
						`ヘルプDMを ${message.author.tag} に送れませんでした。\n`,
						error
					);

					message.reply({ content: "なぜだ？！貴様にDMが送れないぞ！" });
				});
		}

		// If argument is provided, check if it's a command.

		/**
		 * @type {String}
		 * @description First argument in lower case
		 */

		const name = args[0].toLowerCase();

		const command =
			commands.get(name) ||
			commands.find((c) => c.aliases && c.aliases.includes(name));

		// If it's an invalid command.

		if (!command) {
			return message.reply({ content: "有効なコマンドじゃないぜ、確認してくれ。" });
		}

		/**
		 * @type {EmbedBuilder}
		 * @description Embed of Help command for a specific command.
		 */

		let commandEmbed = new EmbedBuilder()
			.setColor("#4a488e")
			.setTitle("コマンドヘルプ");

		if (command.description)
			commandEmbed.setDescription(`${command.description}`);

		if (command.aliases)
			commandEmbed.addFields([
				{
					name: "別名",
					value: `\`${command.aliases.join(", ")}\``,
					inline: true,
				},
				{
					name: "クールダウン",
					value: `${command.cooldown || 3} 秒`,
					inline: true,
				},
			]);
		if (command.usage)
			commandEmbed.addFields([
				{
					name: "使用方法",
					value: `\`${process.env.PREFIX}${command.name} ${command.usage}\``,
					inline: true,
				},
			]);

		// Finally send the embed.

		message.channel.send({ embeds: [commandEmbed] });
	},
};
