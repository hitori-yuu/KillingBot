const wordsModel = require('../../models/wordsSchema');

module.exports = {
	name: "words",
	description: "俺が気まぐれに呟く言葉の一覧を表示するぞ",
    cooldown: 2,

	async execute(message, args) {
        const wordsData = await wordsModel.find();
        if (wordsData) {
            var words = [];
            wordsData.forEach(function(word) {
                words.push([word.word])
            });

            message.channel.send({
                content: `俺は以下の **${wordsData.length}個** の言葉を気まぐれに呟くぜ。\n\`\`\`${words.join("\n- ")}\`\`\``,
            });

        } else {
            message.channel.send({
                content: `俺が呟く言葉はないみたいだ。`,
            });
        }
	},
};