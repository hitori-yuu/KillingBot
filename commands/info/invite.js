module.exports = {
	name: "invite",
	description: "俺の招待リンクを表示するぜ",
    cooldown: 2,

	async execute(message, args) {
        message.channel.send({
            content: '俺の招待リンクだ: https://discord.com/api/oauth2/authorize?client_id=1002811763131166760&permissions=8&scope=bot%20applications.commands'
        })
	},
};