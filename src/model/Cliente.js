// -id
// -nome
// -idade
// -biotipo
// -contato (tabela a parte)(1x1)
//     -telefone
//     -email
//     -whatsapp
//     -redeSocial
// -medidas (tabela a parte)(1xn)
//     -data
//     -idCliente
//     -idade
//     -altura
//     -peso

const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    idade: Number,
    biotipo: String,
    nutricionista_id: {
        type: mongoose.Types.ObjectId,
        required: true,
        unique: true,
    },
    contato: {
        telefone: {
            type: Number,
            required: true,
    
        },
        email: String,
        whatsapp: Number
    },
   
});



module.exports = mongoose.model('Cliente', ClienteSchema);
    