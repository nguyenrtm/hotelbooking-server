const app = require('../server.js');
const should = require('chai').should();
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe("Get reservation/active/:id", () => {
    it('should ', function (done) {
        chai.request(app)
            .get('/reservation/active/1')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    });
})

describe("Get reservation/rated/:id", () => {
    it('should ', function (done) {
        chai.request(app)
            .get('/reservation/rated/1')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    });
})

describe('GET reservation/notRated/:id', () => {
    it('responds with json', (done) => {
        chai.request(app)
            .get('/reservation/notRated/1')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    })
})


describe('GET reservation/cancel/:id', () => {
    it('responds with json', (done) => {
        chai.request(app)
            .get('/reservation/cancel/1')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    })
})