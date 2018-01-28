const request = require('request');
const q = require('q');

const coinmarketWorker = require('./workers/coinmarketWorker');
const cexioWorker = require('./workers/cexioWorker');
const priceWorker = require('./workers/priceWorker');

const logger = require('./workers/logger');
const config = require('./config');

let btcUsdCoinmarket = 0;
let btcUsdCexio = 0;

let priceDiffPercentage = 0;

//get/update coinmarket btc price
setInterval(() => {
    coinmarketWorker.getBitcoinCost().then((cost) => {
        if (cost && cost !== 0) {
            btcUsdCoinmarket = cost;
            checkAndLog();
        }
    }).catch(() => {
        console.log('Coinmarket error');
    });
}, config.coinmarketUpdate);

//update cexio btc price
cexioWorker.init();
cexioWorker.eventEmitter.on('newPrice', (price) => {
    if (price && price !== 0) {
        btcUsdCexio = price;
        checkAndLog();
    }
});

checkAndLog = () => {
    const percent = priceWorker.getPercent(btcUsdCexio, btcUsdCoinmarket);
    if (percent && (percent !== priceDiffPercentage)) {
        priceDiffPercentage = percent;
        logger.sendMessage(priceDiffPercentage);
    }
}
