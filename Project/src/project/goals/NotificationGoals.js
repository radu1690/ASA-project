const Goal = require('../../bdi/Goal')
const PlanningIntention =  require('../../pddl/actions/pddlActionIntention')
const { Facts } = require('../utils/data')


    //notifies when the washing device finishes washing
    class NotificationWashingDeviceGoal extends Goal {}

    class NotificationWashingDeviceIntention extends PlanningIntention {

        static parameters = ['d']
        static precondition = [ [`${Facts.DEVICES.FINISHED}`, 'd']]
        static effect = [[`not ${Facts.DEVICES.FINISHED}`, 'd']]
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


    class NotifyLowSuppliesGoal extends Goal {}

    class NotifyLowSuppliesIntention extends PlanningIntention {

        static parameters = ['f']
        static precondition = [ [`${Facts.DEVICES.LOW_SUPPLIES}`, 'f'], [`${Facts.DEVICES.NEED_TO_NOTIFY}`, 'f']]
        static effect = [[`not ${Facts.DEVICES.NEED_TO_NOTIFY}`, 'f']]
        static applicable (goal) {
            return ( goal instanceof NotifyLowSuppliesGoal)
        }
        
        *exec () {
            let device = this.goal.parameters.device;

            this.goal.parameters.f = device.name;
            while(true){
                yield this.agent.beliefs.notifyAnyChange();
                if(this.checkPrecondition()){
                    this.goal.parameters.speaker.notify(`${device.name} is running out of supplies!`);
                    //need to apply the effect because no device will negate this fact
                    this.applyEffect();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }
            }
        }
    }

    

module.exports = {NotificationWashingDeviceGoal, NotificationWashingDeviceIntention, NotifyLowSuppliesGoal, NotifyLowSuppliesIntention};