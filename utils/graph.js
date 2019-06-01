class Graph {
    constructor() {
      this.nodes = [];
      this.adjacencyList = {};
    }

    addNode(node) {
      this.nodes.push(node);
      this.adjacencyList[node] = [];
    }
    
    addEdge(node1, node2, meta){
      this.adjacencyList[node1].push({node:node2, meta: meta});
    }
    
    getAdjacencyList(node){
      return this.adjacencyList[node];
    }
}

module.exports = Graph;