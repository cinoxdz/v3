const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "stop",
  description: "Stops the music.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    try {
      const queue = client.player.getQueue(interaction.guild.id);
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ No music playing!!', ephemeral: true });
      }

      queue.stop(interaction.guild.id);

      const embed = new EmbedBuilder()
        .setColor('#f1002c')
        .setAuthor({
          name: 'Music Stopped',
          iconURL: 'https://media.discordapp.net/attachments/1183145662326526046/1183149629303427194/6095068ca3e711e9.png?ex=658748f5&is=6574d3f5&hm=84929c96a866ed158c57045fb8ba4194dd51a83dc13ce8814bb46c244bd6f2d5&',
          url: 'https://discord.gg/ynk1'
        })
        .setDescription('**The journey stops, but the rhythm lives on.**')
        

      return interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e);
    }
  },
};
