const { PermissionsBitField } = require('discord.js');

module.exports = {
    name: "delete-messages",
    description: "指定した数のメッセージを消去するぜ",
    aliases: ["purge"],
    usage: "[削除したいメッセージの件数]",
    cooldown: 2,
    args: true,
    guildOnly: true,
    permissions: ["ManageMessages"],

    async execute(message, args) {
        const arg = args[0];

        if (arg <= 100) {
            const messages = await message.channel.messages.fetch({ limit: arg });
            message.channel.bulkDelete(messages);

            setTimeout(() => {
                message.channel.send({
                    content: `削除に成功したぜ: ${arg}件`
                })
            }, 500)
        }
        else {
            return message.channel.send({content: `${arg} はでかすぎるぞ！１００以下にしてくれ！`});
        }
    },
};