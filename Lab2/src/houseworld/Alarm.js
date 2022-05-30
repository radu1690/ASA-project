const Goal = require('../bdi/Goal');
const Intention = require('../bdi/Intention');
const Clock = require('../utils/Clock');



class AlarmGoal extends Goal {
    constructor(time){
        super();
        this.hh = time.hh;
        this.mm = time.mm;
    }
}

class AlarmIntention extends Intention {
    static applicable(goal) {
        return goal instanceof AlarmGoal
    }
    async *exec(){
        while(true) {
            await Clock.global.notifyChange('mm')
            // if (Clock.global.hh == this.goal.hh) this.log('ALARM' + Clock.global.mm)
            //     yield
            if (Clock.global.hh == this.goal.hh) {
                // Log a message!
                this.log('ALARM, it\'s 6am!')
                break;
            }
        }
    }
}



module.exports = {AlarmGoal, AlarmIntention}