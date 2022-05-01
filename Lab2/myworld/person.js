const Observable =  require('../utils/Observable')
class Person extends Observable {
    constructor (house, name, room) {
        super();
        this.house = house; // reference to the house
        this.name = name; // non-observable
        this.set('in_room', room) // observable
        this.set('status', 'awake') //observable [awake, sleeping]
    }
    //need to change this, moving between multiple rooms?
    moveTo (to) {
        //console.log(`from: ${this.in_room.name}   to: ${to}`)
        let map = this.house.map;
        let path = map.getPath(this.in_room.name, to);
        
        if ( path.includes(to) && path.includes(this.in_room.name) ) {
            path.forEach(room => {
                if(room != this.in_room.name){
                    this.in_room = this.house.rooms[room]
                }
            });
            return true;
        }
        else
            return false
    }
}

module.exports = Person
    