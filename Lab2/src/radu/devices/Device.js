const Observable =  require('../../utils/Observable');
const { Status } = require('../utils/data');
const House = require('../house/House');

class Device extends Observable {
    /**@type {House} */
    house;
    /**@type {String} */
    name;
    /**@type {Number} */
    power_consumption;

    /**
     * 
     * @param {House} house 
     * @param {String} name 
     */
    constructor (house, name) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('status', Status.OFF) // observable  [on, off]
        this.power_consumption = 0; //non-observable
        
    }

    /**
     * Turns on the device.
     * @returns 
     */
    switchOn () {
        if(!this.isOn()){
            this.status = Status.ON
            this.house.utilities.electricity.consumption += this.power_consumption;
            console.log(`${this.name} turned on`);
            return true;
        }else{
            console.log(`${this.name} was already on`);
            return false;
        }
    }

    /**
     * Turns off the device.
     */
    switchOff () {
        if(this.isOn()){
            this.status = Status.OFF
            this.house.utilities.electricity.consumption -= this.power_consumption;
            // Include some messages logged on the console!
            console.log(`${this.name} turned off`);
            return true;
        }else{
            console.log(`${this.name} was already off`);
            return false;
        }
    }
    
    isOn(){
        return this.status == Status.ON;
    }
}

module.exports = Device
