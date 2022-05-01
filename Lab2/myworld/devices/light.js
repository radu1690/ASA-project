const Observable =  require('../../utils/Observable')


class Light extends Observable {
    constructor (house, name, number_of_lights) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('status', 'off') // observable
        this.power_consumption = 15 * number_of_lights; //non-observable
        
        
    }
    switchOnLight () {
        this.status = 'on'
        this.house.utilities.electricity.consumption += this.power_consumption;
        // Include some messages logged on the console!
        console.log(`${this.room.name} light turned on`)
    }
    switchOffLight () {
        this.status = 'off'
        this.house.utilities.electricity.consumption -= this.power_consumption;
        // Include some messages logged on the console!
        console.log(`${this.room.name} light turned off`)
    }
}

module.exports = Light
