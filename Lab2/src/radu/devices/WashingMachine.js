const Clock = require('../../utils/Clock');
const Observable =  require('../../utils/Observable');
const { Power } = require('../data');
const WashingDevice = require('./WashingDevice');


class WashingMachine extends WashingDevice {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = Power.WASHINGMACHINE; //non-observable
        
    }
    
}

module.exports = WashingMachine
