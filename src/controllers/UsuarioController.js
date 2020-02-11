const User = require('../model/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authConfig = require('./../config/auth.json');

function generateToken(params = {}){
    return jwt.sign(params, authConfig.secret, {
        expiresIn: 86400,
    });
};

const InserirUsers = {
    async store (req, res) {
        const { nome, login, senha } = req.body;

        if(await User.findOne({ login })){
            return res.status(400).send({ error: 'Usuario já existe.' });
        }

        let user = await User.create({
        nome,
        login,
        senha,
        }).catch(err => {
            res.status(400).send({ erro: `Erro ao criar usuário, ${err}` })
        });

        user.senha = undefined;  //Não retornar hash da senha
        res.send({
            user,
            token: generateToken({id: user.id}),
        });
    },

    async authenticate (req, res) {
        const { login, senha } = req.body;

        const user = await User.findOne({ login }).select('senha');

        if(! user ) {  // verifica se não houve retorno de usuario
            return res.status(400).send({ error:'Usuário inexistente.' })
        }if(! await bcrypt.compare(senha, user.senha) ) {
            return res.status(400).send({ erro: 'Senha incorreta' });
        }else{
            user.senha = undefined;


            res.send({
                user,
                token: generateToken({id: user.id}),
            });
        }
    }
};

module.exports = InserirUsers;