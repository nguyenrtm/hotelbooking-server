const request = require('supertest');
const app = require('../server.js');
var expect = require('chai').expect;

describe('GET cities/find', () => {
    it('responds with json', async function() {
        const response = await request(app)
            .get('/cities/find')
            .set('Accept', 'application/json');
        expect(response.status).equal(200);
    });
});

describe("GET cities/find/:id", () => {
    it("should respond with a 200 status code", async function() {
        const response = await request(app)
            .get('/cities/find/nw2udhrsvdQGsXSgOO43')
            .set('Accept', 'application/json');
        expect(response.status).equal(200);
    });
});

describe("GET cities/restaurant/:id", () => {
    it("should respond with a 200 status code", async function() {
        const response = await request(app)
            .get('/cities/restaurant/nw2udhrsvdQGsXSgOO43')
            .set('Accept', 'application/json');
        expect(response.status).equal(200);
    });
});

describe("GET cities/todo/:id", () => {
    it("should respond with a 200 status code", async function() {
        const response = await request(app)
            .get('/cities/todo/nw2udhrsvdQGsXSgOO43')
            .set('Accept', 'application/json');
        expect(response.status).equal(200);
    });
});

describe("GET cities/transportation/:id", () => {
    it("should respond with a 200 status code", async function() {
        const response = await request(app)
            .get('/cities/transportation/nw2udhrsvdQGsXSgOO43')
            .set('Accept', 'application/json');
        expect(response.status).equal(200);
    });
});

describe("GET cities/alert/:id", () => {
    it("should respond with a 200 status code", async function() {
        const response = await request(app)
            .get('/cities/alert/nw2udhrsvdQGsXSgOO43')
            .set('Accept', 'application/json');
        expect(response.status).equal(200);
    });
});

describe ("GET user", () => {
    it("should respond with a 200 status code", async function() {
        const response = await request(app)
            .get('/user')
            .set('Accept', 'application/json');
        expect(response.status).equal(200);
    });
});

describe ("GET user/:id", () => {
    it("should respond with a 200 status code", async function() {
        const response = await request(app)
            .get('/user/dfX0Uo7liKTVmoPRXcqneg3PV273')
            .set('Accept', 'application/json');
        expect(response.status).equal(200);
    });
});


describe ("POST user/:id", () => {
    it("should respond with a 200 status code", async function() {
        const response = await request(app)
            .post('/user/dfX0Uo7liKTVmoPRXcqneg3PV273')
            .set('Accept', 'application/json');
        expect(response.status).equal(200);
    });
});