const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../house/House");
const { Facts, Observable } = require("../utils/data");

/**
 * This sensor detects if there are people in a room and if they are all sleeping or watching tv
 */
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
        this.log(`${this.name} activated`)
        
        
        for (let room of Object.values(this.house.rooms)){
            room.observe(`${Observable.PEOPLE_INSIDE}`, (n, k) =>{
                this.agent.beliefs.declare(`${Facts.ROOM.PEOPLE_INSIDE} `+room.name, n > 0)

                let light_needed = !(room.people_inside == 0 || room.people_inside == room.people_sleeping + room.people_watching_tv);
                this.agent.beliefs.declare(`${Facts.ROOM.LIGHT_NEEDED} `+room.name, light_needed);
                
            }, this.name)
            
        }

        
        for (let room of Object.values(this.house.rooms)){
            room.observe(`${Observable.PEOPLE_SLEEPING}`, (n, k) =>{
                let light_needed = !(room.people_inside == 0 || room.people_inside == room.people_sleeping + room.people_watching_tv);
                this.agent.beliefs.declare(`${Facts.ROOM.LIGHT_NEEDED} `+room.name, light_needed);
                
            }, this.name)
        }

        
        for (let room of Object.values(this.house.rooms)){
            room.observe(`${Observable.PEOPLE_WATCHING_TELEVISION}`, (n, k) =>{
                let light_needed = !(room.people_inside == 0 || room.people_inside == room.people_sleeping + room.people_watching_tv);
                this.agent.beliefs.declare(`${Facts.ROOM.LIGHT_NEEDED} `+room.name, light_needed);
                this.agent.beliefs.declare(`${Facts.ROOM.NOONE_WATCHING_TELEVISION} `+room.name, n == 0);
            }, this.name)
        }
    }

    deactivateSensor(){
        this.log(`${this.name} de-activated`)
        for (let room of Object.values(this.house.rooms)){
            room.unobserve(`${Observable.PEOPLE_INSIDE}`, null, this.name)
        }
        for (let room of Object.values(this.house.rooms)){
            room.unobserve(`${Observable.PEOPLE_SLEEPING}`, null, this.name)
        }
        for (let room of Object.values(this.house.rooms)){
            room.unobserve(`${Observable.PEOPLE_WATCHING_TELEVISION}`, null, this.name)
        }
    }
}
module.exports = ActivitySensor;