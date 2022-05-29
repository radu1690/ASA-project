const Clock = require('../utils/Clock');
const Observable =  require('../utils/Observable');
const Device = require('./devices/Device');
const House = require('./House');

/** */
class Room extends Observable {
    /**
     * 
     * @param {House} house 
     * @param {String} name 
     * @param {Device[]} devices 
     * @param {String[]} doors_to 
     * @param {String[]} connected_to 
     */
    constructor (house, name, devices, doors_to, connected_to) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.devices = devices //non-observable
        this.doors_to = doors_to;//reachable rooms through doors
        this.connected_to = connected_to;//reachable rooms without doors
        this.set('people_inside', 0);//observable, keeps track of people inside
        //it needs to be cleaned if it's dirty
        this.set('clean', true); 
        //probability of being dirty in the next day
        this.dirty_chance = 0.1;
        //number of people sleeping in the room
        this.set('people_sleeping', 0);
        //number of people watching tv in the room, for rooms with no tv it is always 0 ...
        this.set('people_watching_tv', 0);

        //update automatically cleanness of the room
        this.setAutoUpdate();
    }
    
    /**
     * Sets the clean property to false with the probability of 'dirty_chance'. 
     * If clean is still true, it increases dirty_chance by 0.1
     * @returns 
     */
    updateCleanness(){
        if(!this.clean) return false;
        if(Math.random() < this.dirty_chance){
            this.clean = false;
            this.dirty_chance = 0.1;
        }else{
            this.dirty_chance = this.dirty_chance + 0.1;
        }
        return true;
    }

    /**
     * Automatically call updateCleaness() in a given time.
     * Currently called when Clock hour is 0 or 12.
     */
    setAutoUpdate(){
        Clock.global.observe('hh',(hour, k) => {
            if (hour == 0 || hour == 12) {
                this.updateCleanness();
            }
            //console.log(`${this.name}: ${this.clean}, chance: ${this.dirty_chance}`)
        }, this.name)
    }
}



module.exports = Room
