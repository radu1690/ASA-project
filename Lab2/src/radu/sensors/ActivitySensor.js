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
        // for (let person of Object.values(this.house.people)){
        //     person.observe('activity', (activity, k) =>{
        //         this.log(person.name, activity);
        //         this.agent.beliefs.declare('activity_sleeping '+person.name, activity=='sleeping')
        //         this.agent.beliefs.declare('activity_awake '+person.name, activity=='awake')
        //         this.agent.beliefs.declare('activity_watching_television '+person.name, activity=='watching_television')
        //     }, this.name)
        // }

        //people_inside fact is true if there is at least one person in the room
        // for (let room of Object.values(this.house.rooms)){
        //     room.observe('people_inside', (n, k) =>{
        //         this.agent.beliefs.declare('people_inside'+room.name, n>0 );
        //     }, this.name)
        // }
        //people_inside fact is true if there is at least one person in the room
        for (let room of Object.values(this.house.rooms)){
            room.observe('people_inside', (n, k) =>{
                this.log('People inside', room.name, n);
                this.agent.beliefs.declare('people_inside '+room.name, n > 0)

                let all_sleeping = (room.people_inside > 0 && room.people_sleeping == room.people_inside);
                let all_tv = (room.people_inside > 0 && room.people_watching_tv == room.people_inside);
                this.agent.beliefs.declare('people_sleeping '+room.name, all_sleeping );
                this.agent.beliefs.declare('people_watching_tv '+room.name, all_tv);
                //console.log(counter)
            }, this.name)
            
        }

        //people_sleeping fact is true if all people inside the room are sleeping
        for (let room of Object.values(this.house.rooms)){
            room.observe('people_sleeping', (n, k) =>{
                let all_sleeping = (room.people_inside > 0 && n == room.people_inside);
                this.agent.beliefs.declare('people_sleeping '+room.name, all_sleeping );
                if(all_sleeping){
                    this.agent.beliefs.declare('people_watching_tv '+room.name, !all_sleeping);
                }
                
            }, this.name)
        }

        //people_watching_tv fact is true if all people inside the room watching tv
        for (let room of Object.values(this.house.rooms)){
            room.observe('people_watching_tv', (n, k) =>{
                let all_tv = (room.people_inside > 0 && n == room.people_inside);
                this.agent.beliefs.declare('people_watching_tv '+room.name, all_tv);
                if(all_tv){
                    this.agent.beliefs.declare('people_sleeping '+room.name, !all_tv );
                }
            }, this.name)
        }
    }

    deactivateSensor(){
        this.log(`${this.name} de-activated`)
        // for (let person of Object.values(this.house.people)){
        //     person.unobserve('activity', null, this.name)
        // }

        // for (let room of Object.values(this.house.rooms)){
        //     room.observe('people_inside', null, this.name)
        // }
        for (let room of Object.values(this.house.rooms)){
            room.observe('people_sleeping', null, this.name)
        }
        for (let room of Object.values(this.house.rooms)){
            room.observe('people_watching_tv', null, this.name)
        }
    }
}

module.exports = ActivitySensor;