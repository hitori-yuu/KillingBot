const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("info")
		.setDescription(
			"俺の紹介を表示するぜ"
		),

	async execute(interaction) {
        const infoEmbed = new EmbedBuilder()
        .setColor("#4a488e")
        .setTitle("Botの詳細")
        .setThumbnail(interaction.client.user.displayAvatarURL({format: "png", size: 4096}))
        .setDescription('紫色が好きな18歳男子学生の感情を埋め込まれてないただのBot。普段見せている表の感情を、規約を破らない程度に自動で呟くよ。')

		await interaction.reply({
            embeds: [infoEmbed]
        });
	},
};
