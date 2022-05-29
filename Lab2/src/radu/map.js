var Graph = require ('graphology');
var path = require('graphology-shortest-path/dijkstra');
const { Rooms } = require('./data');

/**
 * This class is for checking that the movement of the vacuum cleaner robot is correct
 */
class HouseMap{
    //static graph = new Graph();
    constructor(){
        this.graph = new Graph();
        this.graph.addNode(Rooms.WC1);
        this.graph.addNode(Rooms.WC2);
        this.graph.addNode(Rooms.CORRIDOR);
        this.graph.addNode(Rooms.ROOM1);
        this.graph.addNode(Rooms.ROOM2);
        this.graph.addNode(Rooms.ROOM3);
        this.graph.addNode(Rooms.ENTRANCE);
        this.graph.addNode(Rooms.KITCHEN);
        this.graph.addNode(Rooms.LIVING_ROOM);
        this.graph.addNode(Rooms.BALCONY);


        this.graph.addUndirectedEdge(Rooms.WC1, Rooms.CORRIDOR);
        this.graph.addUndirectedEdge(Rooms.WC2, Rooms.CORRIDOR);
        this.graph.addUndirectedEdge(Rooms.ROOM1, Rooms.CORRIDOR);
        this.graph.addUndirectedEdge(Rooms.ROOM2, Rooms.CORRIDOR);
        this.graph.addUndirectedEdge(Rooms.ROOM3, Rooms.CORRIDOR);
        this.graph.addUndirectedEdge(Rooms.ENTRANCE, Rooms.CORRIDOR);
        this.graph.addUndirectedEdge(Rooms.ENTRANCE, Rooms.KITCHEN);
        this.graph.addUndirectedEdge(Rooms.ENTRANCE, Rooms.LIVING_ROOM);
        this.graph.addUndirectedEdge(Rooms.KITCHEN, Rooms.LIVING_ROOM);
        this.graph.addUndirectedEdge(Rooms.KITCHEN, Rooms.BALCONY);
        this.graph.addUndirectedEdge(Rooms.LIVING_ROOM, Rooms.BALCONY);
        //when people need to go to the balcony, they will always go through the kitchen unless their current
        //location is room1/room2/room3
        this.graph.addUndirectedEdge(Rooms.ROOM1, Rooms.BALCONY, {weight: 3});
        this.graph.addUndirectedEdge(Rooms.ROOM2, Rooms.BALCONY, {weight: 3});
        this.graph.addUndirectedEdge(Rooms.ROOM3, Rooms.BALCONY, {weight: 3});
    }

    getPath(from, to){
        return path.bidirectional(this.graph, from, to);
    }
}

module.exports = HouseMap


function test(){

    let graph = new Graph();
    graph.addNode('A');
    graph.addNode('B');
    graph.addNode('C');

    graph.addEdge('A', 'B');
    graph.addUndirectedEdge('A', 'C');
    graph.addUndirectedEdge('B', 'C');


    // Displaying useful information about your graph
    console.log('Number of nodes', graph.order);
    console.log('Number of edges', graph.size);

    // Iterating over nodes
    graph.forEachNode(node => {
    console.log(node);
    });

    const p = path.bidirectional(graph, 'B', 'A');
    console.log(p);


    const rooms = new HouseMap();
    console.log(rooms.getPath(Rooms.ROOM3, Rooms.LIVING_ROOM));
}

//test();