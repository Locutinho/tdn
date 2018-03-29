exports.run = (client, message, args) => {

    message.channel.sendMessage({
        "embed": {
          "description": "**Taverna de Noxus** é um servidor relacionado a League of Legends e entre outros jogos, onde você pode encontrar novas amizades, conversar, ouvir música e muito mais! \nㅤ\nEsperamos que você se divirta em nosso servidor.\nㅤ\nCaso goste do servidor, que tal nos ajudar a divulga-lo com **[este link?](https://discord.gg/am4HXUz)**\nㅤ\nNo momento estamos com **" + message.guild.members.size + " membros** :smile:",
          "color": 15395328,
          "timestamp": new Date(),
          "footer": {
            "icon_url": message.author.displayAvatarURL,
            "text": message.author.username
          },
          "thumbnail": {
            "url": "https://i.imgur.com/7IA0YGe.png"
          }
        }
      });
    
}