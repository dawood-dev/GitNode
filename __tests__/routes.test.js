/*
    Tests for routes to ensure they return the expected status codes.
 */

const request = require('supertest');
const app = require('../app');

describe("GET authors and top authors", () => {

    let start = '2019-09-07';
    let end = '2020-09-02';
    let invalidEnd = '2020-09-xx';

    test('should be able to list all authors', async () => {
        const response = await request(app)
            .get('/users?start=' + start + '&end=' + end);
        expect(response.status).toBe(200);
    });

    test('should fail to list all authors', async () => {
        const response = await request(app)
            .get('/users?start=' + start + '&end=' + invalidEnd);
        expect(response.status).toBe(500);
    });

    test('should be able to list all top authors', async () => {
        const response = await request(app)
            .get('/most-frequent?start=' + start + '&end=' + end);
        expect(response.status).toBe(200);
    });

    test('should fail to list all top authors', async () => {
        const response = await request(app)
            .get('/most-frequent?start=' + start + '&end=' + invalidEnd);
        expect(response.status).toBe(500);
    });

});