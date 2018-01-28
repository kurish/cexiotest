const request = require('request');
const q = require('q');

const priceWorker = require('./priceWorker');
const config = require('../config');

getBitcoinCost = () => {
    var defer = q.defer();
    request(config.bitcoinCostURL, function(error, response, body) {
        if (error) {
            console.log('Coinmarket error: request are failed. ');
            return defer.reject();
        }
        try {
            let info = JSON.parse(body);
            if (info[0] && info[0].price_usd) {
                return defer.resolve(info[0].price_usd);
            }
            return defer.reject();
        } catch (e) {
            console.log('getBitcoinCost error: error with parsing JSON response.');
            return defer.reject();
        }
    });
    return defer.promise;
};

module.exports.getBitcoinCost = getBitcoinCost;
