/*
    This utility takes a JSON object that has author names and uses a hashmap
    to create a key value pair of name and frequencies in which the names appear.
    The map is used to create an array of TopAuthor objects. After sorting this array
    based on number of commits the top 5 are sent back.
 */
const TopAuthor = require("../models/topAuthors");

module.exports =
    {
        topAuthors:
            function topAuthors(authors) {
                let topAuthorsMap = new Map();
                authors.map((commit, i) => {
                    if (topAuthorsMap.has(authors[i].commit.author.name))
                        topAuthorsMap.set(authors[i].commit.author.name,
                            topAuthorsMap.get(authors[i].commit.author.name) + 1)
                    else topAuthorsMap.set(authors[i].commit.author.name, 1)
                });

                let freq = []
                // Creates an array of TopAuthor objects.
                topAuthorsMap.forEach((value, key) => {
                    let topAuthor =  Object.create(TopAuthor);
                    topAuthor.name = key;
                    topAuthor.commits = value;
                    freq.push(topAuthor);
                });

                return freq.sort((a, b) => (a.commits < b.commits) ? 1 : -1).slice(0, 5);
            }
    };