const Clock = require('../../utils/Clock');
const Observable =  require('../../utils/Observable');
const { Filling, Status, WashingStatus } = require('../utils/data');
const House = require('../house/House');

/**
 * @typedef {{ hh: number, mm: number }} Time
 */

class WashingDevice extends Observable {

    /**@type {House} */
    house;
    /**@type {String} */
    name;
    /**@type {Boolean} */
    consuming;

    /**
     * 
     * @param {House} house 
     * @param {String} name 
     */
    constructor (house, name) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        //status: [off, washing, finished, paused]
        this.set('status', WashingStatus.OFF) // observable 
        //filling: [empty, half, half_full, full]
        this.set('filling', Filling.EMPTY)
        this.power_consumption = 0; //non-observable
        this.consuming = false;
    }

    /**
     * Starts a washing cycle which will automatically finish after the given time.
     * The default time is 2 hours.
     * @param {Time} washing_time 
     */
    startWashing (washing_time = {hh: 2, mm:0}) {
        this.status = WashingStatus.WASHING;
        this.updateConsumption(true);
        this.time_remaining = washing_time;
        // Include some messages logged on the console!
        this.wash();
        console.log(`${this.name} started washing cycle (${this.time_remaining.hh} hours and ${this.time_remaining.mm} minutes remaining)`);
    }

    /**
     * Pauses the washing cycle (the remaining time is saved in the wash method).
     */
    pause () {
        this.status = WashingStatus.PAUSED;
        this.updateConsumption(false);
        this.stopWashing();
        console.log(`${this.name} paused`)
    }

    /**
     * Resumes the washing cycle with the remaining time.
     */
    resume () {
        //should not happen method pause is not used randomly in the scenario
        if(this.time_remaining == null || (this.time_remaining.hh == 0 && this.time_remaining.mm ==0)){
            if(this.filling==Filling.FULL || this.filling==Filling.HALF_FULL){
                this.time_remaining = {hh: 2, mm:0}
            }else{
                this.time_remaining = {hh: 0, mm:0}
            }
            
        }
        this.status = WashingStatus.WASHING;
        this.updateConsumption(true);
        this.wash();
        console.log(`${this.name} resumed washing cycle (${this.time_remaining.hh} hours and ${this.time_remaining.mm} minutes remaining)`)
        
    }

    /**
     * Finishes the washing cycle and updates it's status.
     */
    finish () {
        this.status = WashingStatus.FINISHED;
        this.updateConsumption(false);
        // Include some messages logged on the console!
        this.stopWashing();
        console.log(`${this.name} finished`)
    }

    /**
     * Turns off the device.
     */
    switchOff () {
        this.filling = Filling.EMPTY;
        this.status = WashingStatus.OFF;
        this.updateConsumption(false);
        
        // Include some messages logged on the console!
        this.stopWashing();
        console.log(`${this.name} switched off`)
    }
    
    /**
     * Updates the power consumption of the house according to the state of the washing device
     * consuming: washing
     * not consuming: off, finished, paused
     * @param {*} switchingOn 
     */
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

    /**
     * Increases the filling property by 1 step untill full
     */
    increaseFilling(){
        if(this.filling == Filling.EMPTY){
            this.filling = Filling.HALF;
        }else if(this.filling == Filling.HALF){
            this.filling = Filling.HALF_FULL;
        }else if(this.filling == Filling.HALF_FULL){
            this.filling = Filling.FULL;
        }
    }

    /**
     * Computes the remaining time of the washing cycle
     */
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
    
    /**
     * Sets the observer in order to compute the remaining time.
     */
    wash(){
        Clock.global.observe('mm',() => {
            this.computeTime();
            //console.log(this.time_remaining.hh + " - " + this.time_remaining.mm)
            
            if (this.time_remaining.hh == 0 && this.time_remaining.mm == 0) {
                this.finish();
                this.switchOff();
            }
        }, `${this.name} wash_cycle`)
    }

    /**
     * Removes the observer
     */
    stopWashing(){
        Clock.global.unobserve('mm', null, `${this.name} wash_cycle`);
    }
}

module.exports = WashingDevice
