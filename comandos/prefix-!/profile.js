var database = require("../../database.js")

exports.run = (client, message, args) => {

    let user = message.mentions.users.first();

    database.Users.findOne({
        "_id": message.mentions.users.first() ? message.mentions.users.first().id : message.author.id
    }, function(erro, documento) {

        var desenvolvedores = ["261227673609568256", "327632440694800386"]

        if (documento) {

            var unbug = 350 * documento.level + 1

            message.channel.sendMessage({
                "embed": {
                  "description": `**:bust_in_silhouette: Perfil pessoal de ${message.mentions.users.first() ? message.mentions.users.first().username : message.author.username}:**\n${message.mentions.users.first() ? `${desenvolvedores.includes(message.mentions.users.first().id) ? "\nㅤA sorte sempre me sorri - Twisted Fate\nㅤ" : "\nㅤ"}` : `${desenvolvedores.includes(message.author.id) ? "\nㅤA sorte sempre me sorri - Twisted Fate\nㅤ" : "\nㅤ"}`}`,
                  "color": 15395328,
                  "thumbnail": {
                    "url": `${message.mentions.users.first() ? message.mentions.users.first().displayAvatarURL : message.author.displayAvatarURL}`
                  },
                  "fields": [
                    {
                      "name": `:star2:  Level ${documento.level} ( ${documento.xp}/${unbug} )`,
                      "value": "ㅤ",
                      "inline": true
                    },
                    {
                      "name": `:boom: Reputação: ${documento.rep}`,
                      "value": "ㅤ",
                      "inline": true
                    },
                    {
                        "name": `:small_orange_diamond: Créditos: ${documento.coins}`,
                        "value": "ㅤ",
                        "inline": true
                    },
                    {
                      "name": `:two_hearts: Casado com: ${!documento.casamento ? "" : message.guild.members.get(documento.casado).user.username}`,
                      "value": "ㅤ",
                      "inline": true
                    }
                  ]
                }
              });

        } else {
            var pessoa = new database.Users({
                _id: message.mentions.users.first() ? message.mentions.users.first().id : message.author.id,
                level: 0,
                xp: 0,
                coins: 0,
                casamento: false,
                casado: "Ninguem",
                rep: 0
            })

            pessoa.save()
        }

    })

}