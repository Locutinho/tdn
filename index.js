console.log("Conectando...")
const Discord = require('discord.js');
const client = new Discord.Client({
    autoReconnect: true,
    max_message_cache: 0
});
const moment = require('moment');
moment.locale('pt-BR');   
const config = require('./config.json');
var database = require("./database.js");
var nicknames = require('nicknames');
const fs = require('fs');

const token = process.env.token;
const prefix = ">";

client.on('guildMemberRemove', member => {

    database.Users.deleteOne({
        "_id": member.id
    }, function(erro, documento) {})

    database.Casados.findOne({
        "_nome1": member.id
    }, function(erro, documento) {
        if(documento){
            database.Users.findOne({
                "_id": documento._nome2
            }, function(err2, doc2) {
                if(doc2){
                doc2.casado = "Ninguem"
                doc2.casamento = false
                doc2.save();
                database.Casados.deleteOne({
                    "_nome1": member.id
                }, function(erro, documento) {})
            } else {
                database.Casados.deleteOne({
                    "_nome1": member.id
                }, function(erro, documento) {})
            }
            })
        }
    })

    database.Casados.findOne({
        "_nome2": member.id
    }, function(erro, documento) {
        if(documento){
            database.Users.findOne({
                "_id": documento._nome1
            }, function(err2, doc2) {
                if(doc2){
                doc2.casado = "Ninguem"
                doc2.casamento = false
                doc2.save();
                database.Casados.deleteOne({
                    "_nome2": member.id
                }, function(erro, documento) {})
            } else {
                database.Casados.deleteOne({
                    "_nome2": member.id
                }, function(erro, documento) {})
            }
            })
        }
    })

})

fs.readdir("./eventos/", (err, files) => {
    if (err) return console.error("[ERRO] " + err);
    files.forEach(file => {
        let eventFunction = require(`./eventos/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, (...args) => eventFunction.run(client, ...args));
    });
});
client.on("message", message => {
    if (message.author.bot) return;
    if (!message.content.startsWith(config.prefix)) return;

    let command = message.content.split(" ")[0];
    command = command.slice(config.prefix.length);

    let args = message.content.split(" ").slice(1);

    try {
        let commandFile = require(`./comandos/prefix-!/${command}.js`);
        commandFile.run(client, message, args);
    } catch (err) {
        console.error("[CONSOLE] " + err);
    }

});

client.on('guildMemberAdd', member => {
    client.guilds.get(member.guild.id).members.get(member.id).sendMessage(`**${member.username}**. bem-vindo ao servidor oficial da **Taverna de Noxus**\nPor favor, leia as regras no canal #bem-vindo.\nO servidor foi criado especialmente para os membros poderem conversar e jogar.\nSe você quiser chamar mais alguém para o servidor, use esse link: https://discord.gg/am4HXUz`);
   })

client.on("ready", () => {
    var cores = ["00FFFF", "FF0000", "000000", "0000FF", "FF0096", "00FF00", "7700A2", "5A0028", "FD5424"]
    const servidor = "426031591450607642"
    const cargo = "426034009810796544"
    
        setInterval(() => {
            client.guilds.get(servidor).roles.get(cargo).edit({color: `${cores[Math.round(Math.random()*cores.length-1)]}`});
        }, 3 * 1000)
    });


client.on("ready", () => {

    let string = ''
    for (var i = 0; i < client.users.size; i++) {

        let userStatus = {
            online: 'online',
            idle: 'ausente',
            dnd: 'ocupado',
            offline: 'offline'
        }[client.users.array()[i].presence.status]

        string += "     - " + client.users.array()[i].username + " ( " + userStatus + " ) ,\n";
    }

    const membrosNomes = string
    var statusIDO = ["idle", "dnd", "online", ]
 

    console.log(`Conectado !`)
    setTimeout(function() {
        console.log(`                   ---== TDM ==---                 \n\nMembros: (${client.users.size}):\n\n${membrosNomes}`);
    }, 2000)
    client.user.setGame("não, estudando.");
    client.guilds.get("428947119135522869").channels.get("428947119517466624").sendMessage("**:warning: Dynos foram reiniciados.**");
    client.user.setStatus(statusIDO[Math.round(Math.random() * statusIDO.length - 1)]);
    setInterval(() => {
        client.user.setStatus(statusIDO[Math.round(Math.random() * statusIDO.length - 1)]);
    }, 1 * 60 * 1000)
    
});

client.login(token)

client.on("message", message => {

    database.Users.findOne({
        "_id": message.author.id
    }, function(erro, documento) {
        if (documento) {

            if (documento.level > 39) {

                if (message.member && message.member.roles.get("426033881955958825")) {} else {
                    message.guild.members.get(message.author.id).addRole("426033881955958825");
                }
            } else {

                if (documento.level > 29) {
                    if (message.member && message.member.roles.get("426034142975754250")) {} else {
                        message.guild.members.get(message.author.id).addRole("426034142975754250");
                    }
                } else {
                    if (documento.level > 19) {
                        if (message.member && message.member.roles.get("426034387008618507")) {} else {
                            message.guild.members.get(message.author.id).addRole("426034387008618507");
                        }
                    } else {
                        if (documento.level > 9) {

                            if (message.member && message.member.roles.get("426034492608872448")) {} else {
                                message.guild.members.get(message.author.id).addRole("426034492608872448");
                            }
                        }
                    }
                }
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
})

var xpCol = new Set()
let xpRDM = Math.round(Math.random() * 35)
let coinsRDM = Math.round(Math.random() * 25)

client.on("message", message => {
    if (message.author.bot) return;
    if (xpCol.has(message.author.id)) return;
    database.Users.findOne({
        "_id": message.author.id
    }, function(erro, documento) {
        if (documento) {
            var unbug = 350 * documento.level + 1
            if (documento.xp > unbug) {
                documento.xp += xpRDM
                documento.level += 1
                documento.coins += documento.level * 200
                message.author.sendMessage(`Parabéns ${message.author}, você acabou de subir para o **nível ${documento.level}**!`);
                documento.xp = 0
                documento.save()
                xpCol.add(message.author.id)
                setTimeout(function() {
                    xpCol.delete(message.author.id)
                }, 30 * 1000)
            } else {
                    documento.xp += xpRDM
                    documento.coins += coinsRDM
                    documento.save()
                    xpCol.add(message.author.id)
                    setTimeout(function() {
                        xpCol.delete(message.author.id)
                    }, 30 * 1000)
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
    });
});