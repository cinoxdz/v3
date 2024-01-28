const { ApplicationCommandOptionType } = require('discord.js');
const db = require("../mongoDB");

module.exports = {
  name: "owner",
  description: "Get information about bot owner.",
  permissions: "0x0000000000000800",
  options: [],

  run: async (client, interaction) => {
    try {
      const { EmbedBuilder } = require('discord.js')
        const embed = new EmbedBuilder()
            .setColor('#da2a41')
            .setAuthor({
          name: 'Owner',
          iconURL: 'https://media.discordapp.net/attachments/1183145662326526046/1183149629303427194/6095068ca3e711e9.png?ex=658748f5&is=6574d3f5&hm=84929c96a866ed158c57045fb8ba4194dd51a83dc13ce8814bb46c244bd6f2d5&',
          url: 'https://discord.gg/ynk1'
        })
            .setDescription(`__**About me**__:\n\n ▶️ Myself Cinox_Gaming. I am a discord bot developer and web developer. I love playing games, watching anime and building different webserver applications. You will get faster replies on instagram than other social media. Feel free to contact me!\n YouTube : ❤️ [Cinox_Gaming](https://www.youtube.com/@Cinox_Gaming)\n tiktok : 💙 [dz_by](https://www.tiktok.com/@dz_by)`)
            .setTimestamp();
      interaction.reply({ embeds: [embed] }).catch(e => {});

    } catch (e) {
    console.error(e); 
  }
  },
};
