import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/user';
import Club from '../database/models/club';
import userMock, { clubsMock, createdMatch, matchsIsInProgressMock, matchsMock, roleUser, sendDataLogin } from './mock';
import Match from '../database/models/match';
import { CreateMatchI, MatchI } from '../database/domain/domain';

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
       .send(userMock)
       
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
       .send(clubsMock)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.length(3);
    expect(chaiHttpResponse.body).to.deep.equal(clubsMock);
    
  });
});

describe('Testa a rota clubs/id', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Club, "findOne")
      .resolves(clubsMock[1] as Club);
  });

  after(()=>{
    (Club.findOne as sinon.SinonStub).restore();
  })

  it('get/clubs/id, verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/clubs/:id')
       .send(clubsMock[1])
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.include.all.keys('id','clubName');
    expect(chaiHttpResponse.body).to.deep.equal(clubsMock[1]);

    
  });
});

describe('Testa a rota matchs', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchsMock as MatchI[] );
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('get/matchs, verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matchs')
       .send(matchsMock)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.length(2);
    
  });
});

describe('Testa a rota matchs/?inProgress', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "findAll")
      .resolves(matchsIsInProgressMock as MatchI[] );
  });

  after(()=>{
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('get/matchs, verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matchs/matchs')
       .send(matchsIsInProgressMock)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('array');
    expect(chaiHttpResponse.body).to.length(2);
    expect(chaiHttpResponse.body).to.deep.equal(matchsIsInProgressMock);
    
  });
});

describe('Testa a rota post/matchs', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "create")
      .resolves(createdMatch as CreateMatchI);
  });

  after(()=>{
    (Match.create as sinon.SinonStub).restore();
  })

  it('post/matchs, verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/matchs')
       .send(createdMatch)
       
    expect(chaiHttpResponse).to.have.status(201);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.deep.equal(createdMatch);
    
  });
});





