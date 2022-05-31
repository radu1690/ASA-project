const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const PlanningGoal =  require('../../pddl/actions/pddlActionGoal')
const PlanningIntention =  require('../../pddl/actions/pddlActionIntention')
const { Facts } = require('../data')


    class SwitchOffLightGoal extends Goal {}

    class SwitchOffLightIntention extends PlanningIntention {

        static parameters = ['l', 'r', 'h']
        static precondition = [ [`${Facts.DEVICES.ON}`, 'l'], [`not ${Facts.ROOM.LIGHT_NEEDED}`, 'r']]
        static effect = [ [`not ${Facts.DEVICES.ON}`, 'l']]
        
        static applicable (goal) {
            return ( goal instanceof SwitchOffLightGoal)
        }
        
        *exec () {
            //let room = this.goal.parameters.room;
            this.goal.parameters.l = this.goal.parameters.light.name;
            this.goal.parameters.r = this.goal.parameters.room.name;
            this.goal.parameters.h = 'house'
            while(true){
                yield this.agent.beliefs.notifyAnyChange();
                if(this.checkPrecondition()){
                    //console.log("Achiveded goal TurnOffLight in room: "+this.goal.parameters.room.name);
                    //this.applyEffect();
                    this.goal.parameters.light.switchOff();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }

module.exports = {SwitchOffLightGoal, SwitchOffLightIntention};


