const { ChannelType } = require("discord.js");
const logsModel = require('../models/logsSchema');

module.exports = {
	name: "interactionCreate",

	/**
	 * @description Executes when an interaction is created and handle it.
	 * @author Naman Vrati
	 * @param {import('discord.js').CommandInteraction & { client: import('../typings').Client }} interaction The interaction which was created
	 */

	async execute(interaction) {
		// Deconstructed client from interaction object.
		const { client } = interaction;

		// Checks if the interaction is a command (to prevent weird bugs)

		if (!interaction.isChatInputCommand()) return;

		const command = client.slashCommands.get(interaction.commandName);

		// If the interaction is not a command in cache.

		if (!command) return;

		// A try to executes the interaction.

		try {
			await command.execute(interaction);

			var ch_name = interaction.channel.name
			var ch_id = interaction.channel.id
			var ch_dm = false

			if (interaction.channel.type === ChannelType.DM) ch_dm = true;
			if (ch_dm == true) ch_name = ch_id = 'None'

            const logData = await logsModel.create({
				type: 'SLASH_COMMAND',
				command: interaction.commandName,
				args: 'Unknown',
				executer: {
					name: interaction.user.username,
					id:  interaction.user.id,
				},
				locate: {
					name: ch_name,
					id: ch_id,
					dm: ch_dm,
				},
				date: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }),
            });
            logData.save();
		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "エラーが発生したぞ？！",
				ephemeral: true,
			});
		}
	},
};
