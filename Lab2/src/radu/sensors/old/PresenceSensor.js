const Goal = require('../../bdi/Goal');
const Intention = require('../../bdi/Intention');
const Room = require('../Room')


class SensePresencesGoal extends Goal {

    constructor (rooms = []) {
        super()

        /** @type {Array<Room>} rooms */
        this.rooms = rooms

    }

}



class SensePresencesIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        
        /** @type {Array<Room>} rooms */
        this.rooms = this.goal.rooms
    }
    
    static applicable (goal) {
        return goal instanceof SensePresencesGoal
    }

    *exec () {
        var presencesGoals = []
        for (let l of this.rooms) {
            
            let presenceGoalPromise = new Promise( async res => {
                while (true) {
                    let people_inside = await l.notifyChange('people_inside')
                    this.log('sense: presence ' + l.name + ' changed people_inside ' + people_inside)
                    this.agent.beliefs.declare('people_inside '+l.name, people_inside!=0)
                    // if(this.people_inside == undefined){
                    //     console.log("UNDEFINED");
                    //     this.people_inside = people_inside;
                    // }else{
                    //     console.log("FOUND "+this.people_inside)
                    //     this.people_inside = people_inside;
                    // }
                    // console.log(this.agent.intentions);
                }
            });

            presencesGoals.push(presenceGoalPromise)
        }
        yield Promise.all(presencesGoals)
    }

}



class SenseOnePresenceGoal extends Goal {

    constructor (room) {
        super()

        /** @type {Room} room */
        this.room = room

    }

}



class SenseOnePresenceIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {Room} room */
        this.room = this.goal.room
    }

    static applicable (goal) {
        return goal instanceof SenseOnePresenceGoal
    }

    *exec () {
        while (true) {
            let people_inside = yield this.room.notifyChange('people_inside')
            this.log('sense: presence ' + this.room.name + ' changed people_inside ' + people_inside)
            this.agent.beliefs.declare('people_inside_yes '+this.room.name, people_inside!=0)
            this.agent.beliefs.declare('people_inside_no '+this.room.name, people_inside==0)
        }
    }

}



module.exports = {SensePresencesGoal, SensePresencesIntention, SenseOnePresenceGoal, SenseOnePresenceIntention}