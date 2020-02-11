const mongoose = require('mongoose');
const Cliente = require('.././model/Cliente');
const MedidaCliente = require('.././model/MedidaCliente');

describe('cliente controller', () => {
  beforeAll(async () => {
    if (!process.env.MONGO_URL){
        throw new Error('MongoDB server not initialized');
    }

      await mongoose.connect(process.env.MONGO_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
          useFindAndModify: false,
      });
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  beforeEach(async () => {
    await Cliente.deleteMany({}); //deletando qualquer registro
    await Cliente.create({         //Criando mock do cliente
        nome: 'Pitoco da Silva',
        idade: 22,
        nutricionista_id: '5e30d410b7113e277c955385',
        contato:{
            telefone: 123,
        },
    });

  });

    it('Should insert user', async () => {    //testa a inserção de um cliente.
        const list = await Cliente.find({ });


        expect(list).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    nome: 'Pitoco da Silva',
                })
            ]),
        )

    });

    it('Should select user', async () => {      //testa a seleçao de um cliente.
        const list = await Cliente.find({ nutricionista_id: '5e30d410b7113e277c955385' });

        expect(list).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    nome: 'Pitoco da Silva',
                })
            ]),
        )


    });

    it('Should edit user', async () => {        //testa a edição de um cliente.
        const { _id } = await Cliente.findOne({ nome: 'Pitoco da Silva' });  //Simulando o envio do ID do front end.
        const list = await Cliente.findByIdAndUpdate({ _id }, {idade: 6}, {new: true});      

        expect(list).toEqual(
            expect.objectContaining({
                idade: 6,
            })
        )
    });

    it('Should delete user', async () => {      //testa a remoção de um cliente.
        const { _id } = await Cliente.findOne({ nome: 'Pitoco da Silva' });  //Simulando o envio do ID do front end.
        const mock= await Cliente.deleteOne({ _id })
            .catch(err=>{return err});      

        expect(mock).toEqual(
            expect.objectContaining({
                deletedCount: 1
            })
        )
    });    

    //MEDIDAS
    it('Should insert medidas', async() => {    //testa a adição de medidas
        const { _id } = await Cliente.findOne({ nome: 'Pitoco da Silva' })

        await MedidaCliente.create({
            cliente_id: _id,
            data: new Date(),
            altura: 45,
            peso: 32,
            largura: {
                abdomen: 60,
                perna_esquerda: 20,
                perna_direita: 20,
            },
            imc: 25,
            bf: 20

        });

        await MedidaCliente.create({
            cliente_id: _id,
            data: new Date(),
            altura: 45,
            peso: 31,
            largura: {
                abdomen: 59,
                perna_esquerda: 22,
                perna_direita: 22,
            },
            imc: 24,
            bf: 19
        })
        
        const lista = await MedidaCliente.find({ });

        expect(lista).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    bf: 20
                })

            ])
            
        )
    });

});