const db = require("../mongoDB");
module.exports = {
  name: "filter",
  description: "Adds audio filter to ongoing music.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
      const queue = client?.player?.getQueue(interaction?.guild?.id);
      if (!queue || !queue?.playing) return interaction?.reply({ content: '⚠️ No music playing!!', ephemeral: true }).catch(e => { })

      let buttons = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
        .setLabel("3D")
        .setCustomId('3d')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Bassboost")
        .setCustomId('bassboost')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Echo")
        .setCustomId('echo')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Nightcore")
        .setCustomId('nightcore')
        .setStyle(ButtonStyle.Secondary)
      )

      let buttons2 = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
          .setLabel("Vaporwave")
          .setCustomId('vaporwave')
          .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Surround")
        .setCustomId('surround')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Earwax")
        .setCustomId('earwax')
        .setStyle(ButtonStyle.Secondary),
        new ButtonBuilder()
        .setLabel("Karaoke")
        .setCustomId('karaoke')
        .setStyle(ButtonStyle.Secondary)
      )
      

      let embed = new EmbedBuilder()
      .setColor('#01fe66')
      .setAuthor({
          name: 'Audio Filters ',
          iconURL: 'https://media.discordapp.net/attachments/1183145662326526046/1183149629303427194/6095068ca3e711e9.png?ex=658748f5&is=6574d3f5&hm=84929c96a866ed158c57045fb8ba4194dd51a83dc13ce8814bb46c244bd6f2d5&',
          url: 'https://discord.gg/ynk1'
        })
      .setDescription('** Explore the Beat, Choose Your Sound Magic Below!**')
  
    interaction.reply({ embeds: [embed], components: [buttons, buttons2] }).then(async Message => {

      const filter = i => i.user.id === interaction?.user?.id
      let col = await Message?.createMessageComponentCollector({ filter, time: 60000 });

      col.on('collect', async (button) => {
        if (button?.user?.id !== interaction?.user?.id) return
        await button?.deferUpdate().catch(e => { })
        let filters = ["3d", "bassboost", "echo", "karaoke", "nightcore", "vaporwave", "surround", "earwax"]
if(!filters?.includes(button?.customId)) return

      let filtre = button.customId
      if (!filtre) return interaction?.editReply({ content: '❌ Invalid Name', ephemeral: true }).catch(e => { })
     filtre = filtre?.toLowerCase()
   
      if (filters?.includes(filtre?.toLowerCase())) {
        if (queue?.filters?.has(filtre)) {
          queue?.filters?.remove(filtre)
          embed?.setDescription(`Magic : **{filter}**, Applied Status: **{status}**`.replace("{filter}", filtre).replace("{status}", "❌"))
          return interaction?.editReply({ embeds: [embed] }).catch(e => { })
        } else {
          queue?.filters?.add(filtre)
          embed?.setDescription(`Magic : **{filter}**, Applied Status: **{status}**`.replace("{filter}", filtre).replace("{status}", "✅"))
          return interaction?.editReply({ embeds: [embed] }).catch(e => { })
        }
      } else {
        const filter = filters?.find((x) => x?.toLowerCase() === filtre?.toLowerCase())
        embed?.setDescription(`❌ Couldn't find filter!!`.replace("{filters}", filters?.map(mr => `\`${mr}\``).join(", ")))
        if (!filter) return interaction?.editReply({ embeds: [embed] }).catch(e => { })
      }
    })

    col.on('end', async (button, reason) => {
      if (reason === 'time') {

        embed = new EmbedBuilder()
          .setColor(client?.config?.embedColor)
          .setTitle("Time ended.")


        await interaction?.editReply({ embeds: [embed], components: [] }).catch(e => { })
      }
    })

    })

  } catch (e) {
    console.error(e); 
  }
  },
};
