const Device = require('./Device');

class Speaker extends Device {
    constructor (house, name) {
        super(house, name)
        this.power_consumption = 10; //non-observable
    }
    
    notify(message){
        console.log(`${this.name} notification: ${message}`);
    }
}

module.exports = Speaker
