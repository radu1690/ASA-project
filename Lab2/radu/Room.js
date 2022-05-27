const Observable =  require('../utils/Observable')


class Room extends Observable {
    constructor (house, name, devices, doors_to, connected_to) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('sun_illumination', 'low') // observable  [low, normal, high]
        this.devices = devices //non-observable
        this.doors_to = doors_to;//reachable rooms through doors
        this.connected_to = connected_to;//reachable rooms without doors
        this.set('people_inside', 0);//observable, keeps track of people inside
    }
    setIlluminationLow(){
        this.sun_illumination = 'low';
        console.log(`${this.name}'s sun illumination is low`);
    }
    setIlluminationNormal(){
        this.sun_illumination = 'normal';
        console.log(`${this.name}'s sun illumination is normal`);
    }
    setIlluminationHigh(){
        this.sun_illumination = 'high';
        console.log(`${this.name}'s sun illumination is high`);
    }
}



module.exports = Room
