exports.coinmarketUpdate = 1 * 1000;

exports.bitcoinCostURL = 'https://api.coinmarketcap.com/v1/ticker/bitcoin/?convert=USD';

exports.timeFormat = 'mm:ss';

exports.accuracy = 4;

exports.webSocketUrl = 'wss://ws.cex.io/ws/';
exports.webSocketSettings = {
    "e": "subscribe",
    "rooms": [
        "tickers"
    ] 
};

exports.crypto = 'BTC';
exports.currency = 'USD';

