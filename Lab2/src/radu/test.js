const Agent = require('../bdi/Agent')
const PlanningGoal =  require('../pddl/actions/pddlActionGoal')
const PlanningIntention =  require('../pddl/actions/pddlActionIntention')


    class SwitchOnLight extends PlanningIntention {
      async checkPreconditionAndApplyEffect () {
        if ( this.checkPrecondition() ) {
            this.applyEffect()
            await new Promise(res=>setTimeout(res,1000))
        }
        else
            throw new Error('pddl precondition not valid'); //Promise is rejected!
    }
    
        static parameters = ['l', 'kitchen']
        static precondition = [ ['not switched-off', 'l'], ['location', 'kitchen'], ['test']] 
        static effect = [['switched-on', 'l'], ['not switched-off', 'l'] ]
        
        static applicable (goal) {
            return ( goal instanceof PlanningGoal && goal.parameters.hasOwnProperty('l1') )
        }
        
        *exec () {
            this.goal.parameters.kitchen = this.goal.parameters.alfa;
            console.log(this.precondition)
            
            console.log("HELLO")
            console.log(this.goal.parameters.alfa)
            yield this.checkPreconditionAndApplyEffect()
        }
    
    }

    
async function test(){
  //var g1 = new PlanningGoal({l:'l1'})
  
  var a1 = new Agent('a1')
  var g1 = new PlanningGoal({l:'l1', alfa: 'alfa'})
  var i1 = new SwitchOnLight(a1, g1)

    i1.checkPrecondition() 
    a1.beliefs.declare('switched-off l1')
    console.log(i1.checkPrecondition() )

    console.log(i1.checkEffect() )
    console.log(a1.beliefs['switched-on l1'] )

    await i1.run() 
  
    console.log(i1.checkEffect() )
    a1.beliefs['switched-on l1'] 
    
}

test();


