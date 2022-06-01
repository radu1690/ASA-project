const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const PlanningGoal =  require('../../pddl/actions/pddlActionGoal')
const PlanningIntention =  require('../../pddl/actions/pddlActionIntention')
const { Facts } = require('../data')


    class SwitchOffTelevisionGoal extends Goal {}

    class SwitchOffTelevisionIntention extends PlanningIntention {

        static parameters = ['t', 'r']
        static precondition = [ [`${Facts.DEVICES.ON}`, 't'], [`${Facts.ROOM.NOONE_WATCHING_TELEVISION}`, 'r']]
        static effect = [ [`not ${Facts.DEVICES.ON}`, 't']]
        
        static applicable (goal) {
            return ( goal instanceof SwitchOffTelevisionGoal)
        }
        
        *exec () {
            //let room = this.goal.parameters.room;
            this.goal.parameters.t = this.goal.parameters.tv.name;
            this.goal.parameters.r = this.goal.parameters.room.name;
            while(true){
                yield this.agent.beliefs.notifyAnyChange();
                if(this.checkPrecondition()){
                    //console.log("Achiveded goal TurnOffLight in room: "+this.goal.parameters.room.name);
                    //this.applyEffect();
                    this.goal.parameters.tv.switchOff();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }

module.exports = {SwitchOffTelevisionGoal, SwitchOffTelevisionIntention};

