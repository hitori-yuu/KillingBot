const { SlashCommandBuilder } = require("discord.js");
const wordsModel = require('../../../models/wordsSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("add-word")
		.setDescription(
			"俺が気まぐれに呟く言葉を登録するぞ"
		)
		.addStringOption((option) =>
			option
				.setName("言葉")
				.setDescription("登録したい言葉を入力")
		),

	async execute(interaction) {
		let arg = interaction.options.getString("言葉");

        const wordsData = await wordsModel.findOne({ word: arg });
        if (!wordsData) {
            const worddata = await wordsModel.create({
                word: arg,
                author: interaction.user.tag
            });
            worddata.save();
            await interaction.reply({
                content: `登録に成功したぞ: \`${arg}\``,
            });
        } else {
            await interaction.reply({
                content: `すでに登録されているみたいだぞ: \`${arg}\``,
            });
        }
	},
};
