const Dieta = require('./../model/Dieta');

const DietaController ={
    async store (req, res) {
        const { nome, id_cliente, carboTotal, tipo } = req.body;

        let retorno = await Dieta.create({
            nome,
            id_cliente,
            carboTotal,
            tipo
        }).catch(err => {
            res.status(400).send({ erro: `Erro ao criar dieta, ${err}` })
        });

        res.status(200).json(retorno);

    },

    async show (req, res) {
        const { _id } = req.body;
        
        let dieta = await Dieta.find({ _id }).catch(err => {
            res.status(400).send({ erro: `Erro ao listar dieta, ${err}` })
        });

        res.status(200).json(dieta);
    },

    async showAll (req, res) {
        const { id_cliente } = req.body;
        
        let dieta = await Dieta.find({ id_cliente }).catch(err =>{
            res.status(400).send({ erro: `Erro ao listar todas dietas, ${err}` })
        });

        res.status(200).json(dieta);
    },

    async update (req, res) {
        const _dieta = req.body;

        let dieta = await Dieta.findByIdAndUpdate(_dieta.id, _dieta, {new: true}).catch(err =>
            res.status(400).send({ erro: `Erro ao atualizar dieta, ${err}` })
        );
        
        res.status(200).send(dieta);
    },

    async destroy (req, res) {
        const { _id } = req.body;

        let { deletedCount } = await Dieta.deleteOne({ _id }).catch(err =>{
            res.status(400).send({mensagem: 'Erro ao excluir Dieta. '})
        });

        res.status(200).send({ mensagem: `${deletedCount} dieta excluída. ` });
    },
};

module.exports = DietaController;