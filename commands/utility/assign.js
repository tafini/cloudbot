const { SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

const stripEmojis = (text) =>
    text.replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '');

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time,'timer'));
}
      
module.exports = {
	data: new SlashCommandBuilder()
		.setName('assign')
		.setDescription('adds team member\'s emotes to the channel')
        .addMentionableOption(option => option.setName("member1").setDescription("team member's emote to add").setRequired(true))
        .addMentionableOption(option => option.setName("member2").setDescription("team member's emote to add"))
        .addMentionableOption(option => option.setName("member3").setDescription("team member's emote to add"))
        .addMentionableOption(option => option.setName("member4").setDescription("team member's emote to add"))
        .addMentionableOption(option => option.setName("member5").setDescription("team member's emote to add"))
        .addMentionableOption(option => option.setName("member6").setDescription("team member's emote to add")),
	async execute(interaction) {
        var c = interaction.channel;
        var emotePrefix = "";
        let newname = stripEmojis(c.name);
        // console.log(stripEmojis(c.name));

        for(var i = 1; i <= 6; i++) {
            var n = await interaction.options.getMentionable(`member${i}`);
            if(!n) continue;
            var userid = n.user.id;
            
            var entry = await global.db.getEntry({"_id": userid.toString()});
            // console.log(userid);
            // console.log(entry);
            // console.log(entry.emote);
            if(entry) {
                emotePrefix += entry.emote;
            }
        }
        console.log(`${interaction.user.username} used assign (${c.name} -> ${emotePrefix} ${newname})`);

        await interaction.deferReply();

        var a = delay(5000);
        var b = c.setName(`${emotePrefix} ${newname}`).catch(console.error);
        var res = await Promise.race([a,b])
        if(res == "timer") {
            await interaction.editReply('discord rate limit error, try again later');
        } else {
            await interaction.editReply(`assigned emotes ${emotePrefix}`).catch(console.error);
        }
        // await c.setName(`${emotePrefix} ${newname}`).catch(console.error);
        // await interaction.reply(`assigned emotes ${emotePrefix}`).catch(console.error);
        // await interaction.reply('asdfasdf');


		
	},
};