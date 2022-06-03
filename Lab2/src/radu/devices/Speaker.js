const { Power, Status } = require('../data');
const Device = require('./Device');

class Speaker extends Device {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = Power.SPEAKER; //non-observable
    }
    
    notify(message){
        if(this.status == Status.ON){
            console.log(`${this.name} notification: ${message}`);
        }
        
    }
}

module.exports = Speaker
