const { SlashCommandBuilder } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('giveemote')
		.setDescription('gives a team member an emote')
        .addMentionableOption(option => option.setName("member").setDescription("member's emote to add").setRequired(true))
        .addStringOption(option => option.setName("emote").setDescription("emote").setMinLength(1).setMaxLength(100).setRequired(true)),
        // .addUserOption(option => option.setName("user").setDescription("user")),
        async execute(interaction) {
		var n = interaction.options.getMentionable("member");
        var e = interaction.options.getString("emote");

        console.log(`${interaction.user.username} used giveEmote (${e} -> ${n.user.username})`);

        var exists = await global.db.exists({_id: n.user.id});
        if(exists == true) {
            await global.db.update({_id: n.user.id, name: n.user.username, emote: e});
            await interaction.reply(`reassigned ${n.user.username} to ${e}`);
        } else {
            await global.db.addEntry({_id: n.user.id, name: n.user.username, emote: e})
            // console.log(n.user);
            // var c = await interaction.client.channels.fetch(n.guild.systemChannelId);
            // await c.setName(e);
            await interaction.reply(`assigned ${n.user.username} to ${e}`);
        }

	},
};