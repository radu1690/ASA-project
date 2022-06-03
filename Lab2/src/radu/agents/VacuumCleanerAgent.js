const pddlActionIntention = require('../../pddl/actions/pddlActionIntention')
const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const Intention = require('../../bdi/Intention')
const PlanningGoal = require('../../pddl/PlanningGoal')
const VacuumCleaner = require('../devices/VacuumCleaner')
const Room = require('../Room')
const fs = require('fs')
const VacuumCleanerSensor = require('../sensors/VacuumCleanerSensor')



class VacuumCleanerAgent extends Agent {
    /** @type {Room[]} */
    rooms;
    /** @type {VacuumCleaner} */
    robot;

    
    constructor(name, house, robot){
        super(name);
        this.rooms = house.rooms;
        this.robot = robot;
        let {OnlinePlanning} = require('../../pddl/CustomOnlinePlanner')([Move, Clean, Recharge]);
        this.intentions.push(OnlinePlanning);
        
        this.beliefs.declare(`recharge_room ${this.robot.recharge_room.name}`, true);
        //domain pddl file
        this.domain = fs.readFileSync('./pddl_domains/vacuumCleaner.pddl', 'utf8');

        //Sensor
        //this will save the house plan in the beliefset of the agent
        //and will update the battery_level, the location and the cleaness of each room
        var vacuumCleanerSensor = new VacuumCleanerSensor(this, house);
    }
}


class Move extends pddlActionIntention {
    static parameters = ['from', 'to'];
    static precondition = [];
    static effect = [];
    *exec ({from, to}=parameters) {
        this.agent.robot.moveTo(this.agent.rooms[to]);
        //console.log(`Moving from ${from} to ${to}`)
    }
}

class Clean extends pddlActionIntention {
    static parameters = ['room'];
    static precondition = [];
    static effect = [];
    *exec ({room}=parameters) {
        this.agent.robot.cleanRoom();
        //console.log(`Cleaning ${room}`)
    }
    
}

class Recharge extends pddlActionIntention {
    static parameters = ['room'];
    static precondition = [];
    static effect = [];
    *exec ({room}=parameters) {
        this.agent.robot.recharge();
        //console.log(`Battery recharged in room ${room}`)
    }
    
}
module.exports = {VacuumCleanerAgent};