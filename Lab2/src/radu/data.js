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
    NORMAL: 'low',
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

module.exports = {Activities, Rooms, People, Illumination, Status, Shutter, Filling, WashingStatus};