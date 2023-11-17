/* complex_code.js */

// This code demonstrates a complex algorithm for finding the shortest path between two points
// using Dijkstra's algorithm and a custom graph implementation.

function Graph() {
  this.nodes = [];
}

Graph.prototype.addNode = function(node) {
  this.nodes.push(node);
};

Graph.prototype.addEdge = function(node1, node2, weight) {
  node1.edges.push({ node: node2, weight: weight });
  node2.edges.push({ node: node1, weight: weight });
};

function Node(id) {
  this.id = id;
  this.edges = [];
  this.visited = false;
  this.distance = Infinity;
  this.previous = null;
}

function dijkstra(graph, startNodeId) {
  var startNode = graph.nodes.find(function(node) {
    return node.id === startNodeId;
  });

  if (!startNode) {
    console.log('Start node not found.');
    return;
  }

  startNode.distance = 0;
  var queue = [startNode];

  while (queue.length > 0) {
    var currentNode = queue.shift();
    currentNode.visited = true;

    currentNode.edges.forEach(function(edge) {
      var neighborNode = edge.node;
      var tentativeDistance = currentNode.distance + edge.weight;

      if (tentativeDistance < neighborNode.distance) {
        neighborNode.distance = tentativeDistance;
        neighborNode.previous = currentNode;
      }

      if (!neighborNode.visited) {
        queue.push(neighborNode);
      }
    });
  }
}

// Usage:

var graph = new Graph();

var nodeA = new Node('A');
var nodeB = new Node('B');
var nodeC = new Node('C');
var nodeD = new Node('D');
var nodeE = new Node('E');

graph.addNode(nodeA);
graph.addNode(nodeB);
graph.addNode(nodeC);
graph.addNode(nodeD);
graph.addNode(nodeE);

graph.addEdge(nodeA, nodeB, 4);
graph.addEdge(nodeA, nodeC, 2);
graph.addEdge(nodeB, nodeD, 5);
graph.addEdge(nodeC, nodeD, 1);
graph.addEdge(nodeC, nodeE, 4);
graph.addEdge(nodeD, nodeE, 1);

dijkstra(graph, 'A');

var result = graph.nodes.map(function(node) {
  return {
    id: node.id,
    distance: node.distance,
    previous: node.previous ? node.previous.id : null
  };
});

console.log(result);

// The output will be an array of objects containing each node's id, shortest distance from the start node,
// and the id of the previous node in the shortest path.