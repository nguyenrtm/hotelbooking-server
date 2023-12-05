const request = require('supertest');
const should = require('chai').should();
const app = require('../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('GET /user', () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
    }

    it('should return status code 200', (done) => {
        chai.request(app)
            .get('/user')
            .end((err, res) => {
                suite_assertion(err, res);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('GET /user/:id', () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
    }

    it('get user dfX0Uo7liKTVmoPRXcqneg3PV273', (done) => {
        chai.request(app)
            .get('/user/dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                suite_assertion(err, res);
                res.body.should.have.property('uid').equal('dfX0Uo7liKTVmoPRXcqneg3PV273');
                done();
            });
    });

    it('get user OH1VsZ4ANuRc9JuEInjZmOCdpu82', (done) => {
        chai.request(app)
            .get('/user/OH1VsZ4ANuRc9JuEInjZmOCdpu82')
            .end((err, res) => {
                suite_assertion(err, res);
                res.body.should.have.property('uid').equal('OH1VsZ4ANuRc9JuEInjZmOCdpu82');
                done();
            });
    });

    it('get user OEruAO7IVtPgdroSvlbNNP3IHaP2', (done) => {
        chai.request(app)
            .get('/user/OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                suite_assertion(err, res);
                res.body.should.have.property('uid').equal('OEruAO7IVtPgdroSvlbNNP3IHaP2');
                done();
            });
    });  
});

describe('POST /user/:id', () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
    }

    it('post user dfX0Uo7liKTVmoPRXcqneg3PV273', (done) => {
        chai.request(app)
            .post('/user/dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                suite_assertion(err, res);
                done();
            });
    });
});