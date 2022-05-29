const Device = require('./Device');

class Television extends Device {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = 100;
          
    }
}

module.exports = Television
