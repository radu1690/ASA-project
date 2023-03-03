const { Power } = require('../utils/data');
const Device = require('./Device');


class Oven extends Device {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = Power.OVEN;
        
        
    }
}

module.exports = Oven
