const mongoose = require('mongoose');
const Dieta = require('./../model/Dieta');

describe('Usuario controller', () => {
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
        await Dieta.deleteMany({});
        await Dieta.create({
            nome: 'Emagrecimento',
            id_cliente: 'awqds12fs',
            carboTotal: 123,
            tipo: 'cetogenica',
            refeiçao: ['arroz','frango','batata'],
        });
    });

    it('Should create dieta', async () => {
        const mock = await Dieta.find({});

        expect(mock).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    nome: 'Emagrecimento',
                })
            ])
        );


    });

    it('Should edit dieta', async () => {
        const { _id } = await Dieta.findOne({ nome: 'Emagrecimento', id_cliente: 'awqds12fs'});
        const mock = await Dieta.findByIdAndUpdate({_id}, {carboTotal: 153}, {new: true})
    
        expect(mock).toEqual(
            expect.objectContaining({
                carboTotal: 153,
            })
        );
    });

    it('Should delete dieta', async () => {
        const { _id } = await Dieta.findOne({ nome: 'Emagrecimento', id_cliente: 'awqds12fs' });
        const mock = await Dieta.deleteOne({ _id })
            .catch(err => {mock = err});

        expect(mock).toEqual(
            expect.objectContaining({
                deletedCount: 1,
            })
        );
    });

    it('Should select dieta', async () => {
        const mock = await Dieta.find({ nome: 'Emagrecimento', id_cliente: 'awqds12fs', });
        
        expect(mock).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    nome: 'Emagrecimento',
                })
            ])
        );
    });
});