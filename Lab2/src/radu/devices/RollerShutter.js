const Observable =  require('../../utils/Observable');
const { Shutter } = require('../data');


class RollerShutter extends Observable {
    constructor (house, name) {
        super();
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('position', Shutter.UP) // observable
        
    }
    setUp () {
        this.position = Shutter.UP
        // Include some messages logged on the console!
        console.log(`${this.name} set up`)
    }
    setHalf () {
        this.position = Shutter.HALF
        // Include some messages logged on the console!
        console.log(`${this.name} set half`)
    }
    setDown () {
        this.position = Shutter.DOWN
        // Include some messages logged on the console!
        console.log(`${this.name} set down`)
    }
}

module.exports = RollerShutter