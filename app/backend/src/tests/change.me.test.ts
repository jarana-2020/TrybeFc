import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/user';
import Club from '../database/models/club';
import userMock, { clubsMock, roleUser, sendDataLogin } from './mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('post/login, verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(sendDataLogin)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.include.all.keys('user','id','username','role','email','token');
  });

  it('get/login/validate, verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .send(roleUser)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('string');
    expect(chaiHttpResponse.body).to.be.eq('admin');
  });
});

describe('Testa a rota clubs', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Club, "findAll")
      .resolves(clubsMock as Club[]);
  });

  after(()=>{
    (Club.findAll as sinon.SinonStub).restore();
  })

  it('get/clubs, verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs')
       .send()
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.length(3);
    expect(chaiHttpResponse.body).to.deep.equal(clubsMock);
    
  });
});


