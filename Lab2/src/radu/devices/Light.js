const Observable =  require('../../utils/Observable');
const Device = require('./Device');


class Light extends Device {
    constructor (house, name, number_of_lights) {
        super(house, name)
        this.power_consumption = 15 * number_of_lights; //non-observable
    }
}

module.exports = Light
