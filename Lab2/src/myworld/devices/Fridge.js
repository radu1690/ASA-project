const Observable =  require('../../utils/Observable')


class Fridge extends Observable {
    constructor (house, name) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('supplies', 100) // observable
        this.power_consumption = 130; //non-observable
        this.set('status', 'off')
        
        
    }
    addSupplies (percent) {
        if(this.supplies + percent > 100){
            console.log(`${this.name}: Failed to add ${percent}% supplies (current supplies are ${this.supplies})`)
            return;
        }
        this.supplies += percent;
        // Include some messages logged on the console!
        console.log(`${this.name} added ${percent}% supplies (total is ${this.supplies}%`)
    }
    removeSupplies (percent) {
        if(this.supplies - percent < 0){
            console.log(`${this.name}: Failed to remove ${percent}% supplies (current supplies are ${this.supplies})`)
            return;
        }
        this.supplies -= percent;
        // Include some messages logged on the console!
        console.log(`${this.name} removed ${percent}% supplies (total is ${this.supplies}%`)
    }
    switchFridgeOn(){
        if(this.status == 'off'){
            this.house.utilities.electricity.consumption += this.power_consumption;
        }
        console.log(`${this.name} switched on`)
    }

    switchFridgeOff(){
        if(this.status == 'on'){
            this.house.power_consumption -= this.power_consumption;
        }
        console.log(`${this.name} switched off`)
    }
}

module.exports = Fridge
