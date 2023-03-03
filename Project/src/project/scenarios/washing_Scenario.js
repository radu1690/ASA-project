const Clock =  require('../../utils/Clock')
const House = require('../house/House')
const {HouseAgent} = require('../agents/HouseAgent');



Clock.startTimer()
//Clock.wallClock()


// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    if(time.hh==7 && time.mm==00){
        house.rooms.kitchen.devices.kitchen_dishwasher.increaseFilling();
        house.rooms.kitchen.devices.kitchen_dishwasher.increaseFilling();
        house.rooms.kitchen.devices.kitchen_dishwasher.increaseFilling();
        house.rooms.kitchen.devices.kitchen_dishwasher.increaseFilling();

        house.rooms.wc1.devices.wc1_washing_machine.increaseFilling();
        house.rooms.wc1.devices.wc1_washing_machine.increaseFilling();
        house.rooms.wc1.devices.wc1_washing_machine.increaseFilling();
        house.rooms.wc1.devices.wc1_washing_machine.increaseFilling();
    }
    
    if(time.hh==20 && time.mm==00){
        if(time.dd == 0){
            house.rooms.kitchen.devices.kitchen_oven.switchOn();
        }
    }

    if(time.hh==20 && time.mm==45){
        if(time.dd == 0){
            house.rooms.kitchen.devices.kitchen_oven.switchOff();
        }
    }
})

var house = new House()
// Agents
var houseAgent = new HouseAgent('houseAgent', house);
//var vacuumCleanerAgent = new VacuumCleanerAgent('vacuumCleanerAgent', house, house.vaccumCleaner);
houseAgent.sunIlluminationSensor.deactivateSensor();
houseAgent.shutterSensor.deactivateSensor();
//houseAgent.washingDeviceSensor.deactivateSensor();
//houseAgent.suppliesSensor.deactivateSensor();
//houseAgent.deviceStatusSensor.deactivateSensor();
//houseAgent.powerSensor.deactivateSensor();
houseAgent.activitySensor.deactivateSensor();



// //People
// house.people[People.JOHN] = new Person(house, People.JOHN, house.rooms[Rooms.ROOM3]);
// house.people[People.HANNAH] = new Person(house, People.HANNAH, house.rooms[Rooms.ROOM3]);
// house.people[People.EZEKIEL] = new Person(house, People.EZEKIEL, house.rooms[Rooms.ROOM2]);
// house.people[People.ELIZABETH] = new Person(house, People.ELIZABETH, house.rooms[Rooms.ROOM1]);


// //Initial status
// house.people[People.JOHN].sleep();
// house.people[People.HANNAH].sleep();
// house.people[People.EZEKIEL].sleep();
// house.people[People.ELIZABETH].sleep();

// house.rooms[Rooms.ROOM1].people_inside = 1;
// house.rooms[Rooms.ROOM2].people_inside = 1;
// house.rooms[Rooms.ROOM3].people_inside = 2;

// house.rooms[Rooms.ROOM1].people_sleeping = 1;
// house.rooms[Rooms.ROOM2].people_sleeping = 1;
// house.rooms[Rooms.ROOM3].people_sleeping = 2;