module.exports = {
	name: "ping",

	async execute(message, args) {
		message.channel.send({ content: "ふふっ、俺だ。そう、ロリコンだ。" });
	},
};
