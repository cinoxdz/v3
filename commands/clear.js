const db = require("../mongoDB");
const { EmbedBuilder } = require('discord.js');

module.exports = {
  name: "clear",
  description: "Clears the music queue.",
  permissions: "0x0000000000000800",
  options: [],
  voiceChannel: true,
  run: async (client, interaction) => {
    const queue = client.player.getQueue(interaction.guild.id);
    
    try {
      if (!queue || !queue.playing) {
        return interaction.reply({ content: '⚠️ No music playing!!', ephemeral: true });
      }

      if (!queue.songs[0]) {
        return interaction.reply({ content: '❌ Queue is empty!!', ephemeral: true });
      }

      await queue.stop(interaction.guild.id);

      const embed = new EmbedBuilder()
        .setColor('#3498db')
        .setAuthor({
          name: 'Cleared List',
          iconURL: 'https://media.discordapp.net/attachments/1183145662326526046/1183149629303427194/6095068ca3e711e9.png?ex=658748f5&is=6574d3f5&hm=84929c96a866ed158c57045fb8ba4194dd51a83dc13ce8814bb46c244bd6f2d5&',
          url: 'https://discord.gg/ynk1'
        })
        .setDescription('**Queue cleared! Be Ready for a new musical journey.**')
       

      interaction.reply({ embeds: [embed] });
    } catch (e) {
      console.error(e); 
    }
  },
};
