const db = require("../mongoDB");
module.exports = {
  name: "loop",
  description: "Turns the music loop mode on or off.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    
    try {
      const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) return interaction.reply({ content: '⚠️ No music playing!!', ephemeral: true }).catch(e => { })
  
      let button = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Queue")
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("queue"),
        new ButtonBuilder()
          .setLabel("Current Song")
          .setStyle(ButtonStyle.Secondary)
          .setCustomId("nowplaying"),
        new ButtonBuilder()
          .setLabel("Stop Loop!")
          .setStyle(ButtonStyle.Danger)
          .setCustomId("close")
      )

      const embed = new EmbedBuilder()
        .setColor('#fc4e03')
        .setAuthor({
        name: 'Loop Your Melodies',
        iconURL: 'https://media.discordapp.net/attachments/1183145662326526046/1183149629303427194/6095068ca3e711e9.png?ex=658748f5&is=6574d3f5&hm=84929c96a866ed158c57045fb8ba4194dd51a83dc13ce8814bb46c244bd6f2d5&',
          url: 'https://discord.gg/ynk1'
    })
        .setDescription('**Looping it! Let the music play on and on. **')
     
      interaction?.reply({ embeds: [embed], components: [button], fetchReply: true }).then(async Message => {

        const filter = i => i.user.id === interaction.user.id
        let col = await Message.createMessageComponentCollector({ filter, time: 120000 });

        col.on('collect', async (button) => {
          if (button.user.id !== interaction.user.id) return
          const queue1 = client.player.getQueue(interaction.guild.id);
          if (!queue1 || !queue1.playing) {
            await interaction?.editReply({ content: '⚠️ No music playing!!', ephemeral: true }).catch(e => { })
            await button?.deferUpdate().catch(e => {})
          }
          switch (button.customId) {
            case 'queue':
              const success = queue.setRepeatMode(2);
              interaction?.editReply({ content: `✅ Looping Queue!!` }).catch(e => { })
              await button?.deferUpdate().catch(e => {})
              break
            case 'nowplaying':
              const success2 = queue.setRepeatMode(1);
              interaction?.editReply({ content: `✅ Looping activated!!` }).catch(e => { })
              await button?.deferUpdate().catch(e => {})
              break
            case 'close':
              if (queue.repeatMode === 0) {
                await button?.deferUpdate().catch(e => {})
                return interaction?.editReply({ content: '⚠️ Looping already Off!!', ephemeral: true }).catch(e => { })
              }
              const success4 = queue.setRepeatMode(0);
              interaction?.editReply({ content: '▶️ Looping off' }).catch(e => { })
              await button?.deferUpdate().catch(e => {})
              break
          }
        })
        col.on('end', async (button) => {
          button = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
              .setStyle(ButtonStyle.Secondary)
              .setLabel("Timeout")
              .setCustomId("timeend")
              .setDisabled(true))

          const embed = new EmbedBuilder()
            .setColor('#fc5203')
            .setTitle('▶️ Looping off!!')
            .setTimestamp()

          await interaction?.editReply({ content: "", embeds: [embed], components: [button] }).catch(e => { });
        })
      }).catch(e => { })

    } catch (e) {
    console.error(e); 
  }
  }
}
