const Observable =  require('../utils/Observable')


class Room extends Observable {
    constructor (house, name, devices, doors_to, connected_to) {
        super()
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('sun_illumination', 'low') // observable  [low, normal, high]
        this.devices = devices //non-observable
        this.doors_to = doors_to;//reachable rooms through doors
        this.connected_to = connected_to;//reachable rooms without doors
        this.set('people_inside', 0);//observable, keeps track of people inside
        //it needs to be cleaned if it's dirty
        this.set('dirty', false); 
        //probability of being dirty in the next day
        this.dirty_chance = 0.1;
    }
    setIlluminationLow(){
        this.sun_illumination = 'low';
        console.log(`${this.name}'s sun illumination is low`);
    }
    setIlluminationNormal(){
        this.sun_illumination = 'normal';
        console.log(`${this.name}'s sun illumination is normal`);
    }
    setIlluminationHigh(){
        this.sun_illumination = 'high';
        console.log(`${this.name}'s sun illumination is high`);
    }

    checkDirty(){
        if(this.dirty) return;
        if(Math.random() < this.dirty_chance){
            this.dirty = true;
            this.dirty_chance = 0.1;
        }else{
            this.dirty_chance = this.dirty_chance + 0.1;
        }
    }
}



module.exports = Room
