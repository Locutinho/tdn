exports.run = (client, message, args) => {

    message.channel.sendMessage({
        "embed": {
          "description": ":star2: **Como usar:**\n```\n>casar <menção da pessoa>\n>aceitar\n>recusar\n>divorciar```",
          "color": 15395328,
          "thumbnail": {
            "url": "https://i.imgur.com/7IA0YGe.png"
          }
        }
      });
    
}