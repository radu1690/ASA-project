const Clock = require('../../utils/Clock');
const Observable =  require('../../utils/Observable');
const WashingDevice = require('./WashingDevice');


class WashingMachine extends WashingDevice {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = 600; //non-observable
        
    }
    
}

module.exports = WashingMachine
