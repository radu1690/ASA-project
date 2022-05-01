const Observable =  require('../../utils/Observable')


class Oven extends Observable {
    constructor (house, name) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('status', 'off') // observable
        this.power_consumption = 1600; //non-observable
        
        
    }
    switchOnOven () {
        if(this.status == 'off'){
            this.house.utilities.electricity.consumption += this.power_consumption;
        }
        this.status = 'on'
        // Include some messages logged on the console!
        console.log(`${this.name} turned on`)
    }
    switchOffOven () {
        if(this.status == 'on'){
            this.house.utilities.electricity.consumption -= this.power_consumption;
        }
        this.status = 'off'
        // Include some messages logged on the console!
        console.log(`${this.name} turned off`)
    }
}

module.exports = Oven
