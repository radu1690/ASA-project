const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");
const { Status, Facts, WashingStatus } = require("../data");
const Device = require("../devices/Device");
const WashingDevice = require("../devices/WashingDevice");

class DeviceStatusSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'DeviceStatuSensor';
        this.activateSensor();  
    }

    activateSensor(){
        //let counter = 0;
        this.log(`${this.name} activated`)
        for (let room of Object.values(this.house.rooms)){
            
            for(let device of Object.entries(room.devices)){
                /*
                device is like:
                [
                    'tv_name',
                    Television{
                        ...
                    }
                ]
                */
               //console.log(device[1].constructor.name)
                if(device[1] instanceof Device){
                    //counter++;
                    
                    device[1].observe('status', (status, k) =>{
                        this.log(device[1].name, 'turned', status);
                        this.agent.beliefs.declare(`${Facts.DEVICES.ON} `+device[1].name, status==Status.ON)
                        //console.log(counter)
                    }, this.name+'normal_device')
                }else if(device[1] instanceof WashingDevice){
                    device[1].observe('status', (status, k) => {
                        this.log(device[1].name, 'status', status);
                        this.agent.beliefs.declare(`${Facts.WASHINGSTATUS.OFF} `+device[1].name, status==WashingStatus.OFF)
                        this.agent.beliefs.declare(`${Facts.WASHINGSTATUS.PAUSED} `+device[1].name, status==WashingStatus.PAUSED)
                        this.agent.beliefs.declare(`${Facts.WASHINGSTATUS.WASHING} `+device[1].name, status==WashingStatus.WASHING)

                        if(status == WashingStatus.FINISHED){
                            this.agent.beliefs.declare(`${Facts.WASHINGSTATUS.FINISHED} `+device[1].name, true)
                        }
                    }, this.name+'washing_device');
                }
            }
        }
    }

    deactivateSensor(){
        console.log(`${this.name} de-activated`)
        for (let room of Object.values(this.house.rooms)){
            for(let device of Object.entries(room.devices)){
                if(device[1] instanceof Device ){
                    device[1].unobserve('status', null, this.name+'normal_device')
                }else if(device[1] instanceof WashingDevice){
                    device[1].observe('status', null, this.name+'washing_device');
                }
            }
        }
    }
}

module.exports = DeviceStatusSensor;