const Person = require('./Person');
const Light = require('./devices/Light')
const RollerShutter = require('./devices/RollerShutter');
const Room = require('./Room');
const Clock = require('../utils/Clock');
const Observable =  require('../utils/Observable');
const HouseMap = require('./map');
const Fridge = require('./devices/Fridge');
const Oven = require('./devices/Oven')
const Dishwasher = require('./devices/Dishwasher')
const WashingMachine = require('./devices/WashingMachine')
const Television = require('./devices/Television')
const Speaker = require('./devices/Speaker');
const VacuumCleaner = require('./devices/VacuumCleaner');
const {Activities, Rooms, People, Illumination, WashingDevices} = require('./data');

class House extends Observable {
    utilities;
    map;
    /**@type {Room[]} */
    rooms;
    /**@type {Person[]} */
    people;
    /**@type {VacuumCleaner} */
    vaccumCleaner;

    constructor () {
        super();
        //this.sun_illumination = 'low';
        this.set('sun_illumination', Illumination.LOW)
        this.utilities = {
            electricity : new Observable( { consumption: 0 } )
        }
        
        this.map = new HouseMap();

        this.rooms = {
            kitchen : new Room(this, Rooms.KITCHEN, 
                {
                    kitchen_light: new Light(this, 'kitchen_light', 2),
                    //kitchen_lights_2: new Light(this, 'kitchen_lights_2', 2),
                    kitchen_roller_shutter: new RollerShutter(this, 'kitchen_roller_shutter'),
                    kitchen_fridge: new Fridge(this, 'kitchen_fridge'),
                    kitchen_dishwasher: new Dishwasher(this, WashingDevices.DISHWASHER),
                    kitchen_oven: new Oven(this, 'kitchen_oven'),
                    kitchen_speaker: new Speaker(this, 'kitchen_speaker')
                },[Rooms.BALCONY], [Rooms.ENTRANCE, Rooms.LIVING_ROOM]),
            living_room : new Room(this, Rooms.LIVING_ROOM,
                {
                    living_room_light: new Light(this, 'living_room_light', 2),
                    living_room_television: new Television(this, 'living_room_television'),
                    living_room_roller_shutter: new RollerShutter(this, 'living_room_roller_shutter')
                }, [Rooms.BALCONY], [Rooms.KITCHEN, Rooms.ENTRANCE]),
            entrance : new Room(this, Rooms.ENTRANCE, {entrance_light: new Light(this, 'entrance_light', 1)}, [Rooms.CORRIDOR], [Rooms.KITCHEN, Rooms.LIVING_ROOM]),
            corridor : new Room(this, Rooms.CORRIDOR, {corridor_light: new Light(this, 'corridor_light', 1)}, [Rooms.ENTRANCE, Rooms.WC1, Rooms.WC2, Rooms.ROOM1, Rooms.ROOM2, Rooms.ROOM3], []),
            wc1 : new Room(this, Rooms.WC1, 
                {
                    wc1_light: new Light(this, 'wc1_light', 1),
                    wc1_washing_machine: new WashingMachine(this, WashingDevices.WASHINGMACHINE)
                }, [Rooms.CORRIDOR], []),
            wc2 : new Room(this, Rooms.WC2, {wc2_light: new Light(this, 'wc2_light', 1)}, [Rooms.CORRIDOR], []),
            room1 : new Room(this, Rooms.ROOM1, 
                {
                    room1_light: new Light(this, 'room1_light', 1),
                    room1_roller_shutter: new RollerShutter(this, 'room1_roller_shutter')
                }, [Rooms.CORRIDOR, Rooms.BALCONY], []),
            room2 : new Room(this, Rooms.ROOM2,
                {
                    room2_light: new Light(this, 'room2_light', 1),
                    room2_roller_shutter : new RollerShutter(this, 'room2_roller_shutter')
                }, [Rooms.CORRIDOR, Rooms.BALCONY], []),
            room3 : new Room(this, Rooms.ROOM3, 
                {
                    room3_light: new Light(this, 'room3_light', 1),
                    room3_television: new Television(this, 'room3_television'),
                    room3_roller_shutter: new RollerShutter(this, 'room3_roller_shutter')
                }, [Rooms.CORRIDOR, Rooms.BALCONY], []),
            balcony : new Room(this, Rooms.BALCONY, {balcony_light: new Light(this, 'balcony_light', 2)}, [Rooms.KITCHEN, Rooms.LIVING_ROOM, Rooms.ROOM1, Rooms.ROOM2, Rooms.ROOM3], []),
        }


        this.people = {
            john: new Person(this, People.JOHN, this.rooms.room3),
            hannah: new Person(this, People.HANNAH, this.rooms.living_room)
        }

        this.rooms.room3.people_inside=1;
        this.rooms.living_room.people_inside = 1;
        this.rooms.kitchen.devices.kitchen_fridge.switchOn();
        this.vaccumCleaner = new VacuumCleaner(this, 'VacuumCleanerRobot', this.rooms.wc1, this.rooms.wc1);
        
        
        this.setAutoSunIllumination();
    }

    /**
     * Automatically updates sun illumination based on the hour of the clock:
     * from 20 to 6 -> low. 
     * from 6 to 11 and from 15 to 20 -> normal.    
     * from 11 to 15 -> high.   
     */
    setAutoSunIllumination(){
        Clock.global.observe('hh',(hour, k) => {
            if (hour == 20) {
                this.sun_illumination = Illumination.LOW
            }else if(hour == 6 || hour == 15){
                this.sun_illumination = Illumination.NORMAL
            }else if(hour == 11){
                this.sun_illumination = Illumination.HIGH
            }
        }, 'auto_sun_illumination')
    }
}

module.exports = House;

// h = new House();
// h.people.john.observe('in_room', (v, k)=>console.log('in_room bob ' + v.name) )
// console.log(h.people.john.moveTo('wc1'))

// console.log(h.people.john.in_room.name)