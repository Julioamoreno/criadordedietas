const mongoose = require('mongoose');

const DietaSchema = new mongoose.Schema({
    nome: {
        type: String,
    },
    id_cliente: {
        type: String,
        required: true
    },
    carboTotal: Number,
    proteinaTotal: Number,
    gorduraTotal: Number,
    tipo: String,
    refeiçao: [],

   
});

module.exports = mongoose.model('Dieta', DietaSchema);