const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");
const { Rooms } = require("../data");

class VacuumCleanerSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'VacuumCleanerSensor';
        this.activateSensor();  
    }

    activateSensor(){
        //let counter = 0;
        this.log(`${this.name} activated`)
        for (let room of Object.values(this.house.rooms)){
            
            for(let connection of Object.values(room.doors_to)){
                this.agent.beliefs.declare(`connected ${room.name} ${connection}`)
            }
            for(let connection of Object.values(room.connected_to)){
                this.agent.beliefs.declare(`connected ${room.name} ${connection}`)
            }
    
            room.observe('clean', (clean, k) =>{
                if(room.name != Rooms.BALCONY){
                    this.log(room.name, 'clean', clean);
                    this.agent.beliefs.declare('clean '+room.name, clean)
                    //console.log(counter)
                }
                
            }, this.name+'clean');
            
            this.house.vaccumCleaner.observe('location',(location, k) => {
                this.agent.beliefs.declare('location ' + location.name, true);
                this.log(`${this.house.vaccumCleaner.name} moved to ${location.name}`)
                if(this.house.vaccumCleaner.previous_location != location){
                    this.agent.beliefs.declare('location ' + this.house.vaccumCleaner.previous_location.name, false);
                }
            }, this.name+'vacuum' );
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