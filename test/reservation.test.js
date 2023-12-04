const app = require('../server.js');
const should = require('chai').should();
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const reservation_properties = (body) => {
    body.should.have.property('hotel_id');
    body.should.have.property('user_id');
    body.should.have.property('start_date');
    body.should.have.property('end_date');
    body.should.have.property('rooms');
    body.should.have.property('id');
    body.should.have.property('is_cancelled');
    body.should.have.property('feedback');
    body.should.have.property('total_cost');
}

describe("Get reservation/active/:id", () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
        if (res.body.length > 0) {
            reservation_properties(res.body[0])
            res.body[0].should.have.property('is_cancelled').equal(false);
            res.body[0].should.have.property('feedback').equal(null);
            // res.body[0].should.have.property('start_date').greaterThanOrEqual();
        }
    }
    
    it('user OEruAO7IVtPgdroSvlbNNP3IHaP2', function (done) {
        chai.request(app)
            .get('/reservation/active/OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
    
    it('user OH1VsZ4ANuRc9JuEInjZmOCdpu82', function (done) {
        chai.request(app)
            .get('/reservation/active/OH1VsZ4ANuRc9JuEInjZmOCdpu82')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
    
    it('user dfX0Uo7liKTVmoPRXcqneg3PV273', function (done) {
        chai.request(app)
            .get('/reservation/active/dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
})

describe("Get reservation/rated/:id", () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
        if (res.body.length > 0) {
            reservation_properties(res.body[0])
            res.body[0].should.have.property('feedback').not.equal(null);
            res.body[0].should.have.property('is_cancelled').equal(false);
            // res.body[0].should.have.property('start_date').lessThanOrEqual(new Date());
        }
    }
    
    it('user OH1VsZ4ANuRc9JuEInjZmOCdpu82', function (done) {
        chai.request(app)
            .get('/reservation/rated/OH1VsZ4ANuRc9JuEInjZmOCdpu82')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
    
    it('user OEruAO7IVtPgdroSvlbNNP3IHaP2', function (done) {
        chai.request(app)
            .get('/reservation/rated/OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
    
    it('user dfX0Uo7liKTVmoPRXcqneg3PV273', function (done) {
        chai.request(app)
            .get('/reservation/rated/dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
})

describe('GET reservation/notRated/:id', () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
        if (res.body.length > 0) {
            reservation_properties(res.body[0])
            res.body[0].should.have.property('feedback').equal(null);
            res.body[0].should.have.property('is_cancelled').equal(false);
            // res.body[0].should.have.property('start_date').lessThanOrEqual(new Date());
        }
    }
    
    it('user OH1VsZ4ANuRc9JuEInjZmOCdpu82', (done) => {
        chai.request(app)
            .get('/reservation/notRated/OH1VsZ4ANuRc9JuEInjZmOCdpu82')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
    
    it('user OEruAO7IVtPgdroSvlbNNP3IHaP2', (done) => {
        chai.request(app)
            .get('/reservation/notRated/OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
    
    it('user dfX0Uo7liKTVmoPRXcqneg3PV273', (done) => {
        chai.request(app)
            .get('/reservation/notRated/dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
})


describe('GET reservation/cancel/:id', () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
        if (res.body.length > 0) {
            reservation_properties(res.body[0])
            res.body[0].should.have.property('is_cancelled').equal(true);
            res.body[0].should.have.property('feedback').equal(null);
        }
    }
    
    it('user OEruAO7IVtPgdroSvlbNNP3IHaP2', (done) => {
        chai.request(app)
            .get('/reservation/cancel/OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
    
    it('user OH1VsZ4ANuRc9JuEInjZmOCdpu82', (done) => {
        chai.request(app)
            .get('/reservation/cancel/OH1VsZ4ANuRc9JuEInjZmOCdpu82')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
    
    it('user dfX0Uo7liKTVmoPRXcqneg3PV273', (done) => {
        chai.request(app)
            .get('/reservation/cancel/dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                suite_assertion(err, res)
                done();
            })
    })
})