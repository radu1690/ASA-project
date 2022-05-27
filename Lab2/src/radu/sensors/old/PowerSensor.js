const Goal = require('../../bdi/Goal');
const Intention = require('../../bdi/Intention');
const House = require('./../House');


const limit = 2500;

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

    //DOES NOT UPDATE CONSECUTIVE CHANGES

    // *exec () {
    //     while (true) {
    //         let power = yield this.house.utilities.electricity.notifyChange('consumption');
    //         this.log('sense: global power consumption  changed: ' + power + ' watts');
    //         if(power >= limit){
    //             this.agent.beliefs.declare("exceeded_power", true);
    //         }else{
    //             this.agent.beliefs.declare("exceeded_power", false);
    //         }
    //     }
    // }

    //THIS UPDATES ALSO CONSECUTIVE CHANGES
    
    *exec() {
        yield this.house.utilities.electricity.observe('consumption', (power, k)=>{
            this.log('sense: global power consumption  changed: ' + power + ' watts');
            if(power >= limit){
                this.agent.beliefs.declare("exceeded_power", true);
            }else{
                this.agent.beliefs.declare("exceeded_power", false);
            }
        })
    }

}



module.exports = {SensePowerGoal, SensePowerIntention}