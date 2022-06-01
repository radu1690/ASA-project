const pddlActionIntention = require('../../pddl/actions/pddlActionIntention')
const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const Intention = require('../../bdi/Intention')
const PlanningGoal = require('../../pddl/PlanningGoal')
const VacuumCleaner = require('../devices/VacuumCleaner')
const Room = require('../Room')
const fs = require('fs')


    class Move extends pddlActionIntention {
        static parameters = ['from', 'to'];
        static precondition = [ ];
        static effect = [];
        *exec ({from, to}=parameters) {
            this.agent.robot.moveTo(this.agent.rooms[to]);
            //console.log(`Moving from ${from} to ${to}`)
        }
    }

    class Clean extends pddlActionIntention {
        static parameters = ['room'];
        static precondition = [ ];
        static effect = [];
        *exec ({room}=parameters) {
            this.agent.robot.cleanRoom();
            //console.log(`Cleaning ${room}`)
        }
        
    }

    class Recharge extends pddlActionIntention {
        static parameters = ['room'];
        static precondition = [ ];
        static effect = [];
        *exec ({room}=parameters) {
            this.agent.robot.recharge();
            //console.log(`Battery recharged in room ${room}`)
        }
        
    }

class VacuumCleanerAgent extends Agent {
    /** @type {Room[]} */
    rooms;
    /** @type {VacuumCleaner} */
    robot;

    
    constructor(name, house, robot){
        super(name);
        this.rooms = house.rooms;
        this.robot = robot;
        let {OnlinePlanning} = require('../../pddl/OnlinePlanner2')([Move, Clean, Recharge]);
        this.intentions.push(OnlinePlanning);
        console.log(this.robot.recharge_room);
        this.beliefs.declare(`recharge_room ${this.robot.recharge_room.name}`, true);
        this.domain = fs.readFileSync('./battery_domain.pddl', 'utf8');
    }
}
module.exports = {VacuumCleanerAgent};