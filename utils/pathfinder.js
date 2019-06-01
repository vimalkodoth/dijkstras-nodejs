let Dijkstras = require('./dijkstras');
let Graph = require('./graph')
let data = require('../static/cities');

let graph = new Graph();

let nodes = [];

for(var i=0;i<data.deals.length;i++){
   if(data.deals[i].departure && nodes.indexOf(data.deals[i].departure) === -1){
      nodes.push(data.deals[i].departure);
   }
   if(data.deals[i].arrival && nodes.indexOf(data.deals[i].arrival) === -1){
     nodes.push(data.deals[i].arrival);
   }
}

for(var i=0;i<nodes.length;i++){
   graph.addNode(nodes[i]);
}

for(var i=0;i<data.deals.length;i++){
   graph.addEdge(data.deals[i].departure, data.deals[i].arrival, data.deals[i]);
}

var pathfinder = new Dijkstras(nodes, graph);

module.exports = pathfinder;
