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
                            documento2.espera = false
                            documento2.save();
                            documento.casado = documento3._id
                            documento.casamento = true
                            documento.save();
                            documento3.casado = documento._id
                            documento3.casamento = true
                            documento3.save();
                            message.reply("**Pedido de casamento aceito.**");
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