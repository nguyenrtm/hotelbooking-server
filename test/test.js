const request = require('supertest');
const app = require('../server.js');
var expect = require('chai').expect;

describe('GET /readHotel/:id', function() {
    it('should respond with 200 status code', async function() {
        const response = await request(app)
            .get('/hotel/readHotel/0001')
            .set('Accept', 'application/json');
        expect(response.body.name).equal('Sofitel Legend Metropole Hanoi');
        expect(response.status).equal(200);
    });
});

describe("POST /feedback", () => {
    describe("given a feedback", () => {
        it("should respond with a 200 status code", async function() {
            const response = await request(app)
                .post('/hotel/createFeedback')
                .send({
                    hotelId: "0001",
                    feedbackId: "0004",
                    name: "Nguyen Binh Nguyen", 
                    feedback: "Feedback Test",
                    month: "May",
                    year: "2021"
                })
            expect(response.status).equal(200);
        });
    });
});