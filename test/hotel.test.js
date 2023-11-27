const app = require('../server.js');
const should = require('chai').should();
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe("GET hotel/search", () => {
    it("JW Marriott", (done) => {
        chai.request(app)
            .get('/hotel/search?limit=10&hotel_id=null&city=Z6YyrwkuyVbsyaLxOE7E&start_date=2023-11-21&end_date=2023-12-22&room_quantity=2&ppl_quantity=3&user_id=1')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                res.should.have.status(200);
                // res.body[0].should.have.property('id');
                done();
            })
    }).timeout(10000)
})

describe("GET hotel/", () => {
    it("should response with an array", (done) => {
        chai.request(app)
            .get('/hotel')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    })
})

describe("GET hotel/:id", () => {
    describe("exclude start_date and end_date", () => {
        it("get JW Marriott info", (done) => {
            chai.request(app)
                .get('/hotel/MARDKwwXTzoC3ohydrRS')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name');
                    res.body.should.have.property('ratings').have.property('count');
                    res.body.should.have.property('rooms');
                    res.body.should.have.property('city_name');
                    res.body.should.have.property('country');
                    done();
                })
        })
    })
    
    describe("include start_date and end_date", () => {
        it("get JW Marriott info", (done) => {
            chai.request(app)
                .get('/hotel/MARDKwwXTzoC3ohydrRS?start_date=2023-11-20&end_date=2023-12-21')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    console.log(res.body.rooms)
                    res.body.should.have.property('city_name');
                    res.body.should.have.property('country');
                    done();
                })
        })
    })
}).timeout(5000)

describe("GET hotel/feedbacks/:id", () => {
    it("should response with an array", (done) => {
        chai.request(app)
            .get('/hotel/feedbacks?hotel_id=1')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    })
})

describe("GET hotel/favourite", () => {
    it("should response with an object", (done) => {
        chai.request(app)
            .get('/hotel/favourite?user_id=1')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    })
})

describe("GET hotel/suggest", () => {
    it("should response with an array", (done) => {
        chai.request(app)
            .get('/hotel/suggest')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    })
})
