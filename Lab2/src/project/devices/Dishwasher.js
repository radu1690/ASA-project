const WashingDevice = require('./WashingDevice');
const { Power } = require('../utils/data');

class Dishwasher extends WashingDevice {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = Power.DISHWASHER; //non-observable    
    }
}

module.exports = Dishwasher
