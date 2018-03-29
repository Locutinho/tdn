var database = require("../../database.js")

exports.run = (client, message, args) => {

    database.Users.findOne({
        "_id": message.author.id
    }, function (erro, documento) {

        if(documento) {
            database.Casados.findOne({
                "_nome2": message.author.id,
                "espera": true
            }, function (erro2, documento2) {

                if(documento2) {
                    database.Users.findOne({
                        "_id": documento2._nome1
                    }, function (erro3, documento3) {
                        if(documento3) {
                            database.Casados.deleteOne({
                                "_nome2": message.author.id
                            }, function (erro4, documento4) {
                                if(documento4) {
                                    message.reply("**Pedido de casamento recusado.**");
                                } else {
                                    message.reply("**Ocorreu um erro.**");
                                }
                            })
                        } else {
                            message.reply("**Ocorreu um erro.**");
                        }
                    })
                } else {
                    message.reply("**Você não recebeu nenhum pedido de casamento.**");
                }

            })
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