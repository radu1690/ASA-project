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

var house = new House()

//house.people.john.observe('in_room', (v, k)=>console.log('in_room John ' + v.name) )

Clock.startTimer()
//Clock.wallClock()


// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    if(time.hh==6 && time.mm==30){
        setSunIlluminationNormal()
    }
    if(time.hh==7 && time.mm==0){
        house.people.john.idle()
        house.people.john.moveTo(house.rooms.wc1)
        house.rooms.wc1.devices.wc1_light.switchOnLight();
    }
    if(time.hh==7 && time.mm==15){
        house.rooms.wc1.devices.wc1_light.switchOffLight();
        house.people.john.moveTo(house.rooms.kitchen)
    }
    if(time.hh==8 && time.mm==0){
        house.people.john.moveTo(house.rooms.living_room)
        house.people.john.watch_television()
    }
    if(time.hh==9 && time.mm==15){
        house.people.john.idle()
        house.people.john.moveTo(house.rooms.room3)
    }
    if(time.hh==12 && time.mm==0){
        house.people.john.moveTo(house.rooms.kitchen)
        setSunIlluminationHigh();
    }
    if(time.hh==13 && time.mm==30){
        house.people.john.moveTo(house.rooms.living_room)
        house.people.john.watch_television()
    }
    if(time.hh==15 && time.mm==30){
        setSunIlluminationNormal()
    }
    if(time.hh==19 && time.mm==0){
        house.people.john.idle()
        house.people.john.moveTo(house.rooms.balcony)
        house.rooms.wc1.devices.wc1_washing_machine.startWashing();
    }
    if(time.hh==20 && time.mm==00){
        setSunIlluminationLow()
        house.people.john.moveTo(house.rooms.living_room)
        house.rooms.living_room.devices.living_room_light.switchOnLight()
        house.people.john.watch_television()
    }
    if(time.hh==21 && time.mm==00){
        house.rooms.wc1.devices.wc1_washing_machine.finish();
    }
    if(time.hh==21 && time.mm==15){
        house.rooms.kitchen.devices.kitchen_dishwasher.startWashing();
    }
    if(time.hh==22 && time.mm==15){
        house.rooms.kitchen.devices.kitchen_dishwasher.finish();
    }
    if(time.hh==23 && time.mm==30){
        house.rooms.living_room.devices.living_room_light.switchOffLight()
        house.people.john.moveTo(house.rooms.room3)
        house.people.john.sleep();
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