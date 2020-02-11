const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    nome: { 
        type: String,
        required: true },
    login: { 
        type: String,
        required: true,
        unique: true,
    },
    senha: {
        type: String,
        required: true,
        select: false,
    },
    avatar_url: String,
    bio: String,
    telefone: String,
    redeSocial: {
        facebook: String,
        instagram: String,

    }

});

UserSchema.pre('save', async function(next){
    const hash = await bcrypt.hash(this.senha, 10);
    this.senha = hash;

    next();
})

module.exports = mongoose.model('User', UserSchema);
