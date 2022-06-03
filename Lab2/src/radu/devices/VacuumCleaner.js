const Room = require('../house/Room');
const Device = require('./Device');


class VacuumCleaner extends Device {
    constructor (house, name, room, recharge_room) {
        super(house, name)
        this.power_consumption = 0;
        this.set('location', room); // observable
        this.set('recharge_room', recharge_room);
        this.set('battery_level', 100);
        this.previous_location = room;
    }

    
    moveTo (to) {
        if(this.battery_level < 10){
            throw new Error("Robot battery_level below 10% !");
        }
        let map = this.house.map;
        let path = map.getPath(this.location.name, to.name);
        
        if ( path.includes(to.name) && path.includes(this.location.name) ) {
            path.forEach(room => {
                if(room != this.location.name){
                    this.previous_location = this.location;
                    this.location = this.house.rooms[room]
                    console.log(`${this.name} moved to ${to.name} (left ${this.previous_location.name})`);
                }
            });
            return true;
        }
        else{
            console.log(`${this.name} failed to move to ${to}`)
            return false
        }
    }

    cleanRoom(){
        if(this.battery_level < 10){
            throw new Error("Robot battery_level below 10% !");
        }
        let already_clean = this.location.clean;
        this.location.clean = true;
        this.battery_level = this.battery_level - 10;
        
        console.log(`${this.name} cleaned ${this.location.name}`);
        if(already_clean) console.log(`${this.location.name} was already clean`);
    }

    recharge(){
        if(this.battery_level < 10){
            throw new Error("Robot battery_level below 10% !");
        }
        if(this.recharge_room != this.location){
            throw new Error(`Robot tryed to recharge battery in ${this.location} but recharge_room is ${this.recharge_room}`);
        }
        this.battery_level = 100;
        console.log(`${this.name} recharged the battery!`)
    }

}

module.exports = VacuumCleaner
