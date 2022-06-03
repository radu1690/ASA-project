const Beliefset =  require('../../bdi/Beliefset')
const Observable =  require('../../utils/Observable')
const Clock =  require('../../utils/Clock')
const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const Intention = require('../../bdi/Intention')
const House = require('../House')

const DeviceStatusSensor = require('../sensors/DeviceStatusSensor')
const ActivitySensor = require('../sensors/ActivitySensor')
const PowerSensor = require('../sensors/PowerSensor')
const PresenceSensor = require('../sensors/PresenceSensor');
const SunIlluminationSensor = require('../sensors/SunIlluminationSensor')
//const VacuumCleanerSensor = require('./sensors/VacuumCleanerSensor')
const { CleanGoal, RobotCleaner} = require('../pddl/vacuumcleaner3')
const PlanningGoal = require('../../pddl/PlanningGoal')
const { SwitchOnLightGoal , SwitchOnLightIntention, SwitchOffLightGoal, SwitchOffLightIntention} = require('../goals/LightGoals')
const Light = require('../devices/Light')
const RollerShutter = require('../devices/RollerShutter')
const { SetShutterUpGoal, SetShutterUpIntention, SetShutterHalfGoal, SetShutterHalfIntention, SetShutterDownGoal, SetShutterDownIntention} = require('../goals/RollerShutterGoals')
const Television = require('../devices/Television')
const ShutterSensor = require('../sensors/ShutterSensor')
const { SwitchOffTelevisionGoal, SwitchOffTelevisionIntention } = require('../goals/TelevisionGoals')
const WashingDeviceSensor = require('../sensors/WashingDeviceSensor')
const { WashingStatus, Rooms, People } = require('../data')
const { StartWashingMachineGoal, StartWashingMachineIntention, ResumeWashingMachineGoal, ResumeWashingMachineIntention, PauseWashingMachineIntention, PauseWashingMachineGoal } = require('../goals/WashingMachineGoals')
const { StartDishwasherIntention, ResumeDishwasherIntention, PauseDishwasherIntention, StartDishwasherGoal, ResumeDishwasherGoal, PauseDishwasherGoal } = require('../goals/DishWasherGoals')
const { NotificationWashingDeviceIntention, NotificationWashingDeviceGoal, NotifyLowSuppliesGoal, NotifyLowSuppliesIntention } = require('../goals/NotificationGoals')
const FridgeSensor = require('../sensors/FridgeSensor')
const { VacuumCleanerAgent } = require('../agents/VacuumCleanerAgent')
const {HouseAgent} = require('../agents/HouseAgent');
const Person = require('../Person')


//house.people.john.observe('in_room', (v, k)=>console.log('in_room John ' + v.name) )

Clock.startTimer()
//Clock.wallClock()


// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    if(time.hh==13 && time.mm==30){
        vacuumCleanerAgent.postSubGoal( new PlanningGoal( { goal: ['clean kitchen', 'clean entrance', 'clean living_room', 'clean corridor',
                     'clean wc1', 'clean wc2', 'clean room1', 'clean room2', 'clean room3', 'battery_10'] } ) )
    }
})

var house = new House()
// Agents
var houseAgent = new HouseAgent('houseAgent', house);
var vacuumCleanerAgent = new VacuumCleanerAgent('vacuumCleanerAgent', house, house.vaccumCleaner);
houseAgent.sunIlluminationSensor.deactivateSensor();
houseAgent.shutterSensor.deactivateSensor();
houseAgent.washingDeviceSensor.deactivateSensor();
houseAgent.suppliesSensor.deactivateSensor();
houseAgent.deviceStatusSensor.deactivateSensor();
houseAgent.powerSensor.deactivateSensor();
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