/*
    Configuration for the Github API service.
 */
class GithubAPI {
    constructor(start, end, page) {
        this._start = start;
        this._end = end;
        this._page = page;
    }

    get options() {
        return {
            'method': 'GET',
            'url': 'https://api.github.com/repos/teradici/deploy/commits?since='
                + this.start + '&until=' + this.end + '&per_page=100&page=' + this.page,
            headers: {
                'user-agent': 'node.js'
            }
        }
    }

    get start() {
        return this._start
    }

    get end() {
        return this._end
    }

    get page() {
        return this._page
    }

    set start(start) {
        this._start = start
    }

    set end(end) {
        this._end = end
    }

    set page(page) {
        this._page = page
    }
}

module.exports = GithubAPI;