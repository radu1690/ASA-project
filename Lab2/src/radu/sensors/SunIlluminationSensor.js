const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");
const { Illumination } = require("../data");

class SunIlluminationSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'SunIlluminationSensor';

        this.activateSensor();
    }

    activateSensor(){
        this.log(`${this.name} activated`)
        this.house.observe('sun_illumination', (illumination, k)=>{
            this.log('Sun illumination  changed: ' + illumination);
            this.agent.beliefs.declare('sun_illumination_low house', illumination==Illumination.LOW)
            this.agent.beliefs.declare('sun_illumination_normal house', illumination==Illumination.NORMAL)
            this.agent.beliefs.declare('sun_illumination_high house', illumination==Illumination.HIGH)
        }, this.name)
    }

    deactivateSensor(){
        this.log(`${this.name} de-activated`)
        this.house.unobserve('sun_illumination', null, this.name);
    }
}

module.exports = SunIlluminationSensor;