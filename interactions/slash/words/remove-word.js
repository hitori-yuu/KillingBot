const { SlashCommandBuilder } = require("discord.js");
const wordsModel = require('../../../models/wordsSchema');

module.exports = {
	// The data needed to register slash commands to Discord.

	data: new SlashCommandBuilder()
		.setName("remove-word")
		.setDescription(
			"俺が気まぐれに呟く言葉を削除するぜ。"
		)
		.addStringOption((option) =>
			option
				.setName("言葉")
				.setDescription("削除したい言葉を入力")
		),

	async execute(interaction) {
		let arg = interaction.options.getString("言葉");

        const wordsData = await wordsModel.findOne({ word: arg });
        if (wordsData) {
            await wordsModel.findOneAndRemove({ word: arg });
            await interaction.reply({
                content: `削除に成功したぞ: \`${arg}\``,
            });
        } else {
            await interaction.reply({
                content: `元から存在しないみたいだぜ: \`${arg}\``,
            });
        }
	},
};
