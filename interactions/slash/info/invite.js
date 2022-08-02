const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("invite")
		.setDescription(
			"俺の招待リンクを表示するぜ"
		),

	async execute(interaction) {
		await interaction.reply({
            content: '俺の招待リンクだ: https://discord.com/api/oauth2/authorize?client_id=1002811763131166760&permissions=8&scope=bot%20applications.commands'
        });
	},
};
