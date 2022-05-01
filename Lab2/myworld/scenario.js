const Beliefset =  require('../bdi/Beliefset')
const Observable =  require('../utils/Observable')
const Clock =  require('../utils/Clock')
const Agent = require('../bdi/Agent')
const Goal = require('../bdi/Goal')
const Intention = require('../bdi/Intention')
const House = require('./house')



var house = new House()

house.people.john.observe('in_room', (v, k)=>console.log('in_room John ' + v.name) )

Clock.startTimer()
//Clock.wallClock()


// Daily schedule
Clock.global.observe('mm', (key, mm) => {
    var time = Clock.global
    if(time.hh==8 && time.mm==0)
        house.people.john.moveTo(house.rooms.wc1.name)
    if(time.hh==8 && time.mm==15)
        house.people.john.moveTo(house.rooms.kitchen.name)
    if(time.hh==9 && time.mm==0)
        house.people.john.moveTo(house.rooms.room2.name)
    if(time.hh==12 && time.mm==0)
        house.people.john.moveTo(house.rooms.kitchen.name)
    if(time.hh==13 && time.mm==30)
        house.people.john.moveTo(house.rooms.living_room.name)
    if(time.hh==19 && time.mm==0)
        house.people.john.moveTo(house.rooms.balcony.name)
    if(time.hh==20 && time.mm==15)
        house.people.john.moveTo(house.rooms.room3.name)
})



var a1 = new Agent('house_agent')

class SetupAlarm extends Goal {

}

class MyAlarm extends Intention {
    static applicable(goal) {
        return goal instanceof SetupAlarm
    }   
    *exec () {
        while(true) {
            yield Clock.global.notifyChange('mm')
            if (Clock.global.hh == 6) {
                console.log('ALARM, it\'s 6am!')
                break;
            }
        }
    }
}

a1.intentions.push(MyAlarm)

a1.postSubGoal(new SetupAlarm({hh:6, mm:0}))