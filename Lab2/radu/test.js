const HouseMap = require("./map")
var Graph = require ('graphology');
let test = new HouseMap();
var bidirectional = require('graphology-shortest-path/dijkstra');
// try{
//     console.log(test.getPath('room1', 'kitchen'));
// }catch(e){
//     console.log("error")
// }


// let vacuum_map = test.graph.copy();

// vacuum_map.dropNode('balcony');
// console.log(vacuum_map)


if (process.stdout.isTTY) {
    console.log('hi console');
  }
  else {
    console.log('hi file');
  }