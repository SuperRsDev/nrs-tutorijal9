//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

const rute = require('../rute'),
  dbSetup = require('../modules/core/server/database/dbSetup')

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../index');
// Ovo je potrebno iako se ne koristi direktno dodaje should na res objekat
const should = chai.should();

chai.use(chaiHttp);
describe('Grad', () => {
  before((done) => {
    dbSetup.sinhronizacijaBezInicijalizacije()
      .then(() => done());   
  })

  beforeEach((done) => { //Before each test we empty the database
    dbSetup.sinhronizacijaBezInicijalizacije()
      .then(() => done());        
  });
/*
  * Test the /GET route
  */
  describe('/GET gradovi', () => {
      it('trebalo bi dobaviti sve gradovi', (done) => {
        chai.request(server)
            .get(rute.gradovi.bazna)
            .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('array');
              res.body.length.should.be.eql(0);
              done();
            });
      });
  });

  describe('/GET gradovi/{id}', () => {
    it('trebalo bi dobaviti grad sa id', (done) => {
      const id = 1;
      chai.request(server)
          .get(`${rute.gradovi.bazna}/${id}`)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            // res.body.length.should.be.eql(0);
            done();
          });
    });
  });

  describe('/GET gradovi/{id}', () => {
    it('trebalo bi vratiti gresku za neispravan datum', (done) => {
      chai.request(server)
          .get(`${rute.gradovi.zauzeca}`)
          .end((err, res) => {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.message.should.be.eql('Nevalidan datum poslat');
            done();
          });
    });
  });

  describe('/POST gradovi', () => {
    it('trebalo bi da vrati ispravnu osobu koja je spasena', (done) => {
      const osoba = { naziv: 'Neko', broj_stanovnika: 234434 };
      chai.request(server)
          .post(rute.gradovi.bazna)
          .send(osoba)
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('naziv');
            done();
          });
    });
  });

});
