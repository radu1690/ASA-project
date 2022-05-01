var Graph = require ('graphology');
var path = require('graphology-shortest-path/dijkstra');


class HouseMap{
    //static graph = new Graph();
    constructor(){
        this.graph = new Graph();
        this.graph.addNode('wc1');
        this.graph.addNode('wc2');
        this.graph.addNode('corridor');
        this.graph.addNode('room1');
        this.graph.addNode('room2');
        this.graph.addNode('room3');
        this.graph.addNode('entrance');
        this.graph.addNode('kitchen');
        this.graph.addNode('living_room');
        this.graph.addNode('balcony');


        this.graph.addUndirectedEdge('wc1', 'corridor');
        this.graph.addUndirectedEdge('wc2', 'corridor');
        this.graph.addUndirectedEdge('room1', 'corridor');
        this.graph.addUndirectedEdge('room2', 'corridor');
        this.graph.addUndirectedEdge('room3', 'corridor');
        this.graph.addUndirectedEdge('entrance', 'corridor');
        this.graph.addUndirectedEdge('entrance', 'kitchen');
        this.graph.addUndirectedEdge('entrance', 'living_room');
        this.graph.addUndirectedEdge('kitchen', 'living_room');
        this.graph.addUndirectedEdge('kitchen', 'balcony');
        this.graph.addUndirectedEdge('living_room', 'balcony');
        this.graph.addUndirectedEdge('room1', 'balcony', {weight: 3});
        this.graph.addUndirectedEdge('room2', 'balcony', {weight: 3});
        this.graph.addUndirectedEdge('room3', 'balcony', {weight: 3});
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
    console.log(rooms.getPath('room3', 'living_room'));
}

//test();