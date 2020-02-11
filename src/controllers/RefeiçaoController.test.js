const mongoose = require('mongoose');
const Refeiçao = require('./../model/Refeiçao');

describe('Refeição Controller', () => {
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
        await Refeiçao.deleteMany({}); //deletando qualquer registro
        await Refeiçao.create({
            id_dieta:'idexemplo',
            nome:'Almoço',
            horario: 13,
            id_alimento:[
               'arroz','feijao'
            ],
        });
    });

    it('should insert refeição', async () => {
        const list = await Refeiçao.find({ });

        expect(list).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    nome: 'Almoço',
                })
            ])
        );
    });

    it('should select refeição', async () => {
        const list = await Refeiçao.find({ id_dieta:'idexemplo', });

        expect(list).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    nome: 'Almoço'
                })
            ])
        );


    });

    it('should update refeição', async () => {
        const _refeiçao = new Refeiçao({ 
            id_dieta:'idexemplo',
            nome:'Jantar',
            horario: 13,
            id_alimento:[
            'arroz','feijao'
            ],
        });
        const list = await Refeiçao.findOneAndUpdate({id_dieta:'idexemplo'}, {nome: 'Jantar'},{new:true});

        expect(list).toEqual(
            expect.objectContaining({
                nome: 'Jantar'
            })
        );


    });

    it('should delete refeição', async () => {
        const { _id } = await Refeiçao.findOne({ 
            id_dieta:'idexemplo',
            nome:'Almoço' 
        })
        const list = await Refeiçao.deleteOne({ _id });

        expect(list).toEqual(
            expect.objectContaining({
                deletedCount: 1,
            })
        );
    });

});