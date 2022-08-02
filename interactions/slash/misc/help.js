const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("help")
		.setDescription(
			"Botの全コマンド、または特定のコマンドに関する情報を一覧表示します。"
		)
		.addStringOption((option) =>
			option
				.setName("コマンド")
				.setDescription("表示したいコマンド名を入力")
		),

	async execute(interaction) {
		let name = interaction.options.getString("コマンド");
		const helpEmbed = new EmbedBuilder().setColor("#4a488e");

		if (name) {
			name = name.toLowerCase();

			helpEmbed.setTitle(`コマンド \`${name}\``);

			if (interaction.client.slashCommands.has(name)) {
				const command = interaction.client.slashCommands.get(name);

				if (command.data.description)
					helpEmbed.setDescription(
						command.data.description + "\n\n**パラメーター:**"
					);
			} else {
				helpEmbed
					.setDescription(`スラッシュコマンド \`${name}\` は見つからないぞ。`)
					.setColor("#4a488e");
			}
		} else {
			helpEmbed
				.setTitle("すべてのスラッシュコマンド")
				.setDescription(
					"`" +
						interaction.client.slashCommands
							.map((command) => command.data.name)
							.join("`, `") +
						"`"
				);
		}

		await interaction.reply({
			embeds: [helpEmbed],
		});
	},
};
