const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const PlanningGoal =  require('../../pddl/actions/pddlActionGoal')
const pddlActionIntention = require('../../pddl/actions/pddlActionIntention')
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

    class SetShutterHalfGoal extends Goal {}

    class SetShutterHalfIntention extends PlanningIntention {

        static p1 = [ [`not ${Facts.DEVICES.ON}`, 't'], [`${Facts.ILLUMINATION.HIGH}`, 'h'], [`not ${Facts.SHUTTER.HALF}`, 's']]
        static p2 = [ [`${Facts.DEVICES.ON}`, 't'], [`${Facts.ILLUMINATION.NORMAL}`, 'h'], [`not ${Facts.SHUTTER.HALF}`, 's']]

        static parameters = ['h', 's', 't']
        static precondition = this.p1;
        static effect = [ [`${Facts.SHUTTER.UP}`, 's']]
        
        static applicable (goal) {
            return ( goal instanceof SetShutterHalfGoal)
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
                let condition = pddlActionIntention.ground(this.constructor.p1, this.goal.parameters)
                if(this.agent.beliefs.check(...condition)){
                    this.goal.parameters.shutter.setHalf();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }else{
                    condition = pddlActionIntention.ground(this.constructor.p2, this.goal.parameters)
                    //console.log(this.precondition)
                    if(this.agent.beliefs.check(...condition)){
                        this.goal.parameters.shutter.setHalf();
                        //reschedule next goal
                        this.agent.postSubGoal(this.goal);
                        break;
                    }
                }
            }
        }
    }

    class SetShutterDownGoal extends Goal {}

    class SetShutterDownIntention extends PlanningIntention {

        static p1 = [ [`${Facts.DEVICES.ON}`, 't'], [`${Facts.ILLUMINATION.HIGH}`, 'h'], [`not ${Facts.SHUTTER.DOWN}`, 's']]
        static p2 = [ [`${Facts.ILLUMINATION.LOW}`, 'h'], [`not ${Facts.SHUTTER.DOWN}`, 's']]

        static parameters = ['h', 's', 't']
        static precondition = [ [`${Facts.DEVICES.ON}`, 't'], [`${Facts.ILLUMINATION.HIGH}`, 'h'], [`not ${Facts.SHUTTER.DOWN}`, 's']]
        static effect = [ [`${Facts.SHUTTER.DOWN}`, 's']]
        
        static applicable (goal) {
            return ( goal instanceof SetShutterDownGoal)
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
                let condition = pddlActionIntention.ground(this.constructor.p1, this.goal.parameters)
                if(this.agent.beliefs.check(...condition)){
                    this.goal.parameters.shutter.setDown();
                    //reschedule next goal
                    this.agent.postSubGoal(this.goal);
                    break;
                }else{
                    condition = pddlActionIntention.ground(this.constructor.p2, this.goal.parameters)
                    //console.log(this.precondition)
                    if(this.agent.beliefs.check(...condition)){
                        this.goal.parameters.shutter.setDown();
                        //reschedule next goal
                        this.agent.postSubGoal(this.goal);
                        break;
                    }
                }
            }
        }
    }

module.exports = {SetShutterUpGoal, SetShutterUpIntention, SetShutterHalfGoal, SetShutterHalfIntention, SetShutterDownGoal, SetShutterDownIntention};