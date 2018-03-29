var database = require("../../database.js")

exports.run = (client, message, args) => {

    let user = message.mentions.users.first();

    database.Users.findOne({
        "_id": message.author.id
    }, function (erro, documento) {

        if(documento) {

            if(!documento.casamento) {
                if(!message.mentions.users.size < 1) {
                    database.Users.findOne({
                        "_id": message.mentions.users.first().id
                    }, function (erro2, documento2) {
                        if(documento2) {
                            if(!documento2.casamento) {
                                database.Casados.findOne({
                                    "_nome1": message.author.id
                                }, function (erro3, documento3) {
                                    if(documento3) {
                                        message.reply("**Você já tem um pedido em espera.**");
                                    } else {
                                        database.Casados.findOne({
                                            "_nome2": message.author.id
                                        }, function (erro4, documento4) {
                                            if(documento4) {
                                                message.reply("**Você já tem um pedido em espera.**");
                                            } else {
                                                database.Casados.findOne({
                                                    "_nome1": message.mentions.users.first().id
                                                }, function (erro5, documento5) {
                                                    if(documento5) {
                                                        message.reply("**Este usuário já tem um pedido em espera.**");
                                                    } else {
                                                        database.Casados.findOne({
                                                            "_nome2": message.mentions.users.first().id
                                                        }, function (erro6, documento6) {
                                                            if(documento6) {
                                                                message.reply("**Este usuário já tem um pedido em espera.**");
                                                            } else {
                                                                if (message.mentions.users.first().id == message.author.id) return message.reply("**Você não pode casar com você mesmo!**");
                                                                if (message.mentions.users.first().bot) return message.reply("**Você não pode casar com um bot!**");
                                                                var noivos = new database.Casados({
                                                                    _nome1: message.author.id,
                                                                    _nome2: message.mentions.users.first().id,
                                                                    espera: true
                                                                })

                                                                noivos.save()

                                                                message.channel.sendMessage(`**${message.author} fez um pedido de casamento para  <@${message.mentions.users.first().id}>, será que teremos um novo casal?  :two_hearts:**`);
                                                                message.guild.members.get(message.mentions.users.first().id).sendMessage(`**Você recebeu um pedido de casamento de ${message.author}, user: >aceitar para aceitar ou >recusar para recusar.**`);
                                                            }
                                                        })
                                                    }
                                                })
                                            }
                                        })
                                    }
                                })
                            } else {
                                message.reply("**Este usuário já está casado.**");
                            }
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
                } else {
                    message.reply("**Diga com quem quer casar.**");
                }
            } else {
                message.reply("**Você já está casado.**");
            }

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
}
