const wordsModel = require('../models/wordsSchema');
const channelsModel = require('../models/channelsSchema');

const schedule = require('node-schedule');

module.exports = {
	name: "ready",

	async execute(client) {
		client.user.setActivity({
			name: '紫色が好きな18歳男子学生'
		})
		console.log(`ログイン完了: ${client.user.tag}`);

		schedule.scheduleJob('*/30 * * * *', async function(){
			const wordsData = await wordsModel.find();
			const channelsData = await channelsModel.find();
			var words = [];
			wordsData.forEach(function(word) {
				words.push([word.word])
			});
			const word = words[Math.floor(Math.random() * (wordsData.length -1 - 0) + 0)].toString();

			channelsData.forEach(function(channel) {
				client.channels.cache.get(channel.id).send(word);
			})
		});
	},
};