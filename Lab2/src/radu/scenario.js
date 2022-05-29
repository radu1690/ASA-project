const Beliefset =  require('../bdi/Beliefset')
const Observable =  require('../utils/Observable')
const Clock =  require('../utils/Clock')
const Agent = require('../bdi/Agent')
const Goal = require('../bdi/Goal')
const Intention = require('../bdi/Intention')
const House = require('./House')

const LightSensor = require('./sensors/LightSensor')
const ActivitySensor = require('./sensors/ActivitySensor')
const PowerSensor = require('./sensors/PowerSensor')
const PresenceSensor = require('./sensors/PresenceSensor');
const SunIlluminationSensor = require('./sensors/SunIlluminationSensor')
const VacuumCleanerSensor = require('./sensors/VacuumCleanerSensor')
const { CleanGoal, RobotCleaner} = require('./pddl/vacuumcleaner3')
const PlanningGoal = require('../pddl/PlanningGoal')
var house = new House()

//house.people.john.observe('in_room', (v, k)=>console.log('in_room John ' + v.name) )

Clock.startTimer()
//Clock.wallClock()


// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    if(time.hh==6 && time.mm==30){
        //setSunIlluminationNormal()
    }
    if(time.hh==7 && time.mm==0){
        house.people.john.idle()
        house.people.john.moveTo(house.rooms.wc1)
        house.rooms.wc1.devices.wc1_light.switchOn();
        house.people.hannah.watch_television();
    }
    if(time.hh==7 && time.mm==15){
        house.rooms.wc1.devices.wc1_light.switchOff();
        house.people.john.moveTo(house.rooms.living_room)
    }
    if(time.hh==8 && time.mm==0){
        
        house.people.john.watch_television()
    }
    if(time.hh==11 && time.mm==15){
        house.people.john.idle()
        //house.people.john.moveTo(house.rooms.room3)
        
        house.rooms.kitchen.devices.kitchen_dishwasher.startWashing();
    }
    if(time.hh==12 && time.mm==0){
        house.people.john.leaveHouse();
        house.people.john.moveTo(house.rooms.kitchen)
        house.rooms.kitchen.devices.kitchen_oven.switchOn();
        //setSunIlluminationHigh();
    }
    if(time.hh==13 && time.mm==30){
        house.people.john.enterHouse();
        house.people.john.moveTo(house.rooms.living_room)
        house.people.john.watch_television();
        // vacuumCleanerAgent.postSubGoal( new PlanningGoal( { goal: ['clean kitchen', 'clean entrance', 'clean living_room', 'clean corridor',
        //              'clean wc1', 'clean wc2', 'clean room1', 'clean room2', 'clean room3'] } ) )
    }
    if(time.hh==15 && time.mm==30){
        //setSunIlluminationNormal()
    }
    if(time.hh==19 && time.mm==0){
        house.people.john.idle()
        house.people.john.moveTo(house.rooms.balcony)
        house.rooms.wc1.devices.wc1_washing_machine.startWashing();
    }
    if(time.hh==20 && time.mm==00){
        //setSunIlluminationLow()
        house.people.john.moveTo(house.rooms.living_room)
        house.rooms.living_room.devices.living_room_light.switchOn()
        house.people.john.watch_television()
    }
    if(time.hh==21 && time.mm==00){
        house.rooms.kitchen.devices.kitchen_dishwasher.startWashing({hh:2, mm:0});
    }
    if(time.hh==21 && time.mm==30){
        house.rooms.kitchen.devices.kitchen_dishwasher.pause();
    }
    if(time.hh==22 && time.mm==15){
        house.rooms.kitchen.devices.kitchen_dishwasher.resume();
        
    }
    if(time.hh==23 && time.mm==30){
        house.rooms.living_room.devices.living_room_light.switchOff()
        house.people.john.moveTo(house.rooms.room3)
        house.people.john.sleep();
    }
})


// Agents
var houseAgent = new Agent('houseAgent');
var vacuumCleanerAgent = new RobotCleaner('vacuumCleanerAgent', house, house.vaccumCleaner);
//Sensors
// var lightSensor = new LightSensor(houseAgent, house);
var activitySensor = new ActivitySensor(houseAgent, house);
// var powerSensor = new PowerSensor(houseAgent, house);
//var presenceSensor = new PresenceSensor(houseAgent, house);
// var sunIlluminationSensor = new SunIlluminationSensor(houseAgent, house);
// var vacuumCleanerSensor = new VacuumCleanerSensor(vacuumCleanerAgent, house);
