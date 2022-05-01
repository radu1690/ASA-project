const Observable =  require('../../utils/Observable')


class RollerShutter extends Observable {
    constructor (house, name) {
        super();
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('status', 'up') // observable
        
    }
    setUp () {
        this.status = 'up'
        // Include some messages logged on the console!
        console.log(`${this.name} set up`)
    }
    setHalf () {
        this.status = 'half'
        // Include some messages logged on the console!
        console.log(`${this.name} set half`)
    }
    setDown () {
        this.status = 'down'
        // Include some messages logged on the console!
        console.log(`${this.name} set down`)
    }
}

module.exports = RollerShutter