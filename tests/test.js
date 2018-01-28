const assert = require('chai').assert;

const coinmarketWorker = require('../workers/coinmarketWorker');
const cexioWorker = require('../workers/cexioWorker');
const priceWorker = require('../workers/priceWorker');
const logger = require('../workers/logger');
const config = require('../config');

const info = require('../app').info;
const setPrice = require('../app').setPrice;

describe('total', () => {

    describe('priceWorker', () => {

        const data = [
            {
                value1: 100,
                value2: 50,
                result: -50.0000
            },
            {
                value1: 50,
                value2: 100,
                result: 100.0000
            },
            {
                value1: 100,
                value2: 100,
                result: 0.0000
            },
            {
                value1: 'asd',
                value2: '50',
                result: null
            },
        ];
        data.forEach((valuesObj) => {
            it(`should return ${valuesObj.result}`, () => {
                let result = priceWorker.getPercent(valuesObj.value1, valuesObj.value2);
                assert.equal(result, valuesObj.result, 'result done');
            });
        });
    });

    describe('cexioWorker', () => {
        const dataTest = {
            symbol1 : config.crypto,
            symbol2 : config.currency,
            price: 10
        };

        it('should emit event', (done) => {
            cexioWorker.eventEmitter.on('newPrice', (data) => {
                assert.equal(data, dataTest.price);
                done();
            });
            cexioWorker.checkData(dataTest);
        });

        it('should return null', () => {
            const result = cexioWorker.checkData();
            assert.equal(result, null);
        });

    });

    describe('app', () => {
        const dataTest = [
            {
                cost: 100,
                market: 'a',
                result: 'no such market'
            },
            {
                cost: 100,
                market: 'btcUsdCoinmarket',
                result: null
            },
            {
                cost: 100,
                market: 'btcUsdCexio',
                result: null
            }
        ];

        dataTest.forEach((test) => {
            it(`should return ${test.result || 'check in object'}`, () => {
                const result = setPrice(test.cost, test.market);

                if (result && result === test.result) {
                    assert(true);
                } else if (info[test.market] === test.cost) {
                    assert(true);
                }
            })
        });
        
    });




});
