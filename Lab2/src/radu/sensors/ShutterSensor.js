const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../house/House");
const { Status, Facts, Shutter } = require("../utils/data");
const Device = require("../devices/Device");
const RollerShutter = require("../devices/RollerShutter");

class ShutterSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'ShutterSensor';
        this.activateSensor();  
    }

    activateSensor(){
        this.log(`${this.name} activated`)
        for (let room of Object.values(this.house.rooms)){
            
            for(let device of Object.entries(room.devices)){
                if(device[1] instanceof RollerShutter){
                    device[1].observe('position', (position, k) =>{
                        this.log(device[1].name, 'is', position);
                        this.agent.beliefs.declare(`${Facts.SHUTTER.UP} `+device[1].name, position==Shutter.UP);
                        this.agent.beliefs.declare(`${Facts.SHUTTER.HALF} `+device[1].name, position==Shutter.HALF);
                        this.agent.beliefs.declare(`${Facts.SHUTTER.DOWN} `+device[1].name, position==Shutter.DOWN);
                    }, this.name)
                }
            }
        }
    }

    deactivateSensor(){
        console.log(`${this.name} de-activated`)
        for (let room of Object.values(this.house.rooms)){
            for(let device of Object.entries(room.devices)){
                if(device[1] instanceof RollerShutter){
                    device[1].unobserve('position', null, this.name)
                }
            }
        }
    }
}

module.exports = ShutterSensor;