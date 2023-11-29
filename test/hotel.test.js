const app = require('../server.js');
const should = require('chai').should();
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe("GET hotel/search", () => {
    it("Hanoi", (done) => {
        chai.request(app)
            .get('/hotel/search?limit=10&hotel_id=null&city=Z6YyrwkuyVbsyaLxOE7E&start_date=2023-11-21&end_date=2023-12-22&room_quantity=2&ppl_quantity=3&user_id=1')
            .end((err, res) => {
                if (err) return done(err);
                // console.log(res.body)
                res.should.have.status(200);
                // res.body[0].should.have.property('id');
                if (res.body.length > 0) {
                    res.body[0].should.have.property('hotel_id');
                    res.body[0].should.not.have.property('id');
                    res.body[0].should.have.property('city_name');
                    res.body[0].should.have.property('country');
                    res.body[0].should.have.property('min_price');
                    res.body[0].should.have.property('is_favorite');
                }
                done();
            })
    }).timeout(5000)
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
    const necessary_properties = (body) => {
        body.should.have.property('name');
        body.should.have.property('ratings').have.property('count');
        body.should.have.property('rooms');
        body.should.have.property('city_name');
        body.should.have.property('country');
        body.should.have.property('min_price');
        body.should.have.property('hotel_id');
        body.should.not.have.property('id');
    }
    describe("exclude start_date and end_date", () => {
        it("get JW Marriott info", (done) => {
            chai.request(app)
                .get('/hotel/MARDKwwXTzoC3ohydrRS')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    necessary_properties(res.body)
                    done();
                })
        })
        
        it("get The Plaza info", (done) => {
            chai.request(app)
                .get('/hotel/J8dIeFClXeVpxCDSN9Aq\n')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    necessary_properties(res.body)
                    done();
                })
        })
    })
    
    describe("include start_date and end_date", () => {
        it("get JW Marriott info", (done) => {
            chai.request(app)
                .get('/hotel/MARDKwwXTzoC3ohydrRS?start_date=2022-11-20&end_date=2023-12-21')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    console.log(res.body.rooms)
                    res.body.should.be.a('object');
                    necessary_properties(res.body)
                    done();
                })
        })
        
        it("get The Plaza info", (done) => {
            chai.request(app)
                .get('/hotel/J8dIeFClXeVpxCDSN9Aq?start_date=2023-11-20&end_date=2023-12-21')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    console.log(res.body.rooms)
                    res.body.should.be.a('object');
                    necessary_properties(res.body)
                    done();
                })
        })
        
        it("get Princesa info", (done) => {
            chai.request(app)
                .get('/hotel/pyBVnR6CIuf6Jtla5Xar?start_date=2023-11-2&end_date=2023-12-21')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    console.log(res.body.rooms)
                    res.body.should.be.a('object');
                    necessary_properties(res.body)
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
            .get('/hotel/favourite?user_id=dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                // console.log(res.body)
                if (res.body.length > 0) {
                    res.body[0].should.have.property('hotel_id');
                }
                done();
            })
    })
})

describe("GET hotel/suggest", () => {
    it("should response with an array", (done) => {
        chai.request(app)
            .get('/hotel/suggest?user_id=OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                // console.log(res.body)
                if (res.body.length > 0) {
                    res.body[0].should.have.property('hotel_id');
                    res.body[0].should.have.property('name');
                    res.body[0].should.have.property('ratings').have.property('count');
                    res.body[0].should.have.property('rooms');
                    res.body[0].should.have.property('city_name');
                    res.body[0].should.have.property('country');
                    res.body[0].should.have.property('min_price');
                    res.body[0].should.have.property('is_favorite');
                }
                done();
            })
    })
})
