const Observable =  require('../../utils/Observable')
const Clock = require('../../utils/Clock');
const WashingDevice = require('./WashingDevice');

class Dishwasher extends WashingDevice {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = 1300; //non-observable    
    }
}

module.exports = Dishwasher
