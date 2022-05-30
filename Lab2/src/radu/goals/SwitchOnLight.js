const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const PlanningGoal =  require('../../pddl/actions/pddlActionGoal')
const PlanningIntention =  require('../../pddl/actions/pddlActionIntention')
const { Facts } = require('../data')


    class SwitchOnLightGoal extends Goal {}

    class SwitchOnLightIntention extends PlanningIntention {

        static parameters = ['l', 'r', 'h']
        static precondition = [ [`not ${Facts.DEVICES.ON}`, 'l'], [`${Facts.ROOM.LIGHT_NEEDED}`, 'r'], [`${Facts.ILLUMINATION.LOW}`, 'h']]
        static effect = [ [`${Facts.DEVICES.ON}`, 'l']]
        
        static applicable (goal) {
            return ( goal instanceof SwitchOnLightGoal)
        }
        
        *exec () {
            //let room = this.goal.parameters.room;
            this.goal.parameters.l = this.goal.parameters.light.name;
            this.goal.parameters.r = this.goal.parameters.room.name;
            this.goal.parameters.h = 'house'
            while(true){
                yield this.agent.beliefs.notifyAnyChange();
                
                //console.log('NOTIFY')
                //console.log(this.precondition)
                // if(this.checkPrecondition()){
                //     console.log(this.precondition)
                //     yield
                // }
                if(this.checkPrecondition()){
                    //console.log("Achiveded goal TurnOnLight in room: "+this.goal.parameters.room.name);
                    //this.applyEffect();
                    this.goal.parameters.light.switchOn();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }

module.exports = {SwitchOnLightGoal, SwitchOnLightIntention};