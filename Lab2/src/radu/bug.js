const Beliefset =  require('../bdi/Beliefset')
const Observable =  require('../utils/Observable')
const Clock =  require('../utils/Clock')
const Agent = require('../bdi/Agent')
const Goal = require('../bdi/Goal')
const Intention = require('../bdi/Intention')
const House = require('./House')
const {SenseActivitiesGoal, SenseActivitiesIntention, SenseOneActivityGoal, SenseOneActivityIntention} = require('./sensors/ActivitySensor')
const {SensePresencesGoal, SensePresencesIntention, SenseOnePresenceGoal, SenseOnePresenceIntention} = require('./sensors/PresenceSensor')
const {SenseIlluminationsGoal, SenseIlluminationsIntention, SenseOneIlluminationGoal, SenseOneIlluminationIntention} = require('./sensors/IlluminationSensor')
const {SensePowerGoal, SensePowerIntention} = require('./sensors/PowerSensor')
const {SenseLightsGoal, SenseLightsIntention, SenseOneLightGoal, SenseOneLightIntention} = require('./sensors/LightSensor')
var house = new House()

//house.people.john.observe('in_room', (v, k)=>console.log('in_room John ' + v.name) )
Clock.startTimer()
//Clock.wallClock()
house.utilities.electricity.observe('consumption', (v, k)=>console.log('CONSUMPTION OBSERVER ' + v) )

// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    //the sensor can detect only one change in a given time...
    //here the sensor detects only the first change in power consumption
    if(time.hh==6 && time.mm==30){
        house.rooms.kitchen.devices.kitchen_dishwasher.startWashing();
        house.rooms.wc1.devices.wc1_washing_machine.startWashing();
        house.rooms.living_room.devices.living_room_television.switchOnTelevision();
    }
    if(time.hh==6 && time.mm==45){
        //house.rooms.wc1.devices.wc1_washing_machine.startWashing();
    }
    if(time.hh==7 && time.mm==0){
        house.rooms.wc1.devices.wc1_washing_machine.finish();
    }
    if(time.hh==7 && time.mm==15){
        house.rooms.kitchen.devices.kitchen_dishwasher.finish();
    }
})


// Agents
var myAgent = new Agent('houseAgent')

//activity sensor
myAgent.intentions.push(SenseActivitiesIntention)
myAgent.postSubGoal( new SenseActivitiesGoal( [house.people.john] ) )

//presence sensor
myAgent.intentions.push(SensePresencesIntention)
myAgent.postSubGoal(new SensePresencesGoal(Object.values(house.rooms)))

//illumination sensor
myAgent.intentions.push(SenseIlluminationsIntention)
myAgent.postSubGoal(new SenseIlluminationsGoal(Object.values(house.rooms)))

//power sensor
myAgent.intentions.push(SensePowerIntention)
myAgent.postSubGoal(new SensePowerGoal(house))

myAgent.intentions.push(SenseLightsIntention)
myAgent.postSubGoal(new SenseLightsGoal([house.rooms.kitchen.devices.kitchen_lights_1]))


function setSunIlluminationLow(){
    for (let room of Object.values(house.rooms)){
        if(room.name != "wc1"){
            room.setIlluminationLow();
        }
    }
}

function setSunIlluminationNormal(){
    for (let room of Object.values(house.rooms)){
        if(room.name != "wc1"){
            room.setIlluminationNormal();
        }
    }
}

function setSunIlluminationHigh(){
    for (let room of Object.values(house.rooms)){
        if(room.name != "wc1"){
            room.setIlluminationHigh();
        }
    }
}
