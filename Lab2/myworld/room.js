const Observable =  require('../utils/Observable')


class Room extends Observable {
    constructor (house, name, devices, doors_to, connected_to) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('illumination', 'normal') // observable  [low, normal, high]
        this.devices = devices //non-observable
        this.doors_to = doors_to;
        this.connected_to = connected_to;
    }
}

module.exports = Room
