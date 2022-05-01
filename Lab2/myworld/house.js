const Person = require('./person');
const Light = require('./devices/light')
const RollerShutter = require('./devices/roller_shutter');
const Room = require('./room');

const Observable =  require('../utils/Observable');
const HouseMap = require('./map');

class House {
    
    constructor () {
        this.utilities = {
            electricity : new Observable( { consumption: 0 } )
        }
        
        this.map = new HouseMap();
        this.rooms = {
            kitchen : new Room(this, 'kitchen', [new Light(this, 'kitchen_lights_1', 2), new Light(this, 'kitchen_lights_2', 2), new RollerShutter(this, 'kitchen_roller_shutter')], ['balcony'], ['entrance', 'living_room']),
            // kitchen: { name: 'kitchen', doors_to: ['balcony'], connected_to : ['entrance', 'living_room'] },
            living_room : new Room(this, 'living_room', [new Light(this, 'living_room_light', 1)], ['balcony'], ['kitchen', 'entrance']),
            //living_room: { name: 'living_room', connected_to: ['kitchen', 'entrance']  },
            entrance : new Room(this, 'entrance', [new Light(this, 'entrance_light', 1)], ['corridor'], ['kitchen', 'living_room']),
            // entrance : {name: 'entrance', doors_to: ['corridor'], connected_to: ['kitchen', 'living_room'] },
            corridor : new Room(this, 'corridor', [new Light(this, 'corridor_light', 1)], ['entrance', 'wc1', 'wc2', 'room1', 'room2', 'room3'], []),
            // corridor: { name: 'corridor', doors_to: ['entrance', 'room1', 'room2', 'room3', 'wc1', 'wc2'] },
            wc1 : new Room(this, 'wc1', [new Light(this, 'wc1_light', 1)], ['corridor'], []),
            // wc1: {name: 'wc1', doors_to: ["corridor"]},
            wc2 : new Room(this, 'wc2', [new Light(this, 'wc2_light', 1)], ['corridor'], []),
            // wc2: {name: 'wc2', doors_to: ["corridor"]},
            room1 : new Room(this, 'room1', [new Light(this, 'room1_light', 1), new RollerShutter(this, 'room1_roller_shutter')], ['corridor', 'balcony'], []),
            // room1: {name: 'room1', doors_to: ["corridor", 'balcony']},
            room2 : new Room(this, 'room2', [new Light(this, 'room2_light', 1), new RollerShutter(this, 'room2_roller_shutter')], ['corridor', 'balcony'], []),
            // room2: {name: 'room2', doors_to: ["corridor", 'balcony']},
            room3 : new Room(this, 'room3', [new Light(this, 'room3_light', 1), new RollerShutter(this, 'room3_roller_shutter')], ['corridor', 'balcony'], []),
            // room3: {name: 'room3', doors_to: ["corridor", 'balcony']},
            balcony : new Room(this, 'balcony', [new Light(this, 'balcony_light', 1)], ['kitchen', 'living_room', 'room1', 'room2', 'room3'], []),
            // balcony: { name: 'balcony', doors_to: ['kitchen', 'room1', 'room2', 'room3'] }
        }

        this.people = {
            john: new Person(this, 'John', this.rooms.balcony)
        }
        
    
    }
}

module.exports = House;

// h = new House();
// h.people.john.observe('in_room', (v, k)=>console.log('in_room bob ' + v.name) )
// console.log(h.people.john.moveTo('wc1'))

// console.log(h.people.john.in_room.name)