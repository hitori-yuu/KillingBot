const channelsModel = require('../../models/channelsSchema');

module.exports = {
	name: "add-channel",
	description: "俺が気まぐれに迷言を送信するチャンネルを登録するぜ",
    aliases: ["addch", 'adc'],
	usage: "[任意のチャンネルIDまたはチャンネル名]",
    cooldown: 2,
	args: true,

	async execute(message, args) {
		const arg = args[0];
        const ch = message.guild.channels.cache.find((channel) => channel.name === arg || channel.id === arg );

        const channelsData = await channelsModel.findOne({ id: ch.id });
        if (!channelsData) {
            const channeldata = await channelsModel.create({
                id: ch.id,
                name: ch.name,
                author: message.author.tag
            });
            channeldata.save();
            message.channel.send({
                content: `登録に成功したぞ: \`${ch.name}\``,
            });
        } else {
            message.channel.send({
                content: `おっと、既に登録されているみたいだぜ: \`${ch.name}\``,
            });
        }
	},
};