const Goal = require('../../bdi/Goal');
const Intention = require('../../bdi/Intention');
const House = require('./../House');




class SensePowerGoal extends Goal {

    constructor (house) {
        super()

        /** @type {House} house */
        this.house = house

    }

}



class SensePowerIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {House} house */
        this.house = this.goal.house
    }

    static applicable (goal) {
        return goal instanceof SensePowerGoal
    }

    *exec () {
        while (true) {
            let power = yield this.house.utilities.electricity.notifyChange('consumption')
            this.log('sense: global power consumption  changed: ' + power + ' watts')
        }
    }

}



module.exports = {SensePowerGoal, SensePowerIntention}