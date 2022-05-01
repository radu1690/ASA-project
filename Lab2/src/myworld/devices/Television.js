const Observable =  require('../../utils/Observable')


class Television extends Observable {
    constructor (house, name) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('status', 'off') // observable  [on, off]
        this.power_consumption = 100; //non-observable
        
        
    }
    switchOnTelevision () {
        if(!this.isOn()){
            this.status = 'on'
            this.house.utilities.electricity.consumption += this.power_consumption;
            console.log(`${this.name} turned on`)
        }else{
            console.log(`${this.name} was already on`)
        }
    }
    switchOffTelevision () {
        if(this.isOn()){
            this.status = 'off'
            this.house.utilities.electricity.consumption -= this.power_consumption;
            // Include some messages logged on the console!
            console.log(`${this.name} turned off`)
        }else{
            console.log(`${this.name} was already off`)
        }
    }
    isOn(){
        return this.status == "on";
    }
}

module.exports = Television
