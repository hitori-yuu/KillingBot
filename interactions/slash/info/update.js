const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { update } = require('../../../updates.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("update")
		.setDescription(
			"俺の最近のアップデート情報を表示するぞ"
		),

	async execute(interaction) {
        const updateEmbed = new EmbedBuilder()
        .setColor("#4a488e")
        .setTitle("最近のアップデート")
        .setThumbnail(interaction.client.user.displayAvatarURL({format: "png", size: 4096}))
        .setDescription(update)

        await interaction.reply({
            embeds: [updateEmbed]
        });

	},
};
