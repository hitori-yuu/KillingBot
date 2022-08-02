const { SlashCommandBuilder } = require("discord.js");
const wordsModel = require('../../../models/wordsSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("words")
		.setDescription(
			"俺が気まぐれに呟く言葉の一覧を表示するぞ"
		),

	async execute(interaction) {
        const wordsData = await wordsModel.find();
        if (wordsData) {
            var words = [];
            wordsData.forEach(function(word) {
                words.push([word.word])
            });

            await interaction.reply({
                content: `俺は以下の **${wordsData.length}個** の言葉を気まぐれに呟くぜ。\n\`\`\`${words.join("\n- ")}\`\`\``,
            });

        } else {
            await interaction.reply({
                content: `俺が呟く言葉はないみたいだ。`,
            });
        }
	},
};
