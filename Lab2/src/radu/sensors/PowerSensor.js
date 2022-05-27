const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");

class PowerSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'PowerSensor';
        this.limit = 2500;

        this.activateSensor();
    }

    activateSensor(){
        this.log(`${this.name} activated`)
        this.house.utilities.electricity.observe('consumption', (power, k)=>{
            this.log('Global power consumption  changed: ' + power + ' watts');
            if(power >= this.limit){
                this.agent.beliefs.declare("exceeded_power", true);
            }else{
                this.agent.beliefs.declare("exceeded_power", false);
            }
        }, this.name)
    }

    deactivateSensor(){
        this.log(`${this.name} de-activated`)
        this.house.utilities.electricity.observe('consumption', null, this.name);
    }
}

module.exports = PowerSensor;