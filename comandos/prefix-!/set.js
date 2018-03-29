var database = require("../../database.js")

exports.run = (client, message, args) => {

    var desenvolvedores = ["315263840268976128", "327632440694800386", "261227673609568256"]
    let user = message.mentions.users.first();
    let razaou = args.slice(0).join(' ');
    let razaod = args.slice(1).join(' ');
    let razaot = args.slice(2).join(' ');

    if(desenvolvedores.includes(message.author.id)) {

    if (!razaou.length < 1) {

        if (message.content.startsWith(">set level")) {
            if (!message.mentions.users.size < 1) {
                if (!razaou.length < 1) {
                    database.Users.findOne({
                        "_id": message.mentions.users.first().id
                    }, function(erro, documento) {
                        if(documento){
                            if (parseInt(args[2]) > -1) {
                            documento.level = parseInt(args[2])
                            documento.save();
                            message.reply("**Level setado.**");
                            } else {
                                message.reply("**Não pode ser menor que 0**");
                            }
                        } else {
                            message.reply("**Este usuário não possui um database.**");
                        }
                    })
                } else {
                    message.reply("**Diga que level deseja setar.**");
                }
            } else {
                message.reply("**Mencione quem deseja setar level.**");
            }
        }

        if (message.content.startsWith(">set coins")) {
            if (!message.mentions.users.size < 1) {
                if (!razaou.length < 1) {
                    database.Users.findOne({
                        "_id": message.mentions.users.first().id
                    }, function(erro, documento) {
                        if(documento){
                            if (parseInt(args[2]) > -1) {
                            documento.coins = parseInt(args[2])
                            documento.save();
                            message.reply("**Coins setados.**");
                            } else {
                                message.reply("**Não pode ser menor que 0**");
                            }
                        } else {
                            message.reply("**Este usuário não possui um database.**");
                        }
                    })
                } else {
                    message.reply("**Diga quantos coins deseja setar.**");
                }
            } else {
                message.reply("**Mencione quem deseja setar coins.**");
            }
        }

        if (message.content.startsWith(">set rep")) {
            if (!message.mentions.users.size < 1) {
                if (!razaou.length < 1) {
                    database.Users.findOne({
                        "_id": message.mentions.users.first().id
                    }, function(erro, documento) {
                        if(documento){
                            if (parseInt(args[2]) > -1) {
                            documento.rep = parseInt(args[2])
                            documento.save();
                            message.reply("**Reputações setadas.**");
                            } else {
                                message.reply("**Não pode ser menor que 0**");
                            }
                        } else {
                            message.reply("**Este usuário não possui um database.**");
                        }
                    })
                } else {
                    message.reply("**Diga quantas reputações deseja setar.**");
                }
            } else {
                message.reply("**Mencione quem deseja setar reputação.**");
            }
        }

    } else {
        message.channel.sendMessage({
            "embed": {
              "description": ":star2: **Como usar:**\n```\n>set level <menção da pessoa> <level>\n>set coins <menção da pessoa> <quantidade>\n>set rep <menção da pessoa> <quantidade>```",
              "color": 15395328,
              "thumbnail": {
                "url": "https://i.imgur.com/7IA0YGe.png"
              }
            }
          });
        }
    } else {
        message.reply("**Sem permissão.**");
    }
}
