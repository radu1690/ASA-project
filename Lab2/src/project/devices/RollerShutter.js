const Observable =  require('../../utils/Observable');
const { Shutter } = require('../utils/data');


class RollerShutter extends Observable {
    constructor (house, name) {
        super();
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('position', Shutter.DOWN) // observable
        
    }
    setUp () {
        this.position = Shutter.UP
        console.log(`${this.name} set up`)
    }
    setHalf () {
        this.position = Shutter.HALF
        console.log(`${this.name} set half`)
    }
    setDown () {
        this.position = Shutter.DOWN
        console.log(`${this.name} set down`)
    }
}

module.exports = RollerShutter