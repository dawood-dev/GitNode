/*
    This controller returns data cached by Redis if the query parameters match. Otherwise
    it receives the data returned by the Github service and uses the User model to create
    an array of User objects. The controllers sends the response to the router.
 */
const redis = require("redis");
const githubService = require('../services/githubService')
const GithubAPI = require('../config/githubAPI')
const User = require ('../models/user')

const REDIS_PORT = 6379
// This is the url for containerized deployment.
//const REDIS_URL = 'redis';
// This is the url for local development and testing.
const REDIS_URL = 'localhost';


const getUsers = async (req, res, next) => {
        let client = redis.createClient(REDIS_PORT,REDIS_URL);
        client.get('authors' + req.query.start + req.query.end, async (err, authors) => {
            try {
                if (err) {
                    err = new Error('INTERNAL SERVER ERROR');
                    throw err;
                }

                if (authors) {
                    client.quit();
                    res.status(200).send(JSON.parse(authors));
                } else {
                    let githubAPI = new GithubAPI(req.query.start, req.query.end, 1)
                    let jsonRes = await githubService(githubAPI)
                    // Creating an array of User objects
                    const authors = jsonRes.map((commit, i) => {
                        let user =  Object.create(User);
                        user.name = jsonRes[i].commit.author.name;
                        user.email = jsonRes[i].commit.author.email;
                        return user
                    });
                    // Sending data to Redis with a key
                    client.setex('authors' + req.query.start + req.query.end, 2 * 60 * 1000, JSON.stringify(authors));
                    client.quit();
                    res.status(200).send(authors);

                    /*
                        Below are a few other ways to access the author and email properties to
                        create an array of User objects.
                     */
                    //let authRes = [];
                    /*JSON.parse(response, function (key, value ) {
                        if (key === 'name') authRes.push({'name': value});
                            else if (key === 'email')
                                authRes.push({'email': value});
                    });*/

                    /*for (let i = 0; i< jsonRes.length; i++){
                        authRes.push({'name': jsonRes[i].commit.author.name,
                            'email': jsonRes[i].commit.author.email});
                    }*/

                    //res.send(authRes);

                    /*jsonRes
                    //.reduce((acc, commit) => (authRes.push({'commit': commit})), {});
                    .forEach(function(commit, i) {
                                    authRes.push({'name': jsonRes[i].commit.author.name,
                                        'email': jsonRes[i].commit.author.email});
                    });
                    //res.send(jsonRes);*/
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