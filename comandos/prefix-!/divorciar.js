var database = require("../../database.js")

exports.run = (client, message, args) => {

    database.Users.findOne({
        "_id": message.author.id
    }, function (erro, documento) {

        if(documento){

            if(documento.casamento){

                database.Users.findOne({
                    "_id": documento.casado
                }, function (erro2, documento2) {

                    if(documento2){
                        
                        documento.casado = "Ninguem"
                        documento.casamento = false
                        documento.save();
                        documento2.casado = "Ninguem"
                        documento2.casamento = false
                        documento2.save();

                        database.Casados.deleteOne({
                            "_nome1": message.author.id
                        }, function(erro, documento) {})

                        database.Casados.deleteOne({
                            "_nome2": message.author.id
                        }, function(erro, documento) {})

                        message.reply("**Divorciados com sucesso.**");

                    } else {
                        message.reply("**Ocorreu um erro.**");
                    }

                })

            } else {
                message.reply("**Você não está casado.**");
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