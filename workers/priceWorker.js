const config = require('../config');

getPercent = (cex, coinmarket) => {
    if (cex == 0 || coinmarket == 0) {
        return null;
    }
    let coinmarketPercent = 0;
    coinmarketPercent = (coinmarket*100/cex - 100).toFixed(config.accuracy);
    return coinmarketPercent;
}

module.exports.getPercent = getPercent;