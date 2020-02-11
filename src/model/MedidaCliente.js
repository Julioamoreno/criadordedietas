const mongoose = require('mongoose');

const MedidaClienteSchema = new mongoose.Schema({
    cliente_id: {
        type: String,
        required: true,
        default: Date.now,
    },
    data: {
        type: Date,
        required: true
    },
    altura: Number,
    peso: Number,
    largura: {
        abdomen: Number,
        cintura: Number,
        perna_esquerda: Number,
        perna_direita: Number,
        braco_esquerdo: Number,
        braco_direito: Number,
    },
    imc: Number,
    bf: Number,

    
});

module.exports = mongoose.model('MedidaCliente', MedidaClienteSchema);