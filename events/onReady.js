const wordsModel = require("../models/wordsSchema");
const channelsModel = require("../models/channelsSchema");

const schedule = require("node-schedule");

module.exports = {
	name: "ready",

	async execute(client) {
		client.user.setActivity({
			name: "紫色が好きな18歳男子学生",
		});
		console.log(`ログイン完了: ${client.user.tag}`);

		schedule.scheduleJob("0 7 * * *", async function () {
			const wordsData = await wordsModel.find();
			const channelsData = await channelsModel.find();
			const words = wordsData.map((word) => word.word);
			const word = words[Math.floor(Math.random() * words.length)];

			channelsData.forEach((channel) => {
				client.channels.cache.get(channel.id)?.send(word);
			});
		});
	},
};
