const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const PlanningGoal =  require('../../pddl/actions/pddlActionGoal')
const PlanningIntention =  require('../../pddl/actions/pddlActionIntention')
const { Facts } = require('../data')


    class SetShutterUpGoal extends Goal {}

    class SetShutterUpIntention extends PlanningIntention {

        static parameters = ['h', 's', 't']
        static precondition = [ [`not ${Facts.DEVICES.ON}`, 't'], [`${Facts.ILLUMINATION.NORMAL}`, 'h'], [`not ${Facts.SHUTTER.UP}`, 's']]
        static effect = [ [`${Facts.SHUTTER.UP}`, 's']]
        
        static applicable (goal) {
            return ( goal instanceof SetShutterUpGoal)
        }
        
        *exec () {
            
            //let room = this.goal.parameters.room;
            if(this.goal.parameters.tv != null){
                this.goal.parameters.t = this.goal.parameters.tv.name;
            }else{
                this.goal.parameters.t = null;
            }
            this.goal.parameters.s = this.goal.parameters.shutter.name;
            this.goal.parameters.h = 'house'
            //console.log(this.precondition)
            while(true){
                yield this.agent.beliefs.notifyAnyChange();
                if(this.checkPrecondition()){
                    //console.log("Achiveded goal TurnOnLight in room: "+this.goal.parameters.room.name);
                    //this.applyEffect();
                    this.goal.parameters.shutter.setUp();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }

module.exports = {SetShutterUpGoal, SetShutterUpIntention};