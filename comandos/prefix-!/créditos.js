var database = require("../../database.js")

exports.run = (client, message, args) => {

    let user = message.mentions.users.first();

    if (message.mentions.users.size < 1) {

        database.Users.findOne({
            "_id": message.author.id
        }, function(erro, documento) {

            if (documento) {

                message.channel.sendMessage({
                    "embed": {
                      "title": ":small_orange_diamond: Créditos",
                      "description": `${message.author.username} tem ${documento.coins} creditos!`,
                      "color": 15395328
                    }
                  });

            } else {
                var pessoa = new database.Users({
                    _id: message.author.id,
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

    } else {

        database.Users.findOne({
            "_id": message.mentions.users.first().id
        }, function(erro, documento) {

            if (documento) {

                message.channel.sendMessage({
                    "embed": {
                      "title": ":small_orange_diamond: Créditos",
                      "description": `${message.mentions.users.first().username} tem ${documento.coins} creditos!`,
                      "color": 15395328
                    }
                  });

            } else {
                var pessoa = new database.Users({
                    _id: message.mentions.users.first().id,
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
}
