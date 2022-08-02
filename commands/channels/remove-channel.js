const channelsModel = require('../../models/channelsSchema');

module.exports = {
	name: "remove-channel",
	description: "俺が気まぐれに迷言を送信するチャンネルを削除するぜ",
    aliases: ["rmchannel", 'rmc'],
	usage: "[任意のチャンネルIDまたはチャンネル名]",
    cooldown: 2,
	args: true,

	async execute(message, args) {
		const arg = args[0];
        const ch = message.guild.channels.cache.find((channel) => channel.name === arg || channel.id === arg );

        const channelsData = await channelsModel.findOne({ id: ch.id });
        if (channelsData) {
            await channelsModel.findOneAndRemove({ id: ch.id });
            message.channel.send({
                content: `削除に成功したぜ: \`${ch.name}\``,
            });
        } else {
            message.channel.send({
                content: `そのチャンネルは元から登録されてないぞ: \`${ch.name}\``,
            });
        }
	},
};