let Dijkstras = require('./dijkstras');
let Graph = require('./graph');
let data = require('../static/cities');
let helpers = require('./helpers');

let graph = new Graph();

let nodes = [];

nodes = nodes.concat(helpers.getUniqueNodes());

for(var i=0;i<nodes.length;i++){
   graph.addNode(nodes[i]);
}

for(var i=0;i<data.deals.length;i++){
   graph.addEdge(data.deals[i].departure, data.deals[i].arrival, data.deals[i]);
}

var pathfinder = new Dijkstras(nodes, graph);

module.exports = pathfinder;
