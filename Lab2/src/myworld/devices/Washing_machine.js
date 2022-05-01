const Observable =  require('../../utils/Observable')


class Washing_machine extends Observable {
    constructor (house, name) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        //status: [off, washing, finished, paused]
        this.set('status', 'off') // observable 
        //capacity: [empty, half, half_full, full]
        this.set('capacity', 'empty')
        this.power_consumption = 600; //non-observable
        this.consuming = false;
        
    }
    startWashing () {
        this.status = 'washing'
        this.updateConsumption(true);
        // Include some messages logged on the console!
        console.log(`${this.name} started washing cycle`)
    }
    pause () {
        this.status = 'paused'
        this.updateConsumption(false);
        // Include some messages logged on the console!
        console.log(`${this.name} paused`)
    }
    resume () {
        this.status = 'washing'
        this.updateConsumption(true);
        // Include some messages logged on the console!
        console.log(`${this.name} resumed washing cycle`)
    }
    finish () {
        this.status = 'finished'
        this.updateConsumption(false);
        // Include some messages logged on the console!
        console.log(`${this.name} finished`)
    }
    switchOff () {
        this.status = 'off'
        this.updateConsumption(false);
        this.capacity = 'empty';
        // Include some messages logged on the console!
        console.log(`${this.name} switched off`)
    }
    //updates the power consumption of the house according to the state of the washing machine
    //consuming: washing
    //not consuming: off, finished, paused
    updateConsumption(switchingOn){
        let previuous_consuming = this.consuming;
        if(switchingOn){
            if(!previuous_consuming){
                this.consuming = true;
                this.house.utilities.electricity.consumption += this.power_consumption;
            }
        }else{
            if(previuous_consuming){
                this.consuming = false;
                this.house.utilities.electricity.consumption -= this.power_consumption;
            }
        }
    }
}

module.exports = Washing_machine
