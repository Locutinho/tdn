var mongoose = require("mongoose");
var Schema = mongoose.Schema;
mongoose.connect(process.env.database, {
    useMongoClient: true
}, (err) => {
    if (err) return console.log("Erro ao conectar no database!");
    console.log("Conectado ao BANCO DE DADOS!");
})

var User = new Schema({
    _id: {
        type: String
    },
    level: {
        type: Number,
        default: 0
    },
    xp: {
        type: Number,
        default: 0
    },
    coins: {
        type: Number,
        default: 0
    },
    casamento: {
        type: Boolean,
        default: false
    },
    casado: {
        type: String,
        default: "Ninguem"
    },
    rep: {
        type: Number,
        default: 0
    }
})

var Casado = new Schema({
    _nome1: {
        type: String
    },
    _nome2: {
        type: String,
    },
    espera: {
        type: Boolean,
        default: false
    }
})

var Users = mongoose.model("Users", User);
var Casados = mongoose.model("Casados", Casado);
exports.Users = Users
exports.Casados = Casados