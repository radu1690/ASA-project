const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const PlanningGoal =  require('../../pddl/actions/pddlActionGoal')
const pddlActionIntention = require('../../pddl/actions/pddlActionIntention')
const PlanningIntention =  require('../../pddl/actions/pddlActionIntention')
const { Facts } = require('../data')


    class SwitchOnLightGoal extends Goal {}

    class SwitchOnLightIntention extends PlanningIntention {

        //precondition for windowed rooms
        static p1 = [ [`not ${Facts.DEVICES.ON}`, 'l'], [`${Facts.ROOM.LIGHT_NEEDED}`, 'r'], [`${Facts.ILLUMINATION.LOW}`, 'h']];
        //precondition for rooms without a window
        static p2 = [ [`not ${Facts.DEVICES.ON}`, 'l'], [`${Facts.ROOM.LIGHT_NEEDED}`, 'r'], [`windowless`, 'r']]


        static parameters = ['l', 'r', 'h']
        static precondition = [ ]
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
                let condition = pddlActionIntention.ground(this.constructor.p1, this.goal.parameters)
                
                if(this.agent.beliefs.check(...condition)){
                    //console.log("Achiveded goal TurnOnLight in room: "+this.goal.parameters.room.name);
                    //this.applyEffect();
                    this.goal.parameters.light.switchOn();
                    //reschedule next goal

                    //for power goal use: 
                    // yield this.agent.beliefs.notifyAnyChange();
                    // console.log("SWITCH LIGHT GOAL "+ this.goal.parameters.light.name)
                    this.agent.postSubGoal(this.goal);
                    break;
                }else{
                    condition = pddlActionIntention.ground(this.constructor.p2, this.goal.parameters);
                    if(this.agent.beliefs.check(...condition)){
                        this.goal.parameters.light.switchOn();
                        this.agent.postSubGoal(this.goal);
                        break;
                    }
                }
            }
        }
    }

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


module.exports = {SwitchOnLightGoal, SwitchOnLightIntention, SwitchOffLightGoal, SwitchOffLightIntention};