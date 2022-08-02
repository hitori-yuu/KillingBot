const { SlashCommandBuilder } = require("discord.js");
const channelsModel = require('../../../models/channelsSchema');

module.exports = {
	data: new SlashCommandBuilder()
		.setName("add-channel")
		.setDescription(
			"俺が気まぐれに迷言を送信するチャンネルを登録するぜ"
		)
		.addChannelOption((option) =>
			option
				.setName("チャンネル")
				.setDescription("登録したいチャンネルを選択")
		),

	async execute(interaction) {
		let ch = interaction.options.getChannel("チャンネル");

        const channelsData = await channelsModel.findOne({ id: ch.id });
        if (!channelsData) {
            const channeldata = await channelsModel.create({
                id: ch.id,
                name: ch.name,
                author: interaction.user.tag
            });
            channeldata.save();
            await interaction.reply({
                content: `登録に成功したぞ: \`${ch.name}\``,
            });
        } else {
            await interaction.reply({
                content: `おっと、既に登録されているみたいだぜ:\`${ch.name}\``,
            });
        }
	},
};
