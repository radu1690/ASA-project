const Clock = require('../../utils/Clock');
const Observable =  require('../../utils/Observable')


class Washing_machine extends Observable {
    constructor (house, name) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        //status: [off, washing, finished, paused]
        this.set('status', 'off') // observable 
        //filling: [empty, half, half_full, full]
        this.set('filling', 'empty')
        this.power_consumption = 600; //non-observable
        this.consuming = false;
        // this.time_remaining = {
        //     hh : 2,
        //     mm : 0
        // }
        
    }
    startWashing (washing_time = {hh: 2, mm:0}) {
        this.status = 'washing'
        this.updateConsumption(true);
        this.time_remaining = washing_time;
        // Include some messages logged on the console!
        this.wash();
        console.log(`${this.name} started washing cycle`);
    }

    pause () {
        this.status = 'paused'
        this.updateConsumption(false);
        // Include some messages logged on the console!
        this.stopWashing();
        console.log(`${this.name} paused`)
    }
    resume () {
        this.status = 'washing'
        this.updateConsumption(true);
        // Include some messages logged on the console!
        this.wash();
        console.log(`${this.name} resumed washing cycle`)
        
    }
    finish () {
        this.status = 'finished'
        this.updateConsumption(false);
        // Include some messages logged on the console!
        this.stopWashing();
        console.log(`${this.name} finished`)
    }
    switchOff () {
        this.status = 'off'
        this.updateConsumption(false);
        this.filling = 'empty';
        // Include some messages logged on the console!
        this.stopWashing();
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

    increaseFilling(){
        if(this.filling == 'empty'){
            this.filling = 'half';
        }else if(this.filling == 'half'){
            this.filling = 'half_full';
        }else if(this.filling == 'half_full'){
            this.filling = 'full';
        }
    }

    computeTime(){
        if(this.time_remaining.mm > 0){
            this.time_remaining.mm = this.time_remaining.mm - 15 ;
        }else{
            if(this.time_remaining.hh != 0){
                this.time_remaining.hh = this.time_remaining.hh - 1;
                this.time_remaining.mm = 45;
            }
        }
    }
    
    wash(){
        Clock.global.observe('mm',() => {
            this.computeTime();
            //console.log(this.time_remaining.hh + " - " + this.time_remaining.mm)
            
            if (this.time_remaining.hh == 0 && this.time_remaining.mm == 0) {
                this.finish();
                this.switchOff();
            }
        }, 'washing_cycle')
    }

    stopWashing(){
        Clock.global.unobserve('mm', null, 'washing_cycle');
    }
}

module.exports = Washing_machine
