import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import Example from '../database/models/ExampleModel';

import { Response } from 'superagent';
import User from '../database/models/user';
import userMock, { sendDataLogin } from './mock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testa a rota post/login', () => {
  /**
   * Exemplo do uso de stubs com tipos
   */

  let chaiHttpResponse: Response;

  before(async () => {
    sinon
      .stub(User, "findOne")
      .resolves(userMock as User);
  });

  after(()=>{
    (User.findOne as sinon.SinonStub).restore();
  })

  it('testa se o retorno da rota tem os dados corretos', async () => {
    chaiHttpResponse = await chai
       .request(app)
       .post('/login')
       .send(sendDataLogin)
       
    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body).to.be.a('object');
    expect(chaiHttpResponse.body).to.include.all.keys('user','id','username','role','email','token');
  });

  it('Seu sub-teste', () => {
    expect(false).to.be.eq(true);
  });
});
