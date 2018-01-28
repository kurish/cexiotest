const request = require('request');
const q = require('q');

const coinmarketWorker = require('./workers/coinmarketWorker');
const cexioWorker = require('./workers/cexioWorker');
const priceWorker = require('./workers/priceWorker');

const logger = require('./workers/logger');
const config = require('./config');

let info = {
    btcUsdCoinmarket: 0,
    btcUsdCexio: 0,
    priceDiffPercentage: 0
};

//get/update coinmarket btc price
setInterval(() => {
    coinmarketWorker.getBitcoinCost().then((cost) => {
        setPrice(cost, 'btcUsdCoinmarket');
    }).catch(() => {
        console.log('Coinmarket error');
    });
}, config.coinmarketUpdate);

//update cexio btc price
cexioWorker.init();
cexioWorker.eventEmitter.on('newPrice', (cost) => {
    setPrice(cost, 'btcUsdCexio');
});

checkAndLog = () => {
    const percent = priceWorker.getPercent(info.btcUsdCexio, info.btcUsdCoinmarket);
    if (percent && (percent !== info.priceDiffPercentage)) {
        info.priceDiffPercentage = percent;
        logger.sendMessage(info.priceDiffPercentage);
    }
}

setPrice = (cost, market) => {
    try {
        if (cost && cost !== 0) {
            info[market] = cost;
            checkAndLog();
        }
    } catch (e) {
        return 'no such market';
    }
}

module.exports.setPrice = setPrice;
exports.info = info;

