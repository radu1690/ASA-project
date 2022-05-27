const Observable =  require('../../utils/Observable')


class Speaker extends Observable {
    constructor (house, name) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('status', 'off') // observable
    }
    switchOnSpeaker () {
        this.status = 'on'
        // Include some messages logged on the console!
        console.log(`${this.name} turned on`)
    }
    switchOffSpeaker () {
        this.status = 'off'
        // Include some messages logged on the console!
        console.log(`${this.name} turned off`)
    }
    notify(message){
        console.log(`${this.name} notification: ${message}`);
    }
}

module.exports = Speaker
