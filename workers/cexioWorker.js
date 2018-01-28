const WebSocket = require('ws');

const config = require('../config');
const ws = new WebSocket(config.webSocketUrl);

const EM = require('events');
let eventEmitter = new EM();

init = () => {
    try {
        ws.on('open', () => {
            ws.send(JSON.stringify(config.webSocketSettings));
        });
        ws.on('message', (data) => {
            const tickData = JSON.parse(data);
            if (tickData && tickData.data) {
                checkData(tickData.data);
            }
        });
    } catch (e) {
        console.log('webSocket error: ', e);
    }

}

checkData = (data) => {
    try {
        if (data.symbol1 === config.crypto && data.symbol1 === config.currency) {
            eventEmitter.emit('newPrice', data.price);
        }
    } catch (e) {
        console.log('check cexio data error: ', e);
    }
}


module.exports.init = init;
module.exports.eventEmitter = eventEmitter;
