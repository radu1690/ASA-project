const pddlActionIntention = require('../../pddl/actions/pddlActionIntention')
const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const Intention = require('../../bdi/Intention')
const PlanningGoal = require('../../pddl/PlanningGoal')
const House = require('../House')
const VacuumCleaner = require('../devices/VacuumCleaner')
const Room = require('../Room')

/**
 * Robot agents
 */
{
    class Move extends pddlActionIntention {
        static parameters = ['from', 'to'];
        static precondition = [ ['location', 'from'], ['connected', 'from', 'to']];
        static effect = [['not location', 'from'], ['location', 'to'] ];
        *exec ({from, to}=parameters) {
            // console.log("Moving in " + to)
            // console.log(to)
            //console.log(this.agent.rooms)
            // if(this.checkPrecondition()){
            //     console.log("VIOLATION")
            // }
            this.agent.robot.moveTo(this.agent.rooms[to]);
        }
    }

    class Suck extends pddlActionIntention {
        static parameters = ['room'];
        static precondition = [ ['location', 'room']];
        static effect = [['clean', 'room'] ];
        *exec ({room}=parameters) {
            //console.log("Sucking " + room)
            // if(!this.checkPrecondition()){
            //     console.log("VIOLATION")
            // }
            this.agent.robot.cleanRoom();
        }
    }


    class CleanGoal extends Goal {
    }
    class CleanGoalIntention extends Intention {
        static applicable (goal) {
            return goal instanceof CleanGoal
        }
        *exec ({goal}=parameters) {
            let goalAchieved = yield this.agent.postSubGoal( goal )
            if (goalAchieved){
                    //console.log(goal)
                    
                    // for(let param of goal.parameters.goal){
                    //     let room = param.split(" ")[1];
                    //     this.agent.rooms[room].clean = true;
                    //     //console.log(room)
                        
                    // }
                    
                    console.log("The house has been cleaned!");
                    //console.log(this.agent.name)
                    return;
                }
            
        }
    }

    class RobotCleaner extends Agent {
        /** @type {Room[]} */
        rooms;
        /** @type {VacuumCleaner} */
        robot;

        
        constructor(name, house, robot){
            super(name);
            this.rooms = house.rooms;
            this.robot = robot;
            let {OnlinePlanning} = require('../../pddl/OnlinePlanner')([Move, Suck])
            this.intentions.push(OnlinePlanning)
            //this.intentions.push(CleanGoalIntention)
            //this.beliefs.declare('location entrance', true);
        }
    }
    module.exports = {RobotCleaner, CleanGoal};
}



