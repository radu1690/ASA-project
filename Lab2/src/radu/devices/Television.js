const { Power } = require('../utils/data');
const Device = require('./Device');

class Television extends Device {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = Power.TELEVISION;
          
    }
}

module.exports = Television
