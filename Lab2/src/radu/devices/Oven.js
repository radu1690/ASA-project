const Observable =  require('../../utils/Observable');
const Device = require('./Device');


class Oven extends Device {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = 1600;
        
        
    }
}

module.exports = Oven
