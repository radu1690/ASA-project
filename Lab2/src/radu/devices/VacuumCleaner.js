const Room = require('../Room');
const Device = require('./Device');


class VacuumCleaner extends Device {
    constructor (house, name, room) {
        super(house, name)
        this.power_consumption = 0;
        this.set('location', room) // observable
        this.previous_location = room;
    }

    
    moveTo (to) {
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
        let already_clean = this.location.clean;
        this.location.clean = true;
        console.log(`${this.name} cleaned ${this.location.name}`);
        if(already_clean) console.log(`${this.location.name} was already clean`);
    }
}

module.exports = VacuumCleaner
