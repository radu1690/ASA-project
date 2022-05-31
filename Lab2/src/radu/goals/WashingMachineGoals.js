const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const PlanningGoal =  require('../../pddl/actions/pddlActionGoal')
const PlanningIntention =  require('../../pddl/actions/pddlActionIntention')
const { Facts } = require('../data')


    class StartWashingMachineGoal extends Goal {}

    class StartWashingMachineIntention extends PlanningIntention {

        static parameters = ['w', 'd']
        static precondition = [ [`${Facts.DISCOUNT_TIME}`], [`${Facts.DEVICES.READY_TO_START}`, 'w'], [`${Facts.DEVICES.CAN_START}`, 'w'],
                    [`not ${Facts.DEVICES.WASHING}`, 'd']]
        //static effect = [ [`${Facts.DEVICES.ON}`, 'l']]
        
        static applicable (goal) {
            return ( goal instanceof StartWashingMachineGoal)
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
                    this.goal.parameters.washing_machine.startWashing();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }


    class ResumeWashingMachineGoal extends Goal {}

    class ResumeWashingMachineIntention extends PlanningIntention {

        static parameters = ['w', 'd']
        static precondition = [ [`${Facts.DISCOUNT_TIME}`], [`${Facts.DEVICES.READY_TO_RESUME}`, 'w'], [`${Facts.DEVICES.CAN_START}`, 'w'],
                [`not ${Facts.DEVICES.WASHING}`, 'd']]
        //static effect = [ [`${Facts.DEVICES.ON}`, 'l']]
        
        static applicable (goal) {
            return ( goal instanceof ResumeWashingMachineGoal)
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
                    this.goal.parameters.washing_machine.resume();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }

    class PauseWashingMachineGoal extends Goal {}

    class PauseWashingMachineIntention extends PlanningIntention {
        //if the dishwasher is washing, wait for it to pause and re-check if it's needed to pause too
        static parameters = ['w', 'd']
        static precondition = [ [`${Facts.POWER}`], [`${Facts.DEVICES.WASHING}`, 'w'], [`not ${Facts.DEVICES.WASHING}`, 'd']]
        
        
        static applicable (goal) {
            return ( goal instanceof PauseWashingMachineGoal)
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
                    this.goal.parameters.washing_machine.pause();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }

module.exports = {StartWashingMachineGoal, StartWashingMachineIntention, ResumeWashingMachineGoal, ResumeWashingMachineIntention, PauseWashingMachineGoal, PauseWashingMachineIntention};