const wordsModel = require('../../models/wordsSchema');

module.exports = {
	name: "add-word",
	description: "俺が気まぐれに呟く言葉を登録するぞ",
    aliases: ["addw", 'adw'],
	usage: "[任意の言葉]",
    cooldown: 2,
	args: true,

	async execute(message, args) {
		const arg = args[0];

        const wordsData = await wordsModel.findOne({ word: arg });
        if (!wordsData) {
            const worddata = await wordsModel.create({
                word: arg,
                author: message.author.tag
            });
            worddata.save();
            message.channel.send({
                content: `登録に成功したぞ: \`${arg}\``,
            });
        } else {
            message.channel.send({
                content: `すでに登録されているみたいだぞ: \`${arg}\``,
            });
        }
	},
};