const Activities = {
    AWAKE: 'awake',
    SLEEP: 'sleeping',
    WATCHING_TELEVISION: 'watching_television',
    AWAY : 'away'
};
Object.freeze(Activities);


const Rooms = {
    ENTRANCE: 'entrance',
    KITCHEN: 'kitchen',
    LIVING_ROOM: 'living_room',
    CORRIDOR : 'corridor',
    WC1: 'wc1',
    WC2: 'wc2',
    ROOM1: 'room1',
    ROOM2 : 'room2',
    ROOM3: 'room3',
    BALCONY: 'balcony'
};
Object.freeze(Rooms);

const People = {
    JOHN: 'john',
    HANNAH: 'hannah',
    ELIZABETH: 'elizabeth',
    EZEKIEL : 'ezekiel'
};
Object.freeze(People);

const Illumination = {
    LOW: 'low',
    NORMAL: 'normal',
    HIGH: 'high'
};
Object.freeze(Illumination);

const Status = {
    ON: 'on',
    OFF: 'off'
}
Object.freeze(Status);

const Shutter = {
    UP: 'up',
    HALF: 'half',
    DOWN: 'down'
}
Object.freeze(Shutter);

const Filling = {
    EMPTY: 'empty',
    HALF: 'half',
    HALF_FULL: 'half_full',
    FULL: 'FULL'
}
Object.freeze(Filling);

const WashingStatus = {
    OFF : 'off',
    WASHING: 'washing',
    FINISHED: 'finished',
    PAUSED: 'paused'
}
Object.freeze(WashingStatus);

const Facts = {
    DEVICES: {
        ON: 'device_on',
        CAN_START : 'can_start',
        READY_TO_START: 'ready_to_start',
        READY_TO_RESUME: 'ready_to_resume',
        WASHING: 'washing',
        NEED_TO_NOTIFY: 'neet_to_notify',
        LOW_SUPPLIES: 'low_supplies'
    },
    ROOM: {
        PEOPLE_INSIDE: 'people_inside',
        PEOPLE_SLEEPING: 'people_sleeping',
        PEOPLE_WATCHING_TELEVISION: 'people_watching_tv',
        LIGHT_NEEDED: 'light_needed',
        NOONE_WATCHING_TELEVISION: 'noone_watching_tv'
    },
    SHUTTER: {
        UP: 'shutter_up',
        HALF: 'shutter_half',
        DOWN: 'shutter_down'
    }, 
    ILLUMINATION: {
        LOW: 'sun_illumination_low',
        NORMAL: 'sun_illumination_normal',
        HIGH: 'sun_illumination_high'
    },
    WASHINGSTATUS: {
        OFF : 'device_off',
        WASHING: 'device_washing',
        FINISHED: 'device_finished',
        PAUSED: 'device_paused'
    },
    POWER : 'exceeded_power',
    DISCOUNT_TIME: 'discount_time'
}
Object.freeze(Facts);

const Observable = {
    PEOPLE_INSIDE : 'people_inside',
    PEOPLE_SLEEPING: 'people_sleeping',
    PEOPLE_WATCHING_TELEVISION: 'people_watching_tv'
}
Object.freeze(Observable);

const Power = {
    DISHWASHER: 1300,
    FRIDGE: 130,
    LIGHT: 15,
    OVEN: 1600,
    SPEAKER: 10,
    TELEVISION: 100,
    WASHINGMACHINE: 600,
    LIMIT: 2200
}
Object.freeze(Power);

const WashingDevices = {
    WASHINGMACHINE : 'wc1_washing_machine',
    DISHWASHER : 'kitchen_dishwasher'
}
Object.freeze(WashingDevices);

module.exports = {Activities, Rooms, People, Illumination, Status, Shutter, Filling, WashingStatus, Facts, Observable, Power, WashingDevices};