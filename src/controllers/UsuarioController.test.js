const mongoose = require('mongoose');
const User = require('../model/User');
const bcrypt = require('bcryptjs');

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
    await User.deleteMany({});
    
    await User.create({
      nome: 'Julio',
      login: 'julioamoreno',
      senha: '123123',
   
    });
  });

  it('Should insert user', async () => {
    const list = await User.find({ });

    expect(list).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          login: 'julioamoreno',
        }),
      ]),
    );
  });

  it('Should select user', async () => {
    const list = await User.find({});

    expect(list).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          login: 'julioamoreno'
        }),
        expect.objectContaining({
          nome: 'Julio'
        })
      ])
    );
  });

  it('Should authenticate user', async () => {
    const { senha } = await User.findOne({  // procurando um usuario com o login especifico
      login: 'julioamoreno', 
    }).select('senha');
   
    expect(await bcrypt.compare('123123', senha)).toEqual(true);   //compara a senha encriptada com a senha digitada,sendo igual retorna true
  });
});
