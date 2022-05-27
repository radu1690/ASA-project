const pddlActionIntention = require('../../pddl/actions/pddlActionIntention')
const Agent = require('../../bdi/Agent')
const Goal = require('../../bdi/Goal')
const Intention = require('../../bdi/Intention')
const PlanningGoal = require('../../pddl/PlanningGoal')



/**
 * World agent
 */
const world = new Agent('world');
{

    class FakeAction {

        constructor (agent, parameters) {
            this.agent = agent
            this.parameters = parameters
        }

        get precondition () {
            return pddlActionIntention.ground(this.constructor.precondition, this.parameters)
        }
        
        checkPrecondition () {
            return this.agent.beliefs.check(...this.precondition);
        }

        get effect () {
            return pddlActionIntention.ground(this.constructor.effect, this.parameters)
        }

        applyEffect () {
            for ( let b of this.effect )
                this.agent.beliefs.apply(b)
        }

        async checkPreconditionAndApplyEffect () {
            if ( this.checkPrecondition() ) {
                this.applyEffect()
                await new Promise(res=>setTimeout(res,0))
            }
            else
                throw new Error('pddl precondition not valid'); //Promise is rejected!
        }

    }
    
    
    class Move extends FakeAction {
        static parameters = ['from', 'to', 'robot'];
        static precondition = [['location', 'from', 'robot'], ['connected', 'from', 'to'], ['battery_10']];
        static effect = [['not location', 'from', 'robot'], ['location', 'to', 'robot'] ];
    }


    class Recharge extends FakeAction {
        static parameters = ['room','robot'];
        static precondition = [['location', 'room', 'robot'], ['recharge_room', 'room'], ['battery_10']];
        static effect = [['battery_10'], ['battery_20'], ['battery_30'], ['battery_40'], ['battery_50'], ['battery_60'],
                 ['battery_70'], ['battery_80'], ['battery_90'], ['battery_100'] ];
    }
    
    class Suck extends FakeAction {
        static parameters = ['room', 'robot'];
        static precondition = [['location', 'room', 'robot'], ['battery_10']];
        static effect = [['clean', 'room'],
        ['when (and (battery_100)) (and (not (battery_100 )))'],
        ['when (and (not (battery_100 )) (battery_90 )) (and (not (battery_90 )) )'],
        ['when (and (not (battery_90 )) (battery_80 )) (and (not (battery_80 )) )'],
        ['when (and (not (battery_80 )) (battery_70 )) (and (not (battery_70 )) )'],
        ['when (and (not (battery_70 )) (battery_60 )) (and (not (battery_60 )) )'],
        ['when (and (not (battery_60 )) (battery_50 )) (and (not (battery_50 )) )'],
        ['when (and (not (battery_50 )) (battery_40 )) (and (not (battery_40 )) )'],
        ['when (and (not (battery_40 )) (battery_30 )) (and (not (battery_30 )) )'],
        ['when (and (not (battery_30 )) (battery_20 )) (and (not (battery_20 )) )'],
        ['when (and (not (battery_20 )) (battery_10 )) (and (not (battery_10 )) )'],     
    ];
    }

    world.move = function ({from, to, robot} = args){
        this.log('move', from, to, robot);
        return new Move(world, {from, to, robot}).checkPreconditionAndApplyEffect()
        .catch(err => {this.error('world.move failed:', robot,  err.message || err); throw err;})
    }

    world.recharge = function ({room, robot} = args){
        this.log('recharge', room, robot);
        return new Recharge(world, {room, robot}).checkPreconditionAndApplyEffect()
        .catch(err => {this.error('world.recharge failed:', robot,  err.message || err); throw err;})
    }

    world.suck = function ({room, robot} = args){
        this.log('move', room, robot);
        return new Suck(world, {room, robot}).checkPreconditionAndApplyEffect()
        .catch(err => {this.error('world.suck failed:', err.message || err); throw err;})
    }

}




/**
 * Robot agents
 */
{
    class Move extends pddlActionIntention {
        static parameters = ['from', 'to'];
        static precondition = [ ['location', 'from'], ['connected', 'from', 'to'], ['battery_10']];
        static effect = [['not location', 'from'], ['location', 'to'] ];
        *exec ({from, to}=parameters) {
            yield world.move({from, to, robot: this.agent.name})
        }
    }


    class Recharge extends pddlActionIntention {
        static parameters = ['room',];
        static precondition = [['location', 'room'], ['recharge_room', 'room'], ['battery_10']];
        static effect = [['battery_10'], ['battery_20'], ['battery_30'], ['battery_40'], ['battery_50'], ['battery_60'],
             ['battery_70'], ['battery_80'], ['battery_90'], ['battery_100'] ];
        *exec ({room}=parameters) {
            yield world.recharge({room, robot: this.agent.name})
        }
    }

    class Suck extends pddlActionIntention {
        static parameters = ['room'];
        static precondition = [ ['location', 'room'], ['battery_10']];
        static effect = [['clean', 'room'],
        ['when (and (battery_100)) (and (not (battery_100 )) )'],
        ['when (and (not (battery_100 )) (battery_90 )) (and (not (battery_90 )) )'],
        ['when (and (not (battery_90 )) (battery_80 )) (and (not (battery_80 )) )'],
        ['when (and (not (battery_80 )) (battery_70 )) (and (not (battery_70 )) )'],
        ['when (and (not (battery_70 )) (battery_60 )) (and (not (battery_60 )) )'],
        ['when (and (not (battery_60 )) (battery_50 )) (and (not (battery_50 )) )'],
        ['when (and (not (battery_50 )) (battery_40 )) (and (not (battery_40 )) )'],
        ['when (and (not (battery_40 )) (battery_30 )) (and (not (battery_30 )) )'],
        ['when (and (not (battery_30 )) (battery_20 )) (and (not (battery_20 )) )'],
        ['when (and (not (battery_20 )) (battery_10 )) (and (not (battery_10 )) )'],     
    ];
        *exec ({room}=parameters) {
            yield world.suck({room, robot: this.agent.name})
        }
    }


    class CleanGoal extends Goal {}
    class CleanGoalIntention extends Intention {
        static applicable (goal) {
            return goal instanceof CleanGoal
        }
        *exec ({goal}=parameters) {
            let goalAchieved = yield this.agent.postSubGoal( goal )
            if (goalAchieved){
                console.log(goal)
                console.log("The house has been cleaned!");
                return;
            }
            
        }
    }

    var sensor = (agent) => (value,key,observable) => {
        let predicate = key.split(' ')[0]
        let arg1 = key.split(' ')[1]
        let arg2 = key.split(' ')[2]
        if (predicate=='location')
            if (arg2==agent.name)
                key = 'location '+arg1; //key.split(' ').slice(0,2).join(' ')
            else
                return;
        else if (predicate=='empty')
            if (arg1==agent.name)
                key = 'empty'
            else
                return;
        value?agent.beliefs.declare(key):agent.beliefs.undeclare(key)
    }
    
    

    {
        let a1 = new Agent('a1')
        world.beliefs.observeAny( sensor(a1) )
        let {OnlinePlanning} = require('../../pddl/OnlinePlanner')([Move, Suck, Recharge])
        a1.intentions.push(OnlinePlanning)
        a1.intentions.push(CleanGoalIntention)
        
        a1.postSubGoal( new CleanGoal( { goal: new PlanningGoal( { goal: ['clean kitchen', 'clean entrance', 'clean living_room', 'clean corridor',
                'clean wc1', 'clean wc2', 'clean room1', 'clean room2', 'clean room3'] } ) } ) ) // try to achieve the PlanningGoal for 4 times
    }

    // {
    //     let a2 = new Agent('a2')
    //     world.beliefs.observeAny( sensor(a2) )
        
    //     let {OnlinePlanning} = require('../../pddl/OnlinePlanner')([Move, Suck, Recharge])
    //     a2.intentions.push(OnlinePlanning)
    //     a2.intentions.push(CleanGoalIntention)
        
    //     a2.postSubGoal( new CleanGoal( { goal: new PlanningGoal( { goal: ['clean kitchen', 'clean entrance', 'clean living_room', 'clean corridor',
    //             'clean wc1', 'clean wc2', 'clean room1', 'clean room2', 'clean room3'] } ) } ) ) // try to achieve the PlanningGoal for 4 times
    // }
}



world.beliefs.declare('location entrance a1');
world.beliefs.declare('location room3 a2');
world.beliefs.declare('connected entrance kitchen');
world.beliefs.declare('connected entrance living_room');
world.beliefs.declare('connected entrance corridor');
world.beliefs.declare('connected kitchen entrance');
world.beliefs.declare('connected kitchen living_room');
world.beliefs.declare('connected living_room entrance');
world.beliefs.declare('connected living_room kitchen');
world.beliefs.declare('connected corridor wc1');
world.beliefs.declare('connected corridor wc2');
world.beliefs.declare('connected corridor room1');
world.beliefs.declare('connected corridor room2');
world.beliefs.declare('connected corridor room3');
world.beliefs.declare('connected corridor entrance');
world.beliefs.declare('connected wc1 corridor');
world.beliefs.declare('connected wc2 corridor');
world.beliefs.declare('connected room1 corridor');
world.beliefs.declare('connected room2 corridor');
world.beliefs.declare('connected room3 corridor');

world.beliefs.declare('recharge_room wc2');
world.beliefs.declare('battery_10');
world.beliefs.declare('battery_20');
world.beliefs.declare('battery_30');
world.beliefs.declare('battery_40');
world.beliefs.declare('battery_50');

// world.beliefs.declare('clean room1');
// world.beliefs.declare('clean room2');
// world.beliefs.declare('clean room3');
// world.beliefs.declare('clean wc1');
// world.beliefs.declare('clean wc2');
// world.beliefs.declare('clean corridor');
// world.beliefs.declare('clean kitchen');
// world.beliefs.declare('clean living_room');
