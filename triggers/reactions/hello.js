const wordsModel = require('../../models/wordsSchema');

module.exports = {
	name: ["killing", "キリング", "ロリ", "ロリコン", "kas", "fuck", "kim0"],

	async execute(message, args) {
		// Put all your trigger code over here. This code will be executed when any of the element in the "name" array is found in the message content.
		const wordsData = await wordsModel.find();
		if (wordsData) {
			var words = [];
			wordsData.forEach(function(word) {
				words.push([word.word])
			});

			message.channel.send({
				content: words[Math.floor(Math.random() * (wordsData.length -1 - 0) + 0)].toString(),
			});
		}
	},
};
