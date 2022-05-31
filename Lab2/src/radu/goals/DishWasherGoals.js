const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const PlanningGoal =  require('../../pddl/actions/pddlActionGoal')
const PlanningIntention =  require('../../pddl/actions/pddlActionIntention')
const { Facts } = require('../data')


    class StartDishwasherGoal extends Goal {}

    class StartDishwasherIntention extends PlanningIntention {
        //washing machine has precedence over dishwasher, need to check if washing machine can start (if yes, wait for it)
        static parameters = ['w', 'd']
        static precondition = [ [`${Facts.DISCOUNT_TIME}`], [`not ${Facts.DEVICES.READY_TO_START}`, 'w'], [`${Facts.DEVICES.CAN_START}`, 'd'],
                    /*[`not ${Facts.DEVICES.WASHING}`, 'd'],*/ [`${Facts.DEVICES.READY_TO_START}`, 'd'], [`not ${Facts.DEVICES.READY_TO_RESUME}`, 'w']]
        //static effect = [ [`${Facts.DEVICES.ON}`, 'l']]
        
        static applicable (goal) {
            return ( goal instanceof StartDishwasherGoal)
        }
        
        *exec () {
            //let room = this.goal.parameters.room;
            this.goal.parameters.w = this.goal.parameters.washing_machine.name;
            this.goal.parameters.d = this.goal.parameters.dishwasher.name;
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
                    this.goal.parameters.dishwasher.startWashing();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }


    class ResumeDishwasherGoal extends Goal {}

    class ResumeDishwasherIntention extends PlanningIntention {

        static parameters = ['w', 'd']
        static precondition = [ [`${Facts.DISCOUNT_TIME}`], [`not ${Facts.DEVICES.READY_TO_RESUME}`, 'w'], [`${Facts.DEVICES.CAN_START}`, 'd'],
                /*[`not ${Facts.DEVICES.WASHING}`, 'd'],*/ [`${Facts.DEVICES.READY_TO_RESUME}`, 'd'], [`not ${Facts.DEVICES.READY_TO_START}`, 'w']]
        //static effect = [ [`${Facts.DEVICES.ON}`, 'l']]
        
        static applicable (goal) {
            return ( goal instanceof ResumeDishwasherGoal)
        }
        
        *exec () {
            //let room = this.goal.parameters.room;
            this.goal.parameters.w = this.goal.parameters.washing_machine.name;
            this.goal.parameters.d = this.goal.parameters.dishwasher.name;
            while(true){
                yield this.agent.beliefs.notifyAnyChange();
                
                if(this.checkPrecondition()){
                    //console.log("Achiveded goal TurnOnLight in room: "+this.goal.parameters.room.name);
                    //this.applyEffect();
                    this.goal.parameters.dishwasher.resume();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }

    class PauseDishwasherGoal extends Goal {}

    class PauseDishwasherIntention extends PlanningIntention {
        static parameters = ['d']
        static precondition = [ [`${Facts.POWER}`], [`${Facts.DEVICES.WASHING}`, 'd']]
        
        
        static applicable (goal) {
            return ( goal instanceof PauseDishwasherGoal)
        }
        
        *exec () {
            //let room = this.goal.parameters.room;
            //this.goal.parameters.w = this.goal.parameters.washing_machine.name;
            this.goal.parameters.d = this.goal.parameters.dishwasher.name;
            while(true){
                yield this.agent.beliefs.notifyAnyChange();
                
                if(this.checkPrecondition()){
                    //console.log("Achiveded goal TurnOnLight in room: "+this.goal.parameters.room.name);
                    //this.applyEffect();
                    this.goal.parameters.dishwasher.pause();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }

module.exports = {StartDishwasherGoal, StartDishwasherIntention, ResumeDishwasherGoal, ResumeDishwasherIntention, PauseDishwasherGoal, PauseDishwasherIntention};