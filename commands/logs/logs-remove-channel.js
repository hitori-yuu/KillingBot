const logschannelsModel = require('../../models/logschannelsSchema');

module.exports = {
	name: "logs-remove-channel",
	description: "俺がコマンドを実行した際にログを送信するチャンネルを登録するぜ",
    aliases: ["logsrmch", 'logsrmc'],
	usage: "[任意のチャンネルIDまたはチャンネル名]",
    cooldown: 2,
	args: true,
    ownerOnly: true,

	async execute(message, args) {
		const arg = args[0];
        const ch = message.guild.channels.cache.find((channel) => channel.name === arg || channel.id === arg );

        const channelsData = await logschannelsModel.findOne({ id: ch.id });
        if (channelsData) {
            await logschannelsModel.findOneAndRemove({ id: ch.id });
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