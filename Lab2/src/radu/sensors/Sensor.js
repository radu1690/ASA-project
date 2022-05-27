const chalk = require("chalk");
const Agent = require("../../bdi/Agent");
const Observable = require("../../utils/Observable");
const House = require("../House");

class Sensor extends Observable {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super();
        this.house = house;
        this.agent = agent;
        this.name = 'tmp';
        //this.activateSensor();
 
    }

    activateSensor(){
        
    }

    deactivateSensor(){
        
    }

    log(... args){
        let header = this.name + ': ';
        console.log(chalk.yellow(header, ...args))
    }
}

module.exports = Sensor;