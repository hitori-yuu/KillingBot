require('dotenv').config()

module.exports = {
	/**
	 * @description Executes when the bot is pinged.
	 * @author Naman Vrati
	 * @param {import('discord.js').Message} message The Message Object of the command.
	 */

	async execute(message) {
		return message.channel.send(
			`おう、今のプレフィックス（接頭辞）は \`${process.env.PREFIX}\` だぜ。ヘルプは \`${process.env.PREFIX}help\` で見れるぞ。`
		);
	},
};
