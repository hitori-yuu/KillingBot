const wordsModel = require('../../models/wordsSchema');

module.exports = {
	name: "remove-word",
	description: "俺が気まぐれに呟く言葉を削除するぜ。",
    aliases: ["rmword", 'rmw'],
	usage: "[任意の言葉]",
    cooldown: 2,
	args: true,

	async execute(message, args) {
        const wordsData = await wordsModel.findOne({ word: args });
        if (wordsData) {
            await wordsModel.findOneAndRemove({ word: args });
            message.channel.send({
                content: `削除に成功したぞ: \`${args}\``,
            });
        } else {
            message.channel.send({
                content: `元から存在しないみたいだぜ: \`${args}\``,
            });
        }
	},
};