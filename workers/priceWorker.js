const config = require('../config');

getPercent = (cex, coinmarket) => {
    try {
        if (cex == 0 || coinmarket == 0 || isNaN(cex) || isNaN(coinmarket)) {
            return null;
        }
        let coinmarketPercent = 0;
        coinmarketPercent = (coinmarket * 100 / cex - 100).toFixed(config.accuracy);
        return coinmarketPercent;
    } catch (e) {
        return null;
    }
}

module.exports.getPercent = getPercent;