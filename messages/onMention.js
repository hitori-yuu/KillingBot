require('dotenv').config()

module.exports = {
	/**
	 * @description Executes when the bot is pinged.
	 * @author Naman Vrati
	 * @param {import('discord.js').Message} message The Message Object of the command.
	 */

	async execute(message) {
		return message.channel.send(
			`Hi ${message.author}! My prefix is \`${process.env.PREFIX}\`, get help by \`${process.env.PREFIX}help\``
		);
	},
};
