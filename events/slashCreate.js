const { ChannelType, EmbedBuilder, ApplicationCommandOptionBase } = require("discord.js");
const logsModel = require('../models/logsSchema');
const logschannelsModel = require('../models/logschannelsSchema');

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


			var options = 'None';
			if (interaction.options.data[0]) options = `[${interaction.options.data[0].name}] ${interaction.options.data[0].value}`;

            const logData = await logsModel.create({
				type: 'SLASH_COMMAND',
				command: interaction.commandName,
				args: options,
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


			var ch = `${interaction.channel.name}(${interaction.channel.id})`
			if (ch_dm == true) ch = 'DM';

			const logEmbed = new EmbedBuilder()
				.setColor("#4a488e")
				.setTitle("コマンドログ")
				.setThumbnail(interaction.user.displayAvatarURL({extension: "png", size: 4096}))
				.addFields(
					{ name: 'コマンドの種類', value: 'SLASH_COMMAND' },
					{ name: 'コマンドの名前', value: interaction.commandName },
					{ name: 'コマンドの引数', value: options },
					{ name: 'コマンドの実行者', value: `${interaction.user.username}(${interaction.user.id})` },
					{ name: 'コマンドの実行場所', value: ch },
					{ name: 'コマンドの実行日時', value: new Date().toLocaleString({ timeZone: 'Asia/Tokyo' }) },
				);
			const channelsData = await logschannelsModel.find();
			channelsData.forEach(function(channel) {
				client.channels.cache.get(channel.id).send({embeds: [logEmbed]});
			});

		} catch (err) {
			console.error(err);
			await interaction.reply({
				content: "エラーが発生したぞ？！",
				ephemeral: true,
			});
		}
	},
};
