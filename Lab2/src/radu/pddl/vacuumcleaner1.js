const Intention = require('../../bdi/Intention')
const Agent = require('../../bdi/Agent')
const PlanningGoal = require('../../pddl/PlanningGoal')
const pddlActionIntention = require('../../pddl/actions/pddlActionIntention')



class FakeAction extends pddlActionIntention {

    *exec () {
        for ( let b of this.effect )
            this.agent.beliefs.apply(b)
        yield new Promise(res=>setTimeout(res,100))
        this.log('effects applied')
        // this.log(this.agent.beliefs)
    }

}

class Move extends FakeAction {
    static parameters = ['from', 'to', 'robot'];
    static precondition = [['location', 'from', 'robot'], ['connected', 'from', 'to']];
    static effect = [['not location', 'from', 'robot'], ['location', 'to', 'robot'] ];
}

class Suck extends FakeAction {
    static parameters = ['room', 'robot'];
    static precondition = [['location', 'room', 'robot']];
    static effect = [['clean', 'room']];
}



var a1 = new Agent('a1')
a1.beliefs.declare('location entrance robot');
a1.beliefs.declare('connected entrance kitchen');
a1.beliefs.declare('connected entrance living_room');
a1.beliefs.declare('connected entrance corridor');
a1.beliefs.declare('connected kitchen entrance');
a1.beliefs.declare('connected kitchen living_room');
a1.beliefs.declare('connected living_room entrance');
a1.beliefs.declare('connected living_room kitchen');
a1.beliefs.declare('connected corridor wc1');
a1.beliefs.declare('connected corridor wc2');
a1.beliefs.declare('connected corridor room1');
a1.beliefs.declare('connected corridor room2');
a1.beliefs.declare('connected corridor room3');
a1.beliefs.declare('connected corridor entrance');
a1.beliefs.declare('connected wc1 corridor');
a1.beliefs.declare('connected wc2 corridor');
a1.beliefs.declare('connected room1 corridor');
a1.beliefs.declare('connected room2 corridor');
//a1.beliefs.declare('connected room3 corridor');
//a1.beliefs.declare('clean entrance');

let {PlanningIntention} = require('../../pddl/Blackbox')([Move, Suck])
a1.intentions.push(PlanningIntention)
console.log('a1 entries', a1.beliefs.entries)
console.log('a1 literals', a1.beliefs.literals)
a1.postSubGoal( new PlanningGoal( { goal: ['clean kitchen', 'clean entrance', 'clean living_room', 'clean corridor',
        'clean wc1', 'clean wc2', 'clean room1', 'clean room2', 'clean room3'] } ) )
    // .then(res => {
    //     console.log("HEY, a1 goal succeded!")
    // })
    // .catch(err => {
    //     console.log("HEY, a1 failed!")
    // })
