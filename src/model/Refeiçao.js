const mongoose = require('mongoose');

const RefeiçaoSchema = new mongoose.Schema({
    id_dieta:{
        type: String,
        required: true,
    },
    nome: String,
    horario: Number,
    id_alimento: [String],
    
   
});



module.exports = mongoose.model('Refeiçao', RefeiçaoSchema);