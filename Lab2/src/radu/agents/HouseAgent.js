
const House = require('../House')

const DeviceStatusSensor = require('../sensors/DeviceStatusSensor')
const ActivitySensor = require('../sensors/ActivitySensor')
const PowerSensor = require('../sensors/PowerSensor')
const SunIlluminationSensor = require('../sensors/SunIlluminationSensor')
const { SwitchOnLightGoal , SwitchOnLightIntention, SwitchOffLightGoal, SwitchOffLightIntention} = require('../goals/LightGoals')
const Light = require('../devices/Light')
const RollerShutter = require('../devices/RollerShutter')
const { SetShutterUpGoal, SetShutterUpIntention, SetShutterHalfGoal, SetShutterHalfIntention, SetShutterDownGoal, SetShutterDownIntention} = require('../goals/RollerShutterGoals')
const Television = require('../devices/Television')
const ShutterSensor = require('../sensors/ShutterSensor')
const { SwitchOffTelevisionGoal, SwitchOffTelevisionIntention } = require('../goals/TelevisionGoals')
const WashingDeviceSensor = require('../sensors/WashingDeviceSensor')
const { StartWashingMachineGoal, StartWashingMachineIntention, ResumeWashingMachineGoal, ResumeWashingMachineIntention, PauseWashingMachineIntention, PauseWashingMachineGoal } = require('../goals/WashingMachineGoals')
const { StartDishwasherIntention, ResumeDishwasherIntention, PauseDishwasherIntention, StartDishwasherGoal, ResumeDishwasherGoal, PauseDishwasherGoal } = require('../goals/DishWasherGoals')
const { NotificationWashingDeviceIntention, NotificationWashingDeviceGoal, NotifyLowSuppliesGoal, NotifyLowSuppliesIntention } = require('../goals/NotificationGoals')
const FridgeSensor = require('../sensors/FridgeSensor');
const Agent = require("../../bdi/Agent");
const { Rooms } = require('../data')


class HouseAgent extends Agent {
    

    constructor(name, house){
        super(name);

        
        //Sensors
        this.sunIlluminationSensor = new SunIlluminationSensor(this, house);
        this.shutterSensor = new ShutterSensor(this, house);
        this.washingDeviceSensor = new WashingDeviceSensor(this, house);
        this.suppliesSensor = new FridgeSensor(this, house);
        this.deviceStatusSensor = new DeviceStatusSensor(this, house);
        this.activitySensor = new ActivitySensor(this, house);
        this.powerSensor = new PowerSensor(this, house);

        //Intentions
        this.intentions.push(SwitchOnLightIntention);
        this.intentions.push(SwitchOffLightIntention);
        this.intentions.push(SetShutterUpIntention);
        this.intentions.push(SetShutterHalfIntention);
        this.intentions.push(SetShutterDownIntention);
        this.intentions.push(SwitchOffTelevisionIntention);
        this.intentions.push(StartWashingMachineIntention);
        this.intentions.push(ResumeWashingMachineIntention);
        this.intentions.push(PauseWashingMachineIntention);
        this.intentions.push(StartDishwasherIntention);
        this.intentions.push(ResumeDishwasherIntention);
        this.intentions.push(PauseDishwasherIntention);
        this.intentions.push(NotificationWashingDeviceIntention);
        this.intentions.push(NotifyLowSuppliesIntention);

        //Specific devices for for some goals
        let dishwasher = house.rooms.kitchen.devices.kitchen_dishwasher;
        let washing_machine = house.rooms.wc1.devices.wc1_washing_machine;
        let speaker = house.rooms.kitchen.devices.kitchen_speaker;
        let fridge = house.rooms.kitchen.devices.kitchen_fridge;

        //Goals
        this.postSubGoal(new StartWashingMachineGoal({washing_machine: washing_machine, dishwasher: dishwasher }));
        this.postSubGoal(new ResumeWashingMachineGoal({washing_machine: washing_machine, dishwasher: dishwasher }));
        this.postSubGoal(new PauseWashingMachineGoal({washing_machine: washing_machine, dishwasher: dishwasher}));
        this.postSubGoal(new StartDishwasherGoal({washing_machine: washing_machine, dishwasher: dishwasher }));
        this.postSubGoal(new ResumeDishwasherGoal({washing_machine: washing_machine, dishwasher: dishwasher }));
        this.postSubGoal(new PauseDishwasherGoal({washing_machine: washing_machine, dishwasher: dishwasher}));
        this.postSubGoal(new NotificationWashingDeviceGoal({device: washing_machine, speaker: speaker}));
        this.postSubGoal(new NotificationWashingDeviceGoal({device: dishwasher, speaker: speaker}));
        this.postSubGoal(new NotifyLowSuppliesGoal({device: fridge, speaker: speaker}));

        //Goals for multiple devices
        addLightGoals(this, house);
        addShutterGoals(this, house);
        addTvGoals(this, house);

        //Additional constant beliefs for windowless rooms
        this.beliefs.declare(`windowless ${Rooms.CORRIDOR}`, true);
        this.beliefs.declare(`windowless ${Rooms.WC1}`, true);
    }



}
module.exports = {HouseAgent};



function addLightGoals(agent, house){
    for(let room of Object.entries(house.rooms)){
        for(let device of Object.entries(room[1].devices)){
            if(device[1] instanceof Light){
                //console.log(device[1].name)
                let goal = new SwitchOnLightGoal({light: device[1], room: room[1]});
                let goal2 = new SwitchOffLightGoal({light: device[1], room: room[1]});
                agent.postSubGoal(goal);
                agent.postSubGoal(goal2);
            }
        }
        
    }
}

function addShutterGoals(agent, house){
    for(let room of Object.entries(house.rooms)){
        for(let device of Object.entries(room[1].devices)){
            if(device[1] instanceof RollerShutter){
                //console.log(device[1].name)
                let goal = new SetShutterUpGoal({tv: getRoomTv(room[1]), shutter: device[1]});
                let goal2 = new SetShutterHalfGoal({tv: getRoomTv(room[1]), shutter: device[1]});
                let goal3 = new SetShutterDownGoal({tv: getRoomTv(room[1]), shutter: device[1]});
                agent.postSubGoal(goal);
                agent.postSubGoal(goal2);
                agent.postSubGoal(goal3);
            }
        }
        
    }
}

function addTvGoals(agent, house){
    for(let room of Object.entries(house.rooms)){
        for(let device of Object.entries(room[1].devices)){
            if(device[1] instanceof Television){
                //console.log(device[1].name)
                let goal = new SwitchOffTelevisionGoal({tv: device[1] , room: room[1]});
                agent.postSubGoal(goal);
            }
        }    
    }
}

function getRoomTv(room){
    for(let device of Object.entries(room.devices)){
        if(device[1] instanceof Television){
            return device[1];
        }
    }
    return null;
}