const request = require('supertest');
const should = require('chai').should();
const app = require('../server.js');
const chai = require('chai');
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

const cities_properties = (body) => {
    body.should.have.property('country');
    body.should.have.property('name');
}

const restaurant_properties = (body) => {
    body.should.have.property('name');
    body.should.have.property('address');
    body.should.have.property('image');
    body.should.have.property('rating');
}

const todo_properties = (body) => {
    body.should.have.property('content');
    body.should.have.property('address');
    body.should.have.property('image');
    body.should.have.property('rating');
}

const transportation_properties = (body) => {
    body.should.have.property('content');
    body.should.have.property('address');
    body.should.have.property('image');
    body.should.have.property('rating');
}

const alert_properties = (body) => {
    body.should.have.property('content');
}

describe('GET cities/find/:id', () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
    }

    it('should return status code 200', (done) => {
        chai.request(app)
            .get('/cities/find/Z6YyrwkuyVbsyaLxOE7E')
            .end((err, res) => {
                suite_assertion(err, res);
                done();
            });
    });
});

describe("GET cities/find", () => {
    it("should response with an array", (done) => {
        chai.request(app)
            .get('/cities/find')
            .end((err, res) => {
                if (err) return done(err);
                res.should.have.status(200);
                res.body.should.be.a('array');
                if (res.body.length > 0) {
                    cities_properties(res.body[0]);
                }
                done();
            })
    })
});

describe("GET cities/restaurant/:id", () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
    }

    it('get restaurants in Hanoi', (done) => {
        chai.request(app)
            .get('/cities/restaurant/Z6YyrwkuyVbsyaLxOE7E')
            .end((err, res) => {
                suite_assertion(err, res);
                restaurant_properties(res.body[0])
                done();
            });
    });

    it('get restaurants in HCMC', (done) => {
        chai.request(app)
            .get('/cities/restaurant/8u8doWKXGkMc0gvXYA58')
            .end((err, res) => {
                suite_assertion(err, res);
                restaurant_properties(res.body[0])
                done();
            });
    });

    it('get restaurants in Paris', (done) => {
        chai.request(app)
            .get('/cities/restaurant/a3gN4bdOKVEgpEjxi5nU')
            .end((err, res) => {
                suite_assertion(err, res);
                restaurant_properties(res.body[0])
                done();
            });
    });
});

describe("GET cities/todo/:id", () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
    }

    it('get todos in Hanoi', (done) => {
        chai.request(app)
            .get('/cities/todo/Z6YyrwkuyVbsyaLxOE7E')
            .end((err, res) => {
                suite_assertion(err, res);
                todo_properties(res.body[0])
                done();
            });
    });

    it('get todos in HCMC', (done) => {
        chai.request(app)
            .get('/cities/todo/8u8doWKXGkMc0gvXYA58')
            .end((err, res) => {
                suite_assertion(err, res);
                todo_properties(res.body[0])
                done();
            });
    });

    it('get todos in Paris', (done) => {
        chai.request(app)
            .get('/cities/todo/a3gN4bdOKVEgpEjxi5nU')
            .end((err, res) => {
                suite_assertion(err, res);
                todo_properties(res.body[0])
                done();
            });
    });
});

describe("GET cities/transportation/:id", () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
    }

    it('get transportations in Hanoi', (done) => {
        chai.request(app)
            .get('/cities/transportation/Z6YyrwkuyVbsyaLxOE7E')
            .end((err, res) => {
                suite_assertion(err, res);
                transportation_properties(res.body[0])
                done();
            });
    });

    it('get transportations in HCMC', (done) => {
        chai.request(app)
            .get('/cities/transportation/8u8doWKXGkMc0gvXYA58')
            .end((err, res) => {
                suite_assertion(err, res);
                transportation_properties(res.body[0])
                done();
            });
    });

    it('get transportations in Paris', (done) => {
        chai.request(app)
            .get('/cities/transportation/a3gN4bdOKVEgpEjxi5nU')
            .end((err, res) => {
                suite_assertion(err, res);
                transportation_properties(res.body[0])
                done();
            });
    });
});


describe("GET cities/alert/:id", () => {
    const suite_assertion = (err, res) => {
        res.should.have.status(200);
    }

    it('get alerts in Hanoi', (done) => {
        chai.request(app)
            .get('/cities/alert/Z6YyrwkuyVbsyaLxOE7E')
            .end((err, res) => {
                suite_assertion(err, res);
                alert_properties(res.body[0])
                done();
            });
    });

    it('get alerts in HCMC', (done) => {
        chai.request(app)
            .get('/cities/alert/8u8doWKXGkMc0gvXYA58')
            .end((err, res) => {
                suite_assertion(err, res);
                alert_properties(res.body[0])
                done();
            });
    });

    it('get alerts in Paris', (done) => {
        chai.request(app)
            .get('/cities/alert/a3gN4bdOKVEgpEjxi5nU')
            .end((err, res) => {
                suite_assertion(err, res);
                alert_properties(res.body[0])
                done();
            });
    });
});