const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const usersController = require('../users.controller');
const app = require('../../server').app;

before((done) => {
    usersController.registerUser('verdu', '1234', '30', 'Verde');
    usersController.registerUser('jose', '4321', '45', 'Azul');
    done();
})
describe('Suite de pruebas auth', () => {
    it('should return 400 when no data is provided', (done) => {
        chai.request(app)
            .post('/auth/login')
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });

    it('should return 200 and token for succesful login', (done) => {
        chai.request(app)
            .post('/auth/login')
            .set('content-type', 'application/json')
            .send({user: 'verdu', password: '1234'})
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });

    it('should return 400 when invalid data provided on register', (done) => {
        chai.request(app)
            .post('/auth/register')
            .set('content-type', 'application/json')
            .send({user: 'verdu', password: '1234'})
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 400);
                done();
            });
    });
    it('should return 200 when valid user registered', (done) => {
        chai.request(app)
            .post('/auth/register')
            .set('content-type', 'application/json')
            .send({user: 'Prueba', password: 'prueba1234', age: 45, color: 'Verde'})
            .end((err, res) => {
                //Expect valid login
                chai.assert.equal(res.statusCode, 200);
                done();
            });
    });
});

after((done) => {
    usersController.cleanUpUsers();
    done();
});