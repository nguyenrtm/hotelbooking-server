const app = require('../server.js');
const should = require('chai').should();
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const hotel_properties = (body) => {
    body.should.have.property('name');
    body.should.have.property('ratings').have.property('count');
    body.should.have.property('rooms');
    body.should.have.property('city_name');
    body.should.have.property('country');
    body.should.have.property('min_price');
    body.should.have.property('hotel_id');
    body.should.not.have.property('id');
}

describe("GET hotel/search", () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
        if (res.body.length > 0) {
            hotel_properties(res.body[0])
            res.body[0].should.have.property('is_favorite');
        }
    }
    
    it("Hanoi from 2023-21-11 to 2023-12-22", (done) => {
        chai.request(app)
            .get('/hotel/search?limit=10&hotel_id=null&city=Z6YyrwkuyVbsyaLxOE7E&start_date=2023-11-21&end_date=2023-12-22&room_quantity=2&ppl_quantity=3&user_id=OH1VsZ4ANuRc9JuEInjZmOCdpu82')
            .end((err, res) => {
                if (err) return done(err);
                suite_assertion(err, res)
                done();
            })
    })
    
    it("New York from 2023-21-11 to 2023-12-22", (done) => {
        chai.request(app)
            .get('/hotel/search?limit=10&hotel_id=null&city=aSQphDmzTKedOvUrkQPR&start_date=2022-11-21&end_date=2023-12-22&room_quantity=2&ppl_quantity=3&user_id=dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                if (err) return done(err);
                suite_assertion(err, res)
                done();
            })
    })
    
    it("Madrid from 2023-21-11 to 2023-12-22", (done) => {
        chai.request(app)
            .get('/hotel/search?limit=10&hotel_id=null&city=kHHB7p3XZysb9H83n8gz&start_date=2022-11-21&end_date=2023-12-22&room_quantity=2&ppl_quantity=3&user_id=OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                if (err) return done(err);
                suite_assertion(err, res)
                done();
            })
    })
    
    it("Paris from 2023-21-11 to 2023-12-22", (done) => {
        chai.request(app)
            .get('/hotel/search?limit=10&hotel_id=null&city=a3gN4bdOKVEgpEjxi5nU&start_date=2023-11-21&end_date=2023-12-22&room_quantity=2&ppl_quantity=3&user_id=OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                if (err) return done(err);
                suite_assertion(err, res)
                done();
            })
    })
    
    it("Madrid from 2023-8-1 to 2023-9-22", (done) => {
        chai.request(app)
            .get('/hotel/search?limit=10&hotel_id=null&city=kHHB7p3XZysb9H83n8gz&start_date=2023-8-1&end_date=2023-9-22&room_quantity=2&ppl_quantity=3&user_id=OH1VsZ4ANuRc9JuEInjZmOCdpu82')
            .end((err, res) => {
                if (err) return done(err);
                suite_assertion(err, res)
                done();
            })
    })
})

describe("GET hotel/", () => {
    it("should response with an array", (done) => {
        chai.request(app)
            .get('/hotel')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                if (res.body.length > 0) {
                    res.body[0].should.have.property('city_id');
                    res.body[0].should.have.property('city_name');
                    res.body[0].should.have.property('country');
                }
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
                    hotel_properties(res.body)
                    done();
                })
        })
        
        it("get The Plaza info", (done) => {
            chai.request(app)
                .get('/hotel/J8dIeFClXeVpxCDSN9Aq')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    hotel_properties(res.body)
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
                    // console.log(res.body.rooms)
                    res.body.should.be.a('object');
                    hotel_properties(res.body)
                    done();
                })
        })
        
        it("get The Plaza info", (done) => {
            chai.request(app)
                .get('/hotel/J8dIeFClXeVpxCDSN9Aq?start_date=2023-11-20&end_date=2023-12-21')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    // console.log(res.body.rooms)
                    res.body.should.be.a('object');
                    hotel_properties(res.body)
                    done();
                })
        })
        
        it("get Princesa info", (done) => {
            chai.request(app)
                .get('/hotel/pyBVnR6CIuf6Jtla5Xar?start_date=2023-11-2&end_date=2023-12-21')
                .end((err, res) => {
                    if (err) return done(err);
                    res.should.have.status(200);
                    // console.log(res.body.rooms)
                    res.body.should.be.a('object');
                    hotel_properties(res.body)
                    done();
                })
        })
    })
})

describe("GET hotel/feedbacks/:id", () => {
    it("JW Marriott", (done) => {
        chai.request(app)
            .get('/hotel/feedbacks?hotel_id=MARDKwwXTzoC3ohydrRS')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    })
    
    it("The Plaza", (done) => {
        chai.request(app)
            .get('/hotel/feedbacks?hotel_id=J8dIeFClXeVpxCDSN9Aq')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    })
    
    it("Melia Madrid Princesa", (done) => {
        chai.request(app)
            .get('/hotel/feedbacks?hotel_id=pyBVnR6CIuf6Jtla5Xar')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                done();
            })
    })
})

describe("GET hotel/favourite", () => {
    it("user OEruAO7IVtPgdroSvlbNNP3IHaP2", (done) => {
        chai.request(app)
            .get('/hotel/favourite?user_id=OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                if (res.body.length > 0) {
                    res.body[0].should.have.property('hotel_id');
                }
                done();
            })
    })
    
    it("user dfX0Uo7liKTVmoPRXcqneg3PV273", (done) => {
        chai.request(app)
            .get('/hotel/favourite?user_id=dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                if (res.body.length > 0) {
                    res.body[0].should.have.property('hotel_id');
                }
                done();
            })
    })
    
    it("user OH1VsZ4ANuRc9JuEInjZmOCdpu82", (done) => {
        chai.request(app)
            .get('/hotel/favourite?user_id=OH1VsZ4ANuRc9JuEInjZmOCdpu82')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                if (res.body.length > 0) {
                    res.body[0].should.have.property('hotel_id');
                }
                done();
            })
    })
})

describe("GET hotel/suggest", () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
        if (res.body.length > 0) {
            hotel_properties(res.body[0])
            res.body[0].should.have.property('is_favorite');
        }
    }
    
    it("should send suggested hotels for user OEruAO7IVtPgdroSvlbNNP3IHaP2", (done) => {
        chai.request(app)
            .get('/hotel/suggest?user_id=OEruAO7IVtPgdroSvlbNNP3IHaP2')
            .end((err, res) => {
                if (err) return done(err);
                suite_assertion(err, res)
                done();
            })
    })
    
    it("should send suggested hotels for user OH1VsZ4ANuRc9JuEInjZmOCdpu82", (done) => {
        chai.request(app)
            .get('/hotel/suggest?user_id=OH1VsZ4ANuRc9JuEInjZmOCdpu82')
            .end((err, res) => {
                if (err) return done(err);
                suite_assertion(err, res)
                done();
            })
    })
    
    it("should send suggested hotels for user dfX0Uo7liKTVmoPRXcqneg3PV273", (done) => {
        chai.request(app)
            .get('/hotel/suggest?user_id=dfX0Uo7liKTVmoPRXcqneg3PV273')
            .end((err, res) => {
                if (err) return done(err);
                suite_assertion(err, res)
                res.body.should.be.a('array');
                done();
            })
    })
})
