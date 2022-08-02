const { EmbedBuilder } = require('discord.js');

module.exports = {
	name: "info",
	description: "俺の紹介を表示するぜ",
    cooldown: 2,

	async execute(message, args) {
        const infoEmbed = new EmbedBuilder()
        .setColor("#4a488e")
        .setTitle("Botの詳細")
        .setThumbnail(message.client.user.displayAvatarURL({format: "png", size: 4096}))
        .setDescription('紫色が好きな18歳男子学生の感情を埋め込まれてないただのBot。普段見せている表の感情を、規約を破らない程度に自動で呟くよ。')

		message.channel.send({
            embeds: [infoEmbed]
        });
	},
};