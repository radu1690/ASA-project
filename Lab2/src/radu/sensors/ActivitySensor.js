const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");

class ActivitySensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'ActivitySensor';
        
        this.activateSensor();
    }

    activateSensor(){
        //let counter = 0;
        this.log(`${this.name} activated`)
        for (let person of Object.values(this.house.people)){
            person.observe('activity', (activity, k) =>{
                this.log(person.name, activity);
                this.agent.beliefs.declare('activity_sleeping '+person.name, activity=='sleeping')
                this.agent.beliefs.declare('activity_awake '+person.name, activity=='awake')
                this.agent.beliefs.declare('activity_watching_television '+person.name, activity=='watching_television')
            }, this.name)
        }
    }

    deactivateSensor(){
        this.log(`${this.name} de-activated`)
        for (let person of Object.values(this.house.people)){
            person.observe('activity', null, this.name)
        }
    }
}

module.exports = ActivitySensor;