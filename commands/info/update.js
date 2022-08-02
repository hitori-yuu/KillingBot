const { EmbedBuilder } = require('discord.js');
const { update } = require('../../updates.json');

module.exports = {
	name: "update",
	description: "俺の最近のアップデート情報を表示するぞ",
    cooldown: 2,

	async execute(message, args) {
        const updateEmbed = new EmbedBuilder()
        .setColor("#4a488e")
        .setTitle("最近のアップデート")
        .setThumbnail(message.client.user.displayAvatarURL({format: "png", size: 4096}))
        .setDescription(update)

		message.channel.send({
            embeds: [updateEmbed]
        });
	},
};