import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/user';
import Club from '../database/models/club';
import userMock, { classification, clubsData, clubsMock, createdMatch, matchGoals, matchsIsInProgressMock, matchsMock, roleUser, sendDataLogin, userData } from './mock';
import Match from '../database/models/match';
import { CreateMatchI, LeaderBoardI, MatchI } from '../database/domain/domain';
import { Model } from 'sequelize/types';
import userInfo from './mock';
import ServiceLeaderboard from '../database/services/leaderboardsHome';


chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota login', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userData as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('post/login, verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(userInfo)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.include.all.keys('user', 'token');
    expect(chaiHttpResponse.body.user).to.include.all.keys('id','username','role','email');
  });

  it('get/login/validate, verifica o retorno em caso de sucesso', async () => {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0NzUyMjM5OX0.aGy8TNLLJSHcT3z5ZW0R5898QKlnjyH6m28RRU7-3nY'
    chaiHttpResponse = await chai
       .request(app)
       .get('/login/validate')
       .set({'Authorization': token})
       .send()
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('string');
    expect(chaiHttpResponse.body).to.be.equal('admin');
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

  it('get/matchs/?inProgress=true, verifica se retorna as partidas em andamento', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/matchs?inProgress=true')
       .send()
       
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
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsImlhdCI6MTY0NzUyMjM5OX0.aGy8TNLLJSHcT3z5ZW0R5898QKlnjyH6m28RRU7-3nY'
    chaiHttpResponse = await chai
       .request(app)
       .post('/matchs')
       .set({'Authorization': token})
       .send(createdMatch)
       
    expect(chaiHttpResponse).to.have.status(201);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.deep.equal(createdMatch);
    
  });
});

describe('Testa a rota patch/matchs/:id/finish', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "update")
      .resolves([1] as any);
  });

  after(()=>{
    (Match.update as sinon.SinonStub).restore();
  })

  it('verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matchs/41/finish')
       .send()
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.lengthOf(1);
    expect(chaiHttpResponse.body[0]).to.be.eq(1);
    
  });
});

describe('Testa a rota patch/matchs/:id', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(Match, "update")
      .resolves([1] as any);
  });

  after(()=>{
    (Match.update as sinon.SinonStub).restore();
  })

  it('verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .patch('/matchs/41')
       .send(matchGoals)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.lengthOf(1);
    expect(chaiHttpResponse.body[0]).to.be.eq(1);
    
  });
});

describe('Testa a rota /leaderboard/home', () => {
  
  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(ServiceLeaderboard,'getClubsPoints')
      .returns(classification);
    sinon
      .stub(Club, "findAll")
      .resolves(clubsData as LeaderBoardI[]);
  });

  after(()=>{
    (Club.findAll as sinon.SinonStub).restore();
    (ServiceLeaderboard.getClubsPoints as sinon.SinonStub).restore();
  })

  it('verifica o retorno em caso de sucesso', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .get('/leaderboard/home')
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.an('array');
    expect(chaiHttpResponse.body).to.have.lengthOf(3);
    expect(chaiHttpResponse.body[0]).to.be.an('object');
    expect(chaiHttpResponse.body[1]).to.be.an('object');
    expect(chaiHttpResponse.body[2]).to.be.an('object');
    expect(chaiHttpResponse.body[0]).to.have.all.keys('name','totalPoints','totalGames',
      'totalVictories','totalDraws','totalLosses','goalsFavor','goalsOwn','goalsBalance','efficiency');
    
  });
});





