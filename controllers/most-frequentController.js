/*
    This controller returns data cached by Redis if the query parameters match. Otherwise
    it receives the data returned by the Github service and uses the commit utility to
    identify the top 5 authors. The controllers sends the response to the router.
 */
const redis = require("redis");
const GithubAPI = require('../config/githubAPI')
const githubService = require("../services/githubService");
const commitUtils = require("../utils/commitUtils");

const REDIS_PORT = 6379;
// This is the url for containerized deployment.
//const REDIS_URL = 'redis';
// This is the url for local development and testing.
const REDIS_URL = 'localhost';

const getUsers = (req, res, next) => {
    let client = redis.createClient(REDIS_PORT,REDIS_URL);
    client.get('topAuthors' + req.query.start + req.query.end, async (err, authors) => {
        try {
            if (err) {
                err = new Error('INTERNAL SERVER ERROR');
                throw err;
            }

            if (authors) {
                client.quit();
                res.status(200).send(JSON.parse(authors));
            } else {
                let githubAPI = new GithubAPI(req.query.start, req.query.end, 1);
                let jsonRes = await githubService(githubAPI);
                // Sending data to Redis with a key
                client.setex('topAuthors' + req.query.start + req.query.end, 2 * 60 * 1000,
                    JSON.stringify(commitUtils.topAuthors(jsonRes)));
                client.quit();
                res.status(200).send(commitUtils.topAuthors(jsonRes));
            }
        } catch (err) {
            client.quit();
            // For development purposes.
            //res.render('error', {error:{message: err.message, status: err.statusCode, stack: err.stack}});
            res.status(500).send('INTERNAL SERVER ERROR');
        }
    });
}

module.exports =
    {
        getUsers
    };