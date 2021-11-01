/*
    Connects to the Github API service and returns the response to the controllers.
    Github API uses pagination therefore calls are send as long as there are new pages
     available for the given date range. Results are merged into one JSON object.
 */
const request = require("request-promise");
const dateUtils = require("../utils/dateUtils");

const githubService = async function(githubAPI){

    try {
        if (!dateUtils.isValidDate(githubAPI.start) || !dateUtils.isValidDate(githubAPI.end))
            throw new Error('INTERNAL SERVER ERROR');

        let response = '', lastPage = false, firstPage = true;
        while (!lastPage) {
            let resp = await request(githubAPI.options, function (error) {
                if (error) throw new Error(error);
            });
            lastPage = resp.toString().length < 5;
            if (firstPage) response = resp;
            else response = lastPage ? response : response.toString().substring(0, response.length - 1)
                + ',' + resp.toString().substring(1);
            firstPage = false;
            githubAPI.page++;
        }
        return JSON.parse(response)
    }
    catch (error) {
        return JSON.parse({message: error.message});
    }

}

module.exports = githubService;