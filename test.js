// test.js
const chai = require('chai');
const assert = chai.assert;

describe('files', function () {
    describe('export', function () {
        it('should export pdf', async function () {
            assert.isTrue(true);
        });

        it('should export html', async function () {
            assert.isTrue(true);
        });

        it('should export yml', async function () {
            assert.isTrue(true);
        });

        it('should export text', async function () {
            throw new Error('An exception occurred');
        });
    });

    // [..]
});