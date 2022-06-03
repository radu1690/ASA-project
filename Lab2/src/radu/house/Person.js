const Observable =  require('../../utils/Observable')
const Television = require('../devices/Television')
const {Activities, Rooms, Status} = require('../utils/data');
const Room = require('./Room');
const House = require('./House');
class Person extends Observable {

    /** @type {Room} */
    in_room;

    /**
     * 
     * @param {House} house 
     * @param {String} name 
     * @param {Room} room 
     */
    constructor (house, name, room) {
        super();
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.in_room = room;
        //this.set('in_room', room) // observable
        this.set('activity', Activities.AWAKE) //observable [awake, sleeping, watching_television, awake]
    }
    //moving between multiple rooms?
    /**
     * Updates the location of the person. Activity must be 'awake'
     * @param {Room} to 
     * @returns 
     */
    moveTo (to) {
        if(this.activity == Activities.AWAY){
            console.log(`${this.name} is away and cannot perform any action inside the house`);
            return;
        }
        this.idle()

        //console.log(`from: ${this.in_room.name}   to: ${to}`)
        let map = this.house.map;
        let path = map.getPath(this.in_room.name, to.name);
        
        if ( path.includes(to.name) && path.includes(this.in_room.name) ) {
            path.forEach(room => {
                if(room != this.in_room.name){
                    // updateLeftRoom(this, this.in_room);
                    // this.in_room = this.house.rooms[room]
                    // updateEnteredRoom(this, this.in_room);
                    //if person reached the final destination print moved to
                    if(room == to.name){
                        let previous = this.in_room;
                        updateLeftRoom(this, this.in_room);
                        this.in_room = this.house.rooms[room]
                        updateEnteredRoom(this, this.in_room);
                        console.log(`${this.name} moved to ${to.name} (left ${previous.name})`);
                    }else{
                        //if person entered a room and did not reach the final destination, print entered
                        //console.log(`${this.name} entered in ${to}`)
                    }
                }
            });
            return true;
        }
        else{
            console.log(`${this.name} failed to move to ${to}`)
            return false
        }
    }

    /**
     * Sets the activity to SLEEP. Person must not be away
     * @returns 
     */
    sleep(){
        if(this.activity == Activities.AWAY){
            console.log(`${this.name} is away and cannot perform any action inside the house`);
            return;
        }
        if(this.activity == Activities.SLEEP){
            this.in_room.people_sleeping--;
        }else if(this.activity == Activities.WATCHING_TELEVISION){
            this.in_room.people_watching_tv--;
            //console.log(this.in_room.people_watching_tv)
        }
        
        this.activity = Activities.SLEEP;
        this.in_room.people_sleeping++;

        console.log(`${this.name} started sleeping in room ${this.in_room.name}`);
    }

    /**
     * Sets the activity WATCHING_TELEVISION. Person must not be away
     * @returns 
     */
    watch_television(){
        if(this.activity == Activities.AWAY){
            console.log(`${this.name} is away and cannot perform any action inside the house`);
            return;
        }
        if(this.activity == Activities.SLEEP){
            this.in_room.people_sleeping--;
        }else if(this.activity == Activities.WATCHING_TELEVISION){
            this.in_room.people_watching_tv--;
            //console.log(this.in_room.people_watching_tv)
        }

        let found = false;
        for(let device of Object.entries(this.in_room.devices)){
            if(device[1].constructor.name == "Television"){
                found = true;
                if(device[1].status != Status.ON){
                    device[1].switchOn();
                }
                break;
            }
        }
        if(found){
            this.activity = Activities.WATCHING_TELEVISION;
            this.in_room.people_watching_tv++;
            console.log(`${this.name} started watching television in room ${this.in_room.name}`);
        }else{
            console.log(`${this.name} failed starting watching television in room ${this.in_room.name}`);
        }
        
    }
    /**
     * Sets the activity to AWAKE. Person must not be away
     * @returns 
     */
    idle(){
        if(this.activity == Activities.AWAY){
            console.log(`${this.name} is away and cannot perform any action inside the house`);
            return;
        }
        if(this.activity == Activities.SLEEP){
            this.in_room.people_sleeping--;
        }else if(this.activity == Activities.WATCHING_TELEVISION){
            this.in_room.people_watching_tv--;
            //console.log(this.in_room.people_watching_tv)
        }
        if(this.activity != Activities.AWAKE){
            console.log(`${this.name} is awake in room ${this.in_room.name}`);
        }
        this.activity = Activities.AWAKE;     
    }

    /**
     * Sets the activity to AWAY and updates the room
     * @returns 
     */
    leaveHouse(){
        if(this.activity == Activities.AWAY){
            console.log(`${this.name} is away and cannot perform any action inside the house`);
            return;
        }
        // if(this.in_room != Rooms.ENTRANCE){
        //     console.log(`${this.name} can't leave the house because he is not at the entrance (location is ${this.in_room})`);
        //     return;
        // }
        if(this.activity == Activities.SLEEP){
            this.in_room.people_sleeping--;
        }else if(this.activity == Activities.WATCHING_TELEVISION){
            this.in_room.people_watching_tv--;
            //console.log(this.in_room.people_watching_tv)
        }
        updateLeftRoom(this, this.in_room);
        this.in_room = null;
        this.activity = Activities.AWAY;
        console.log(`${this.name} left the house`)
    }
    
    /**
     * Sets the activity to AWAKE and updates the entrance room
     */
    enterHouse(){
        if(this.activity != Activities.AWAY){
            console.log(`${this.name} is already in the house`);
            return;
        }
        this.activity = Activities.AWAKE;
        this.in_room = this.house.rooms[Rooms.ENTRANCE];
        updateEnteredRoom(this, this.in_room);
        console.log(`${this.name} entered the house`)
    }
}

function updateEnteredRoom(person, room){

    room.people_inside++;
}

function updateLeftRoom(person, room){
    room.people_inside--;
}





module.exports = Person
    