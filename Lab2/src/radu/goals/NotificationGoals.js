const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const PlanningGoal =  require('../../pddl/actions/pddlActionGoal')
const PlanningIntention =  require('../../pddl/actions/pddlActionIntention')
const { Facts } = require('../data')


    //notifies when the washing device finishes washing
    class NotificationWashingDeviceGoal extends Goal {}

    class NotificationWashingDeviceIntention extends PlanningIntention {

        static parameters = ['d']
        static precondition = [ [`${Facts.WASHINGSTATUS.FINISHED}`, 'd']]
        static effect = [[`not ${Facts.WASHINGSTATUS.FINISHED}`, 'd']]
        static applicable (goal) {
            return ( goal instanceof NotificationWashingDeviceGoal)
        }
        
        *exec () {
            let device = this.goal.parameters.device;

            this.goal.parameters.d = device.name;
            while(true){
                yield this.agent.beliefs.notifyAnyChange();
                if(this.checkPrecondition()){
                    
                    this.goal.parameters.speaker.notify(`${device.name} finished its washing cycle!`);
                    //need to apply the effect because no device will negate this fact
                    this.applyEffect();
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

    

module.exports = {NotificationWashingDeviceGoal, NotificationWashingDeviceIntention};