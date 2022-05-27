const Person = require('./Person');
const Light = require('./devices/Light')
const RollerShutter = require('./devices/Roller_shutter');
const Room = require('./Room');

const Observable =  require('../utils/Observable');
const HouseMap = require('./map');
const Fridge = require('./devices/Fridge');
const Oven = require('./devices/Oven')
const Dishwasher = require('./devices/Dishwasher')
const Washing_machine = require('./devices/Washing_machine')
const Television = require('./devices/Television')
const Speaker = require('./devices/Speaker')

class House {
    
    constructor () {
        this.utilities = {
            electricity : new Observable( { consumption: 0 } )
        }
        
        this.map = new HouseMap();
        // this.rooms = {
        //     kitchen : new Room(this, 'kitchen', [new Light(this, 'kitchen_lights_1', 2), new Light(this, 'kitchen_lights_2', 2), new RollerShutter(this, 'kitchen_roller_shutter'),
        //         new Fridge(this, 'kitchen_fridge'), new Dishwasher(this, 'kitchen_dishwasher'), new Oven(this, 'kitchen_oven'), new Speaker(this, 'kitchen_speaker') ], ['balcony'], ['entrance', 'living_room']),
        //     // kitchen: { name: 'kitchen', doors_to: ['balcony'], connected_to : ['entrance', 'living_room'] },
        //     living_room : new Room(this, 'living_room', [new Light(this, 'living_room_light', 1), new Television(this, 'living_room_television'), new RollerShutter(this, 'living_room_roller_shutter')], ['balcony'], ['kitchen', 'entrance']),
        //     //living_room: { name: 'living_room', connected_to: ['kitchen', 'entrance']  },
        //     entrance : new Room(this, 'entrance', [new Light(this, 'entrance_light', 1)], ['corridor'], ['kitchen', 'living_room']),
        //     // entrance : {name: 'entrance', doors_to: ['corridor'], connected_to: ['kitchen', 'living_room'] },
        //     corridor : new Room(this, 'corridor', [new Light(this, 'corridor_light', 1)], ['entrance', 'wc1', 'wc2', 'room1', 'room2', 'room3'], []),
        //     // corridor: { name: 'corridor', doors_to: ['entrance', 'room1', 'room2', 'room3', 'wc1', 'wc2'] },
        //     wc1 : new Room(this, 'wc1', [new Light(this, 'wc1_light', 1), new Washing_machine(this, 'wc1_washing_machine')], ['corridor'], []),
        //     // wc1: {name: 'wc1', doors_to: ["corridor"]},
        //     wc2 : new Room(this, 'wc2', [new Light(this, 'wc2_light', 1)], ['corridor'], []),
        //     // wc2: {name: 'wc2', doors_to: ["corridor"]},
        //     room1 : new Room(this, 'room1', [new Light(this, 'room1_light', 1), new RollerShutter(this, 'room1_roller_shutter')], ['corridor', 'balcony'], []),
        //     // room1: {name: 'room1', doors_to: ["corridor", 'balcony']},
        //     room2 : new Room(this, 'room2', [new Light(this, 'room2_light', 1), new RollerShutter(this, 'room2_roller_shutter')], ['corridor', 'balcony'], []),
        //     // room2: {name: 'room2', doors_to: ["corridor", 'balcony']},
        //     room3 : new Room(this, 'room3', [new Light(this, 'room3_light', 1), new Television(this, 'room3_television'), new RollerShutter(this, 'room3_roller_shutter')], ['corridor', 'balcony'], []),
        //     // room3: {name: 'room3', doors_to: ["corridor", 'balcony']},
        //     balcony : new Room(this, 'balcony', [new Light(this, 'balcony_light', 1)], ['kitchen', 'living_room', 'room1', 'room2', 'room3'], []),
        //     // balcony: { name: 'balcony', doors_to: ['kitchen', 'room1', 'room2', 'room3'] }
        // }

        this.rooms = {
            kitchen : new Room(this, 'kitchen', 
                {
                    kitchen_lights_1: new Light(this, 'kitchen_lights_1', 2),
                    kitchen_lights_2: new Light(this, 'kitchen_lights_2', 2),
                    kitchen_roller_shutter: new RollerShutter(this, 'kitchen_roller_shutter'),
                    kitchen_fridge: new Fridge(this, 'kitchen_fridge'),
                    kitchen_dishwasher: new Dishwasher(this, 'kitchen_dishwasher'),
                    kitchen_oven: new Oven(this, 'kitchen_oven'),
                    kitchen_speaker: new Speaker(this, 'kitchen_speaker')
                },['balcony'], ['entrance', 'living_room']),
            living_room : new Room(this, 'living_room',
                {
                    living_room_light: new Light(this, 'living_room_light', 1),
                    living_room_television: new Television(this, 'living_room_television'),
                    living_room_roller_shutter: new RollerShutter(this, 'living_room_roller_shutter')
                }, ['balcony'], ['kitchen', 'entrance']),
            entrance : new Room(this, 'entrance', {entrance_light: new Light(this, 'entrance_light', 1)}, ['corridor'], ['kitchen', 'living_room']),
            corridor : new Room(this, 'corridor', {corridor_light: new Light(this, 'corridor_light', 1)}, ['entrance', 'wc1', 'wc2', 'room1', 'room2', 'room3'], []),
            wc1 : new Room(this, 'wc1', 
                {
                    wc1_light: new Light(this, 'wc1_light', 1),
                    wc1_washing_machine: new Washing_machine(this, 'wc1_washing_machine')
                }, ['corridor'], []),
            wc2 : new Room(this, 'wc2', {wc2_light: new Light(this, 'wc2_light', 1)}, ['corridor'], []),
            room1 : new Room(this, 'room1', 
                {
                    room1_light: new Light(this, 'room1_light', 1),
                    room1_roller_shutter: new RollerShutter(this, 'room1_roller_shutter')
                }, ['corridor', 'balcony'], []),
            room2 : new Room(this, 'room2',
                {
                    room2_light: new Light(this, 'room2_light', 1),
                    room2_roller_shutter : new RollerShutter(this, 'room2_roller_shutter')
                }, ['corridor', 'balcony'], []),
            room3 : new Room(this, 'room3', 
                {
                    room3_light: new Light(this, 'room3_light', 1),
                    room3_television: new Television(this, 'room3_television'),
                    room3_roller_shutter: new RollerShutter(this, 'room3_roller_shutter')
                }, ['corridor', 'balcony'], []),
            balcony : new Room(this, 'balcony', {balcony_light: new Light(this, 'balcony_light', 1)}, ['kitchen', 'living_room', 'room1', 'room2', 'room3'], []),
        }


        this.people = {
            john: new Person(this, 'John', this.rooms.room3)
        }

        this.rooms.room3.people_inside=1;

        this.rooms.kitchen.devices.kitchen_fridge.switchOn();
        
        
    
    }
}

module.exports = House;

// h = new House();
// h.people.john.observe('in_room', (v, k)=>console.log('in_room bob ' + v.name) )
// console.log(h.people.john.moveTo('wc1'))

// console.log(h.people.john.in_room.name)