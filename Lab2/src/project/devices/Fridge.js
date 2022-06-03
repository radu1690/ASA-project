const { Power } = require('../utils/data');
const Device = require('./Device');


class Fridge extends Device {
    
    constructor (house, name) {
        super(house, name)
        this.set('supplies', 100) // observable
        this.power_consumption = Power.FRIDGE; 
    }

    
    addSupplies (percent) {
        if(this.supplies + percent > 100){
            this.supplies = 100;
        }else{
            this.supplies += percent;
        }
        console.log(`${this.name} added ${percent}% supplies (remaining is ${this.supplies}%)`)
    }
    removeSupplies (percent) {
        if(this.supplies - percent < 0){
            this.supplies = 0;
        }else{
            this.supplies -= percent;
        }
        console.log(`${this.name} removed ${percent}% supplies (remaining is ${this.supplies}%)`)
    }
    
    
}

module.exports = Fridge
