const Agent = require("../../bdi/Agent");
const Sensor = require("./Sensor");
const House = require("../House");
const { Power, Facts, WashingDevices, WashingStatus, Filling } = require("../data");
const Clock = require("../../utils/Clock");

class WashingDeviceSensor extends Sensor {

    /**
     * 
     * @param {Agent} agent 
     * @param {House} house 
     */
    constructor(agent, house) {
        super(agent, house);
        this.name = 'WashingDeviceSensor';

        this.activateSensor();
    }

    activateSensor(){
        this.log(`${this.name} activated`);
        let washing_machine = this.house.rooms.wc1.devices.wc1_washing_machine;
        let dishwasher = this.house.rooms.kitchen.devices.kitchen_dishwasher;
        let devices = [];
        devices.push(washing_machine, dishwasher);

        //check when status of device changes
        for(let device of devices){
            device.observe('status', (status, k)=>{
                //this.log('Global power consumption  changed: ' + power + ' watts');
                let ready_to_start = (device.status == WashingStatus.OFF && (device.filling == Filling.FULL || device.filling == Filling.HALF_FULL));
                this.agent.beliefs.declare(`${Facts.DEVICES.READY_TO_START} ${device.name}`, ready_to_start);
    
                let ready_to_resume = device.status == WashingStatus.PAUSED;
                this.agent.beliefs.declare(`${Facts.DEVICES.READY_TO_RESUME} ${device.name}`, ready_to_resume);

                this.agent.beliefs.declare(`${Facts.DEVICES.WASHING} ${device.name}`, device.status == WashingStatus.WASHING);
            }, `washing_device status ${device.name}`)
        }

        //check when filling changes
        for(let device of devices){
            device.observe('filling', (filling, k)=>{
                //this.log('Global power consumption  changed: ' + power + ' watts');
                let ready_to_start = (device.status == WashingStatus.OFF && (device.filling == Filling.FULL || device.filling == Filling.HALF_FULL));
                this.agent.beliefs.declare(`${Facts.DEVICES.READY_TO_START} ${device.name}`, ready_to_start);
    
                
            }, `washing_device filling ${device.name}`)
        }

        //check if it's a good time to start a washing device
        Clock.global.observe('hh', (hh, k)=>{
            //this.log('Global power consumption  changed: ' + power + ' watts');
            let discount_time = (hh>=19 && hh<24) || (hh>=0 && hh<5);
            this.agent.beliefs.declare(`${Facts.DISCOUNT_TIME}`, discount_time);

            
        }, `${Facts.DISCOUNT_TIME}`)

        
    }

    // deactivateSensor(){
    //     this.log(`${this.name} de-activated`)
    //     this.house.utilities.electricity.unobserve('consumption', null, this.name);
    // }
}

module.exports = WashingDeviceSensor;