const Beliefset =  require('../bdi/Beliefset')
const Observable =  require('../utils/Observable')
const Clock =  require('../utils/Clock')
const Agent = require('../bdi/Agent')
const Goal = require('../bdi/Goal')
const Intention = require('../bdi/Intention')
const House = require('./House')

const DeviceStatusSensor = require('./sensors/DeviceStatusSensor')
const ActivitySensor = require('./sensors/ActivitySensor')
const PowerSensor = require('./sensors/PowerSensor')
const PresenceSensor = require('./sensors/PresenceSensor');
const SunIlluminationSensor = require('./sensors/SunIlluminationSensor')
//const VacuumCleanerSensor = require('./sensors/VacuumCleanerSensor')
const { CleanGoal, RobotCleaner} = require('./pddl/vacuumcleaner3')
const PlanningGoal = require('../pddl/PlanningGoal')
const { SwitchOnLightGoal , SwitchOnLightIntention, SwitchOffLightGoal, SwitchOffLightIntention} = require('./goals/LightGoals')
const Light = require('./devices/Light')
const RollerShutter = require('./devices/RollerShutter')
const { SetShutterUpGoal, SetShutterUpIntention, SetShutterHalfGoal, SetShutterHalfIntention, SetShutterDownGoal, SetShutterDownIntention} = require('./goals/RollerShutterGoals')
const Television = require('./devices/Television')
const ShutterSensor = require('./sensors/ShutterSensor')
const { SwitchOffTelevisionGoal, SwitchOffTelevisionIntention } = require('./goals/TelevisionGoals')
const WashingDeviceSensor = require('./sensors/WashingDeviceSensor')
const { WashingStatus, Rooms } = require('./data')
const { StartWashingMachineGoal, StartWashingMachineIntention, ResumeWashingMachineGoal, ResumeWashingMachineIntention, PauseWashingMachineIntention, PauseWashingMachineGoal } = require('./goals/WashingMachineGoals')
const { StartDishwasherIntention, ResumeDishwasherIntention, PauseDishwasherIntention, StartDishwasherGoal, ResumeDishwasherGoal, PauseDishwasherGoal } = require('./goals/DishWasherGoals')
const { NotificationWashingDeviceIntention, NotificationWashingDeviceGoal, NotifyLowSuppliesGoal, NotifyLowSuppliesIntention } = require('./goals/NotificationGoals')
const FridgeSensor = require('./sensors/FridgeSensor')
const { VacuumCleanerAgent } = require('./agents/VacuumCleanerAgent')
const {HouseAgent} = require('./agents/HouseAgent');
var house = new House()

//house.people.john.observe('in_room', (v, k)=>console.log('in_room John ' + v.name) )

Clock.startTimer()
//Clock.wallClock()


// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    if(time.hh==3 && time.mm==30){
        //setSunIlluminationNormal()
        house.rooms.kitchen.devices.kitchen_roller_shutter.setDown();
        //console.log(house.people.john.activity)
    }
    if(time.hh==6 && time.mm==30){
        //setSunIlluminationNormal()
        //console.log(house.people.john.activity)
        //house.rooms.wc1.devices.wc1_washing_machine.status = WashingStatus.PAUSED;
        house.rooms.wc1.devices.wc1_washing_machine.increaseFilling();
        house.rooms.wc1.devices.wc1_washing_machine.increaseFilling();
        house.rooms.wc1.devices.wc1_washing_machine.increaseFilling();
        house.rooms.wc1.devices.wc1_washing_machine.status = WashingStatus.PAUSED;
    }
    if(time.hh==7 && time.mm==0){
        house.rooms.wc1.devices.wc1_washing_machine.status = WashingStatus.OFF;
         //house.people.john.idle()
         house.people.john.moveTo(house.rooms.wc1)
        // house.rooms.wc1.devices.wc1_light.switchOn();
         house.people.hannah.watch_television();
    }
    if(time.hh==7 && time.mm==15){
        //house.rooms.wc1.devices.wc1_washing_machine.status = WashingStatus.FINISHED;
        // house.rooms.wc1.devices.wc1_light.switchOff();
        house.people.john.moveTo(house.rooms.living_room)
    }
    if(time.hh==8 && time.mm==0){
        house.rooms.kitchen.devices.kitchen_fridge.removeSupplies(80);
        // house.people.john.watch_television()
    }
    if(time.hh==11 && time.mm==15){
        // house.people.hannah.idle()
        // house.people.john.moveTo(house.rooms.room3)
        house.rooms.kitchen.devices.kitchen_dishwasher.increaseFilling();
        house.rooms.kitchen.devices.kitchen_dishwasher.increaseFilling();
        house.rooms.kitchen.devices.kitchen_dishwasher.increaseFilling();
        house.rooms.kitchen.devices.kitchen_dishwasher.increaseFilling();
        // house.rooms.kitchen.devices.kitchen_dishwasher.startWashing();
    }
    if(time.hh==12 && time.mm==0){
        house.rooms.kitchen.devices.kitchen_fridge.addSupplies(30);
        //house.rooms.wc1.devices.wc1_washing_machine.startWashing();
        //house.people.john.leaveHouse();
        house.people.john.moveTo(house.rooms.corridor)
        // house.rooms.kitchen.devices.kitchen_oven.switchOn();
        //setSunIlluminationHigh();
    }
    if(time.hh==13 && time.mm==30){
        house.people.john.moveTo(house.rooms.wc2)
        house.rooms.wc1.devices.wc1_washing_machine.pause();
        //house.people.john.enterHouse();
        // house.people.john.moveTo(house.rooms.living_room)
        // house.people.john.watch_television();
        // vacuumCleanerAgent.postSubGoal( new PlanningGoal( { goal: ['clean kitchen', 'clean entrance', 'clean living_room', 'clean corridor',
        //              'clean wc1', 'clean wc2', 'clean room1', 'clean room2', 'clean room3', 'battery_10'] } ) )
    }
    if(time.hh==15 && time.mm==30){
        //setSunIlluminationNormal()
    }
    if(time.hh==18 && time.mm==0){
        // house.people.john.idle()
        //house.rooms.kitchen.devices.kitchen_dishwasher.startWashing({hh:2, mm:0});
         //house.rooms.wc1.devices.wc1_washing_machine.startWashing({hh: 4, mm:0});
    }
    if(time.hh==20 && time.mm==00){
         house.people.john.moveTo(house.rooms.living_room)
         house.rooms.kitchen.devices.kitchen_oven.switchOn();
        // house.rooms.living_room.devices.living_room_light.switchOn()
        // house.people.john.watch_television()
    }
    if(time.hh==21 && time.mm==00){
         //house.rooms.kitchen.devices.kitchen_dishwasher.startWashing({hh:2, mm:0});
    }
    if(time.hh==21 && time.mm==30){
        house.people.john.moveTo(house.rooms.balcony)
        // house.rooms.kitchen.devices.kitchen_dishwasher.pause();
    }
    if(time.hh==22 && time.mm==15){
        house.rooms.kitchen.devices.kitchen_oven.switchOff();
        // house.rooms.kitchen.devices.kitchen_dishwasher.resume();
        
    }
    if(time.hh==23 && time.mm==30){
        // house.rooms.living_room.devices.living_room_light.switchOff()
         house.people.john.moveTo(house.rooms.room2)
        // house.people.john.sleep();
    }
})


// Agents
var houseAgent = new HouseAgent('houseAgent', house);
//var vacuumCleanerAgent = new VacuumCleanerAgent('vacuumCleanerAgent', house, house.vaccumCleaner);
//houseAgent.sunIlluminationSensor.deactivateSensor();
houseAgent.shutterSensor.deactivateSensor();
houseAgent.washingDeviceSensor.deactivateSensor();
houseAgent.suppliesSensor.deactivateSensor();
//houseAgent.deviceStatusSensor.deactivateSensor();
houseAgent.powerSensor.deactivateSensor();
// houseAgent.activitySensor.deactivateSensor();



//Sensors
// var deviceStatusSensor = new DeviceStatusSensor(houseAgent, house);
// var activitySensor = new ActivitySensor(houseAgent, house);
// var powerSensor = new PowerSensor(houseAgent, house);

// var sunIlluminationSensor = new SunIlluminationSensor(houseAgent, house);
// var shutterSensor = new ShutterSensor(houseAgent, house);
//ar vacuumCleanerSensor = new VacuumCleanerSensor(vacuumCleanerAgent, house);
// var washingDeviceSensor = new WashingDeviceSensor(houseAgent, house);
// var suppliesSensor = new FridgeSensor(houseAgent, house);
//var presenceSensor = new PresenceSensor(houseAgent, house);

// houseAgent.intentions.push(SwitchOnLightIntention);
// houseAgent.intentions.push(SwitchOffLightIntention);
// houseAgent.intentions.push(SetShutterUpIntention);
// houseAgent.intentions.push(SetShutterHalfIntention);
// houseAgent.intentions.push(SetShutterDownIntention);
// houseAgent.intentions.push(SwitchOffTelevisionIntention);
// houseAgent.intentions.push(StartWashingMachineIntention);
// houseAgent.intentions.push(ResumeWashingMachineIntention);
// houseAgent.intentions.push(PauseWashingMachineIntention);
// houseAgent.intentions.push(StartDishwasherIntention);
// houseAgent.intentions.push(ResumeDishwasherIntention);
// houseAgent.intentions.push(PauseDishwasherIntention);
// houseAgent.intentions.push(NotificationWashingDeviceIntention);
// houseAgent.intentions.push(NotifyLowSuppliesIntention);
// addSwitchLightsOnGoals();
// addShutterUpGoals();
// addTvGoal();

// let d = house.rooms.kitchen.devices.kitchen_dishwasher;
// let wm = house.rooms.wc1.devices.wc1_washing_machine;
// let s = house.rooms.kitchen.devices.kitchen_speaker;
// let f = house.rooms.kitchen.devices.kitchen_fridge;
// houseAgent.beliefs.declare(`windowless ${Rooms.CORRIDOR}`, true);
// houseAgent.beliefs.declare(`windowless ${Rooms.WC1}`, true);
// houseAgent.postSubGoal(new StartWashingMachineGoal({washing_machine: wm, dishwasher: d }));
// houseAgent.postSubGoal(new ResumeWashingMachineGoal({washing_machine: wm, dishwasher: d }));
// houseAgent.postSubGoal(new PauseWashingMachineGoal({washing_machine: wm, dishwasher: d}));
// houseAgent.postSubGoal(new StartDishwasherGoal({washing_machine: wm, dishwasher: d }));
// houseAgent.postSubGoal(new ResumeDishwasherGoal({washing_machine: wm, dishwasher: d }));
// houseAgent.postSubGoal(new PauseDishwasherGoal({washing_machine: wm, dishwasher: d}));
// houseAgent.postSubGoal(new NotificationWashingDeviceGoal({device: wm, speaker: s}));
// houseAgent.postSubGoal(new NotificationWashingDeviceGoal({device: d, speaker: s}));
// houseAgent.postSubGoal(new NotifyLowSuppliesGoal({device: f, speaker: s}));



// function addSwitchLightsOnGoals(){
//     for(let room of Object.entries(house.rooms)){
//         for(let device of Object.entries(room[1].devices)){
//             if(device[1] instanceof Light){
//                 //console.log(device[1].name)
//                 let goal = new SwitchOnLightGoal({light: device[1], room: room[1]});
//                 let goal2 = new SwitchOffLightGoal({light: device[1], room: room[1]});
//                 houseAgent.postSubGoal(goal);
//                 houseAgent.postSubGoal(goal2);
//             }
//         }
        
//     }
// }

// function addShutterUpGoals(){
//     for(let room of Object.entries(house.rooms)){
//         for(let device of Object.entries(room[1].devices)){
//             if(device[1] instanceof RollerShutter){
//                 //console.log(device[1].name)
//                 let goal = new SetShutterUpGoal({tv: getRoomTv(room[1]), shutter: device[1]});
//                 let goal2 = new SetShutterHalfGoal({tv: getRoomTv(room[1]), shutter: device[1]});
//                 let goal3 = new SetShutterDownGoal({tv: getRoomTv(room[1]), shutter: device[1]});
//                 houseAgent.postSubGoal(goal);
//                 houseAgent.postSubGoal(goal2);
//                 houseAgent.postSubGoal(goal3);
//             }
//         }
        
//     }
// }

// function addTvGoal(){
//     for(let room of Object.entries(house.rooms)){
//         for(let device of Object.entries(room[1].devices)){
//             if(device[1] instanceof Television){
//                 //console.log(device[1].name)
//                 let goal = new SwitchOffTelevisionGoal({tv: device[1] , room: room[1]});
//                 houseAgent.postSubGoal(goal);
//             }
//         }    
//     }
// }

// function getRoomTv(room){
//     for(let device of Object.entries(room.devices)){
//         if(device[1] instanceof Television){
//             return device[1];
//         }
//     }
//     return null;
// }