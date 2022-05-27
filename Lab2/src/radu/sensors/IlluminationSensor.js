const Goal = require('../../bdi/Goal');
const Intention = require('../../bdi/Intention');
const Room = require('./../Room')


class SenseIlluminationsGoal extends Goal {

    constructor (rooms = []) {
        super()

        /** @type {Array<Room>} rooms */
        this.rooms = rooms

    }

}



class SenseIlluminationsIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        
        /** @type {Array<Room>} room */
        this.rooms = this.goal.rooms
    }
    
    static applicable (goal) {
        return goal instanceof SenseIlluminationsGoal
    }

    *exec () {
        var illuminationsGoals = []
        for (let l of this.rooms) {
            
            let illuminationGoalPromise = new Promise( async res => {
                while (true) {
                    let illumination = await l.notifyChange('sun_illumination')
                    this.log('sense: illumination ' + l.name + ' is ' + illumination)
                    this.agent.beliefs.declare('sun_illumination_low '+l.name, illumination=='ow')
                    this.agent.beliefs.declare('sun_illumination_normal '+l.name, illumination=='normal')
                    this.agent.beliefs.declare('sun_illumination_high '+l.name, illumination=='high')
                }
            });

            illuminationsGoals.push(illuminationGoalPromise)
        }
        yield Promise.all(illuminationsGoals)
    }

}



class SenseOneIlluminationGoal extends Goal {

    constructor (room) {
        super()

        /** @type {Room} room */
        this.room = room

    }

}



class SenseOneIlluminationIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {Room} room */
        this.room = this.goal.room
    }

    static applicable (goal) {
        return goal instanceof SenseOneIlluminationGoal
    }

    *exec () {
        while (true) {
            let illumination = yield this.room.notifyChange('sun_illumination')
            this.log('sense: illumination ' + this.room.name + ' is ' + illumination)
            this.agent.beliefs.declare('sun_illumination_low '+this.room.name, illumination=='low')
            this.agent.beliefs.declare('sun_illumination_normal '+this.room.name, illumination=='normal')
            this.agent.beliefs.declare('sun_illumination_high '+this.room.name, illumination=='high')
        }
    }

}



module.exports = {SenseIlluminationsGoal, SenseIlluminationsIntention, SenseOneIlluminationGoal, SenseOneIlluminationIntention}