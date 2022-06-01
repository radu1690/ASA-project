
// implement fridge Sensor

// implement goal notification (call it from sensor)

// sistemare planning agent : leggere il domain dal file


const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");
const { Status, Facts, WashingStatus } = require("../data");
const Device = require("../devices/Device");
const WashingDevice = require("../devices/WashingDevice");
const Fridge = require("../devices/Fridge");

class FridgeSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'FridgeSensor';
        this.activateSensor();  
    }

    activateSensor(){
        //let counter = 0;

        this.log(`${this.name} activated`)
        for (let room of Object.values(this.house.rooms)){
            
            for(let device of Object.entries(room.devices)){
                if(device[1] instanceof Fridge){
                    //counter++;
                    //console.log(device[1].name)
                    device[1].observe('supplies', (supplies, k) =>{
                        this.log(`supplies changed: ${supplies}%`)
                        let low_supplies = supplies < 30;
                        this.agent.beliefs.declare(`${Facts.DEVICES.LOW_SUPPLIES} `+device[1].name, low_supplies);
                        this.agent.beliefs.declare(`${Facts.DEVICES.NEED_TO_NOTIFY} `+device[1].name, low_supplies);
                        
                    }, this.name+'supplies')
                }
            }
        }
    }

    deactivateSensor(){
        console.log(`${this.name} de-activated`)
        for (let room of Object.values(this.house.rooms)){
            for(let device of Object.entries(room.devices)){
                if(device[1] instanceof Fridge ){
                    device[1].unobserve('supplies', null, this.name+'supplies')
                }
            }
        }
    }
}

module.exports = FridgeSensor;