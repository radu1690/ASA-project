const Observable =  require('../../utils/Observable');
const { Power } = require('../data');
const Device = require('./Device');


class Fridge extends Device {
    /** @type {Number} */
    supplies;
    constructor (house, name) {
        super(house, name)
        this.set('supplies', 100) // observable
        this.power_consumption = Power.FRIDGE; 
    }

    
    addSupplies (percent) {    
        this.supplies += percent;
        if(this.supplies > 100){
            this.supplies = 100;
        }
        console.log(`${this.name} added ${percent}% supplies (total is ${this.supplies}%`)
    }
    removeSupplies (percent) {
        this.supplies -= percent;
        if(this.supplies < 0){
            this.supplies = 0;
        }
        console.log(`${this.name} removed ${percent}% supplies (total is ${this.supplies}%`)
    }
    
    
}

module.exports = Fridge
