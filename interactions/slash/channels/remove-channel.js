const { SlashCommandBuilder } = require("discord.js");
const channelsModel = require('../../../models/channelsSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("remove-channel")
		.setDescription(
			"俺が気まぐれに迷言を送信するチャンネルを削除するぜ"
		)
		.addChannelOption((option) =>
			option
				.setName("チャンネル")
				.setDescription("削除したいチャンネルを選択")
		),

	async execute(interaction) {
		let ch = interaction.options.getChannel("チャンネル");

        const channelsData = await channelsModel.findOne({ id: ch.id });
        if (channelsData) {
            await channelsModel.findOneAndRemove({ id: ch.id });
            await interaction.reply({
                content: `削除に成功したぜ: \`${ch.name}\``,
            });
        } else {
            await interaction.reply({
                content: `そのチャンネルは元から登録されてないぞ: \`${ch.name}\``,
            });
        }
	},
};
