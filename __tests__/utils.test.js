/*
    Tests for the utilities with mock objects to ensure they return the correct objects.
 */

const commitUtils = require('../utils/commitUtils');
const dateUtils = require('../utils/dateUtils');

describe("Test all the utils", () => {

    test('commitUtils topAuthors test', () => {

        let mockCommits = require('../__mocks__/commits.json');
        let mockTopAuthors = require('../__mocks__/topAuthors.json');
        let authors = commitUtils.topAuthors(mockCommits);
        expect(authors.length).toBe(2);
        expect(authors).toStrictEqual(mockTopAuthors);

    });

    test('commitUtils isValidDate valid test', () => {
        let mockDate = '2020-12-12';
        let isValidDate = dateUtils.isValidDate(mockDate);
        expect(isValidDate).toBe(true);
    });

    test('commitUtils isValidDate invalid test', () => {
        let mockDate = '2020-12-xx';
        let isValidDate = dateUtils.isValidDate(mockDate);
        expect(isValidDate).toBe(false);
    });

});