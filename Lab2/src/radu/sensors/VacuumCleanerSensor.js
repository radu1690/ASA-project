const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");
const { Rooms } = require("../data");
const { VacuumCleanerAgent } = require("../pddl/VacuumCleanerAgent");

class VacuumCleanerSensor extends Sensor {

    /**
     * 
     * @param {VacuumCleanerAgent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        if(!(agent instanceof VacuumCleanerAgent)){
            throw new Error('Agent is not a VacuumCleanerAgent!');
        }
        this.name = 'VacuumCleanerSensor';
        this.activateSensor();  
    }

    activateSensor(){
        this.log(`${this.name} activated`)
        for (let room of Object.values(this.house.rooms)){
            
            //save the house plan
            for(let connection of Object.values(room.doors_to)){
                this.agent.beliefs.declare(`connected ${room.name} ${connection}`)
            }
            for(let connection of Object.values(room.connected_to)){
                this.agent.beliefs.declare(`connected ${room.name} ${connection}`)
            }
    
            //assume every room has a sensor which will send the information to the vacuum cleaner agent
            room.observe('clean', (clean, k) =>{
                if(room.name != Rooms.BALCONY){
                    this.log(room.name, 'clean', clean);
                    this.agent.beliefs.declare('clean '+room.name, clean)
                    //console.log(counter)
                }
                
            }, this.name+'clean');
            
            //observe current location
            this.agent.robot.observe('location',(location, k) => {
                this.agent.beliefs.declare('location ' + location.name, true);
                this.log(`${this.house.vaccumCleaner.name} moved to ${location.name}`)
                if(this.house.vaccumCleaner.previous_location != location){
                    this.agent.beliefs.declare('location ' + this.house.vaccumCleaner.previous_location.name, false);
                }
            }, this.name+'location' );

            //observe battery_level
            this.agent.robot.observe('battery_level',(battery_level, k) => {
                this.agent.beliefs.declare('battery_100 ', battery_level >= 100);
                this.agent.beliefs.declare('battery_90 ', battery_level >= 90);
                this.agent.beliefs.declare('battery_80 ', battery_level >= 80);
                this.agent.beliefs.declare('battery_70 ', battery_level >= 70);
                this.agent.beliefs.declare('battery_60 ', battery_level >= 60);
                this.agent.beliefs.declare('battery_50 ', battery_level >= 50);
                this.agent.beliefs.declare('battery_40 ', battery_level >= 40);
                this.agent.beliefs.declare('battery_30 ', battery_level >= 30);
                this.agent.beliefs.declare('battery_20 ', battery_level >= 20);
                this.agent.beliefs.declare('battery_10 ', battery_level >= 10);
            }, this.name+'battery_level' );
        }
    }

    deactivateSensor(){
        console.log(`${this.name} de-activated`)
        for (let room of Object.values(this.house.rooms)){
    
            room.unobserve('clean', null, this.name+'clean')
            
        }
        this.house.vaccumCleaner.unobserve('location', null, this.name+'vacuum' );
    }
}

module.exports = VacuumCleanerSensor;