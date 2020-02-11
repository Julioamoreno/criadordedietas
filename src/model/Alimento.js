const mongoose = require('mongoose');

const AlimentoSchema = new mongoose.Schema({
    nome: {type: Number, required: true},
    peso: Number,
    carboidrato: Number,
    proteina: Number,
    gordura: Number,
    reputaçao: String,
    
   
});



module.exports = mongoose.model('Alimento', AlimentoSchema);
    