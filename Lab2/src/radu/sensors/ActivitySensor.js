const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");
const { Facts, Observable } = require("../data");

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
        
        //people_inside fact is true if there is at least one person in the room
        for (let room of Object.values(this.house.rooms)){
            room.observe(`${Observable.PEOPLE_INSIDE}`, (n, k) =>{
                this.log(`${Observable.PEOPLE_INSIDE}`, room.name, n);
                this.agent.beliefs.declare(`${Facts.ROOM.PEOPLE_INSIDE} `+room.name, n > 0)

                let all_sleeping = (room.people_inside > 0 && room.people_sleeping == room.people_inside);
                let all_tv = (room.people_inside > 0 && room.people_watching_tv == room.people_inside);
                this.agent.beliefs.declare(`${Facts.ROOM.PEOPLE_SLEEPING} `+room.name, all_sleeping );
                this.agent.beliefs.declare(`${Facts.ROOM.PEOPLE_WATCHING_TELEVISION} `+room.name, all_tv);

                let light_needed = !(room.people_inside == 0 | all_sleeping | all_tv);
                this.agent.beliefs.declare(`${Facts.ROOM.LIGHT_NEEDED} `+room.name, light_needed);
                
            }, this.name)
            
        }

        //people_sleeping fact is true if all people inside the room are sleeping
        for (let room of Object.values(this.house.rooms)){
            room.observe(`${Observable.PEOPLE_SLEEPING}`, (n, k) =>{
                let all_sleeping = (room.people_inside > 0 && n == room.people_inside);
                this.agent.beliefs.declare(`${Facts.ROOM.PEOPLE_SLEEPING} `+room.name, all_sleeping );
                if(all_sleeping){
                    this.agent.beliefs.declare(`${Facts.ROOM.PEOPLE_WATCHING_TELEVISION} `+room.name, !all_sleeping);
                    this.agent.beliefs.declare(`${Facts.ROOM.LIGHT_NEEDED} `+room.name, false);
                }
                
            }, this.name)
        }

        //people_watching_tv fact is true if all people inside the room watching tv
        for (let room of Object.values(this.house.rooms)){
            room.observe(`${Observable.PEOPLE_WATCHING_TELEVISION}`, (n, k) =>{
                let all_tv = (room.people_inside > 0 && n == room.people_inside);
                this.agent.beliefs.declare(`${Facts.ROOM.PEOPLE_WATCHING_TELEVISION} `+room.name, all_tv);
                if(all_tv){
                    this.agent.beliefs.declare(`${Facts.ROOM.PEOPLE_SLEEPING} `+room.name, !all_tv );
                    this.agent.beliefs.declare(`${Facts.ROOM.LIGHT_NEEDED} `+room.name, false);
                }
                this.agent.beliefs.declare(`${Facts.ROOM.NOONE_WATCHING_TELEVISION} `+room.name, n == 0);
            }, this.name)
        }
    }

    deactivateSensor(){
        this.log(`${this.name} de-activated`)
        for (let room of Object.values(this.house.rooms)){
            room.observe(`${Observable.PEOPLE_INSIDE}`, null, this.name)
        }
        for (let room of Object.values(this.house.rooms)){
            room.observe(`${Observable.PEOPLE_SLEEPING}`, null, this.name)
        }
        for (let room of Object.values(this.house.rooms)){
            room.observe(`${Observable.PEOPLE_WATCHING_TELEVISION}`, null, this.name)
        }
    }
}
module.exports = ActivitySensor;