module.exports = {
	name: "say",
	description: "俺に好きな言葉を言わせるぜ",
	usage: "[任意の言葉]",
	cooldown: 2,
	args: true,

	async execute(message, args) {
        message.delete();

        const arg = args.join(' ').toString();
        if (arg.includes('@everyone' || '@here')) return;
        message.channel.send({
            content: arg
        });
	},
};
