const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");

class PresenceSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'PresenceSensor';
        this.activateSensor();  
    }

    activateSensor(){
        this.log(`${this.name} activated`)
        for (let room of Object.values(this.house.rooms)){
            room.observe('people_inside', (n, k) =>{
                this.log('People inside', room.name, n);
                this.agent.beliefs.declare('people_inside '+room.name, n > 0)
                //console.log(counter)
            }, this.name)
            
        }
    }

    deactivateSensor(){
        console.log(`${this.name} de-activated`)
        for (let room of Object.values(this.house.rooms)){
            for(let device of Object.entries(room.devices)){
                if(device[1].constructor.name == "Light"){
                    device[1].unobserve('status', null, this.name)
                }
            }
        }
    }
}

module.exports = PresenceSensor;