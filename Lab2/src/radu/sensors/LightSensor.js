const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");
const { Status } = require("../data");

class LightSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'LightSensor';
        this.activateSensor();  
    }

    activateSensor(){
        //let counter = 0;
        this.log(`${this.name} activated`)
        for (let room of Object.values(this.house.rooms)){
            
            for(let device of Object.entries(room.devices)){
                /*
                device is like:
                [
                    'tv_name',
                    Television{
                        ...
                    }
                ]
                */
               //console.log(device[1].constructor.name)
                if(device[1].constructor.name == "Light"){
                    //counter++;
                    
                    device[1].observe('status', (status, k) =>{
                        this.log(device[1].name, 'turned', status);
                        this.agent.beliefs.declare('light_on '+device[1].name, status==Status.ON)
                        //console.log(counter)
                    }, this.name)
                }
            }
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

module.exports = LightSensor;