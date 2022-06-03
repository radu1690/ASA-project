const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../house/House");
const { Power, Facts, WashingDevices } = require("../utils/data");

class PowerSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'PowerSensor';
        this.limit = Power.LIMIT;

        this.activateSensor();
    }

    activateSensor(){
        this.log(`${this.name} activated`)
        this.house.utilities.electricity.observe('consumption', (power, k)=>{
            this.log('Global power consumption  changed: ' + power + ' watts');

            //check if it's exceeding power limit
            if(power >= this.limit){
                this.agent.beliefs.declare(Facts.POWER, true);
                this.log('exceeding power limit!')
            }else{
                this.agent.beliefs.declare(Facts.POWER, false);
            }

            //check if washing machine and/or dishwasher can start staying withing power limit
            let can_start_wm = (power + Power.WASHINGMACHINE < this.limit);
            let can_start_d = (power + Power.DISHWASHER < this.limit);
            this.agent.beliefs.declare(`${Facts.DEVICES.CAN_START} ${WashingDevices.WASHINGMACHINE}`, can_start_wm);
            this.agent.beliefs.declare(`${Facts.DEVICES.CAN_START} ${WashingDevices.DISHWASHER}`, can_start_d);
        }, this.name)
    }

    deactivateSensor(){
        this.log(`${this.name} de-activated`)
        this.house.utilities.electricity.unobserve('consumption', null, this.name);
    }
}

module.exports = PowerSensor;