const { SlashCommandBuilder,EmbedBuilder  } = require('discord.js');

var sampleData = "ilikepugs - 🚮 \nJordan - 🐶\nKester - 🔪\nPonitamil - 🪓\nRuzsh - 🏝️\nSodium - 🧂\nStar10rd - ♟️\nTafini -  🍌\nThegreatleapforward -  🐱\nThis_is_so_sad - 🤯"
function createEmbed(data) {
  const embed = new EmbedBuilder()
  .setTitle("Team Emotes")
  .setDescription(data)
  .setColor("#ffff00")
  .setTimestamp();
  return embed
}



module.exports = {
	data: new SlashCommandBuilder()
		.setName('viewlist')
		.setDescription("lists the team's emotes"),
	async execute(interaction) {
        let emoteData = await global.db.getEntries();
		// console.log(emoteData);
        let strData = "";
        for(item of emoteData) {
            // console.log(item);
            strData += `${item.name} - ${item.emote}\n`;
        }
        if(strData.length <= 0) {
            strData = "no data";
        }
        embed = createEmbed(strData);
        console.log(`${interaction.user.username} used viewlist`);
        await interaction.reply({ embeds: [embed] });
        // interaction.reply(strData);
	},
};