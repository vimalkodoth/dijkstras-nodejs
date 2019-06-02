let PriorityQueue = require('./priorityQueue');

class DijkstrasAlgorithm {
    constructor(nodes, graph){
        this.priorityQueue = new PriorityQueue();
        this.nodes = nodes;
        this.graph = graph;
    }  
    run(node, endNode, label, discount){
        var currNode, startNode, adjacencyList, costs = {}, backtrace = {};
        
        label = label || 'cost';
        for(var i=0;i<this.nodes.length;i++){
            costs[this.nodes[i]] = {};
            costs[this.nodes[i]].cost = Infinity;
            costs[this.nodes[i]].done = false;
            costs[this.nodes[i]].path = {};
        }
        costs[node].cost = 0;
        this.priorityQueue.enqueue([node,0]);
        while(!this.priorityQueue.isEmpty()){
            currNode = this.priorityQueue.dequeue(),
            adjacencyList = this.graph.getAdjacencyList(currNode[0]);
            if(costs[currNode[0]].done){
                continue;
            }
            for(var i=0;i<adjacencyList.length;i++){
                var neighborNode =  adjacencyList[i]['node'],
                    edgeWeight = {},
                    transport = adjacencyList[i]['meta'].transport;
                
                edgeWeight['cost'] = adjacencyList[i]['meta'].cost;
                edgeWeight['duration'] = parseInt(adjacencyList[i]['meta']['duration'].h)*60 + parseInt(adjacencyList[i]['meta']['duration'].m);
                
                if(discount){
                    edgeWeight['cost'] -= (edgeWeight['cost']*((adjacencyList[i]['meta'].discount)/100))
                }
                
                var cost = edgeWeight[label] + costs[currNode[0]].cost;
                if(cost < costs[neighborNode].cost){
                    costs[neighborNode].cost = cost;
                    costs[neighborNode].transport = transport;
                    costs[neighborNode].path = { from: currNode[0] };
                    costs[neighborNode].path['cost'] = edgeWeight['cost'];
                    costs[neighborNode].path['duration'] = edgeWeight['duration'];
                }
                if(!costs[neighborNode].done){
                this.priorityQueue.enqueue([neighborNode,cost]);
                }
            }
            costs[currNode[0]].done = true;
        }
        
    //Below code is uncommented to trace the shortest path from node to endNode
        var currNod = endNode;
        var trace = [];
        trace.push({from: costs[currNod].path.from, node:currNod, cost: costs[currNod].path.cost, duration:costs[currNod].duration, transport: costs[currNod].transport });
        while(currNod){
            currNod = costs[currNod].path.from
            var prevNod = costs[trace[0].from];
            if(costs[currNod] && costs[currNod].path && costs[currNod].path.from){
                trace.unshift({from: costs[currNod].path.from, node: currNod, cost:  prevNod.path.cost, duration: prevNod.path.duration, route: prevNod.transport})
            }
        }
    return trace;
    }
}


module.exports = DijkstrasAlgorithm;