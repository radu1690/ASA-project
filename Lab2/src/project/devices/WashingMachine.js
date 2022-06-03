const { Power } = require('../utils/data');
const WashingDevice = require('./WashingDevice');


class WashingMachine extends WashingDevice {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = Power.WASHINGMACHINE; //non-observable
        
    }
    
}

module.exports = WashingMachine
