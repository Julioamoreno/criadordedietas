const Cliente = require('./../model/Cliente');
const MedidaCliente = require('./../model/MedidaCliente');

const ClienteController = {
    async store (req, res) {
        const { nome, idade, telefone, nutricionista_id } = req.body;

        let cliente = await Cliente.create({
            nome,
            idade,
            nutricionista_id,
            contato:{
                telefone,
            },
        }).catch(err => {
            res.status(400).send({ error: `Erro ao cadastrar cliente,  ${err}` })
        });

        res.json(cliente);

    },

    async show (req, res) {
        const { nutricionista_id } = req.body;

    
        let cliente = await Cliente.find({ nutricionista_id }).catch(err => {
            res.status(400).send({ error: `Erro ao listar cliente,  ${err}` })
        });

        res.json(cliente);
    },

    async showAll(req, res) {   //usado para ver todos clientes, função para gerenciar todos os clientes.
        let cliente = await Cliente.find({ }).catch(err => {
            res.status(400).send({ error: `Erro ao listar os clientes,  ${err}` })
        });
            
        res.json(cliente);
            
    },
    
    async update(req, res){
        const cliente = req.body;

        let resultado = await Cliente.findByIdAndUpdate(cliente._id, cliente , {new: true}).catch(err => {
            res.status(400).send({ error: `Erro ao atualizar, ${err}` })
        });
        
        res.status(200).json(resultado);
    },
    
    async destroy(req, res){
        const { _id } = req.body;
        
        let { deletedCount } = await Cliente.deleteOne({ _id }).catch(err => {
            res.status(400).send({ mensagem: 'Erro ao excluir' });
        });
        
        res.status(200).send({ mensagem: `${deletedCount} usuário excluído. ` })
    },
    
    async createMedida(req, res){
        const { 
            altura,
            peso,
            abdomen,
            perna_esquerda,
            perna_direita,
            imc,
            bf,
        } = req.body;



        let medida = await MedidaCliente.create({
            cliente_id: req.params,
            data: new Date(),
            altura,
            peso,
            largura:{
                abdomen,
                perna_esquerda,
                perna_direita,
            },
            imc,
            bf,
        }).catch(err => {
            res.status(400).send({ erro: `Erro ao criar medidas do usuario,  ${err}` })
        });

        res.json(medida);
    },

};

module.exports = ClienteController;