const moment = require('moment');
const config = require('../config');

module.exports.sendMessage = (priceDiffPercentage) => {
    console.log(`New percentage: ${priceDiffPercentage}%, ${moment().utc().format(config.timeFormat)}`);
}