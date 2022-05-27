const Observable =  require('../utils/Observable')
const Television = require('./devices/Television')
class Person extends Observable {
    constructor (house, name, room) {
        super();
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('in_room', room) // observable
        this.set('activity', 'awake') //observable [awake, sleeping, watching_television]
    }
    //moving between multiple rooms?
    moveTo (to) {
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

    sleep(){
        this.activity = "sleeping";
        console.log(`${this.name} started sleeping in room ${this.in_room.name}`);
    }
    watch_television(){
        let found = false;
        for(let device of Object.entries(this.in_room.devices)){
            /*
            device is like:
            [
                'tv_name',
                Television{
                    ...
                }
            ]
            */
            if(device[1].constructor.name == "Television"){
                found = true;
                device[1].switchOn();
                break;
            }
        }
        if(found){
            this.activity = "watching_television";
            console.log(`${this.name} started watching television in room ${this.in_room.name}`);
        }else{
            console.log(`${this.name} failed starting watching television in room ${this.in_room.name}`);
        }
        
    }
    idle(){
        this.activity = "awake";
        console.log(`${this.name} is awake in room ${this.in_room.name}`);
    }
}

function updateEnteredRoom(person, room){
    //console.log(`${room.name} before ENTER: ${room.people_inside.length}`)
    //room.people_inside.push(person);
    //console.log(`${room.name} after ENTER: ${room.people_inside.length}`)

    room.people_inside++;
}

function updateLeftRoom(person, room){
    //console.log(`${room.name} before LEFT: ${room.people_inside.length}`)
    // for(i=0; i<room.people_inside.length; i++){
    //     if(room.people_inside[i] == person){
    //         room.people_inside.splice(i, 1);
    //         break;
    //     }
    // }
    //console.log(`${room.name} after LEFT: ${room.people_inside.length}`)

    room.people_inside--;
}

module.exports = Person
    