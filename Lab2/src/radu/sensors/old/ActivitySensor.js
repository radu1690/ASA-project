const Goal = require('../../bdi/Goal');
const Intention = require('../../bdi/Intention');
const Person = require('./../Person')


class SenseActivitiesGoal extends Goal {

    constructor (people = []) {
        super()

        /** @type {Array<Person>} people */
        this.people = people

    }

}



class SenseActivitiesIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)
        
        /** @type {Array<Person>} people */
        this.people = this.goal.people
    }
    
    static applicable (goal) {
        return goal instanceof SenseActivitiesGoal
    }

    *exec () {
        var activitiesGoals = []
        for (let l of this.people) {
            
            let activityGoalPromise = new Promise( async res => {
                while (true) {
                    let activity = await l.notifyChange('activity')
                    this.log('sense: activity ' + l.name + ' is ' + activity)
                    this.agent.beliefs.declare('activity_sleeping '+l.name, activity=='sleeping')
                    this.agent.beliefs.declare('activity_awake '+l.name, activity=='awake')
                    this.agent.beliefs.declare('activity_watching_television '+l.name, activity=='watching_television')
                }
            });

            activitiesGoals.push(activityGoalPromise)
        }
        yield Promise.all(activitiesGoals)
    }

}



class SenseOneActivityGoal extends Goal {

    constructor (person) {
        super()

        /** @type {Person} person */
        this.person = person

    }

}



class SenseOneActivityIntention extends Intention {
    
    constructor (agent, goal) {
        super(agent, goal)

        /** @type {Person} person */
        this.person = this.goal.person
    }

    static applicable (goal) {
        return goal instanceof SenseOneActivityGoal
    }

    *exec () {
        while (true) {
            let activity = yield this.person.notifyChange('activity')
            this.log('sense: activity ' + l.name + ' is ' + activity)
                this.agent.beliefs.declare('activity_sleeping '+this.person.name, activity=='sleeping')
                this.agent.beliefs.declare('activity_awake '+this.person.name, activity=='awake')
                this.agent.beliefs.declare('activity_watching_television '+this.person.name, activity=='watching_television')
        }
    }

}



module.exports = {SenseActivitiesGoal, SenseActivitiesIntention, SenseOneActivityGoal, SenseOneActivityIntention}