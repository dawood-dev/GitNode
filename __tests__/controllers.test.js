/*
    Tests for the controllers with mock objects.
 */
const httpMocks = require('node-mocks-http');
const usersController = require('../controllers/usersController');
const mostFrequentController = require('../controllers/most-frequentController');

describe("Test all the controllers", () => {

    test('usersController test', async () => {

        let req = httpMocks.createRequest({
            method: 'GET',
            url: 'https://api.github.com/repos/teradici/deploy/commits?since=2019-12-07&until=2020-01-09&per_page=100&page=1',
            query: {
                start: '2019-12-07',
                end: '2020-01-09'
            }
        });
        let res = httpMocks.createResponse();
        await usersController.getUsers(req, res, 'next')
        expect(res.statusCode).toBe(200);

    });

    test('most-frequentController test', async () => {

        let req = httpMocks.createRequest({
            method: 'GET',
            url: 'https://api.github.com/repos/teradici/deploy/commits?since=2019-12-07&until=2020-01-09&per_page=100&page=1',
            query: {
                start: '2019-12-07',
                end: '2020-01-09'
            }
        });
        let res = httpMocks.createResponse();
        await mostFrequentController.getUsers(req, res, 'next')
        expect(res.statusCode).toBe(200);

    });

});