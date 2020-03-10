
/*
 * To use pather, follow directions directly below. Any other functions are likely not useful
 * outside of this context.
 */


/*
 * generates a path given a matrix and starting coordinates
 * After creating Pather object, call initializeGraph(matrix) with a matrix with the following encoding:
 * 
 * 0's are a section of the map that the pather can traverse.
 * 1's are a section of the map that the pather cannot traverse.
 * 2's are a section of the map that represents a possible end point.
 * any other encodings are ignored and treated as 1's.
 * 
 * call initializeGraph(matrix) whenever the map changes, or the paths created may not be accurate.
 * call findShortestPathToEnds(xStart, yStart) to generate a new list of lists representation of the coordinates traversed 
 * 
 * example usage:
   let p = new Pather()
   let matrix = [
            [0, 1],
            [2, 2]
        ]
        let start = [0, 0]
        let expected = [[0, 0],[1, 0]]
        p.initializeGraph(matrix)
        let path = p.findShortestPathToEnds(start[0], start[1])
 */
export default class Pather {
    constructor() {
        this.graph = null
        this.map = null
        this.endpoints = null
    }

    /*
     * Takes a matrix to create a graph representation made of nodes
     * adjacent values in the matrix can be linked in node form if their values are 1
     * values that are 0 do not link
     */
    initializeGraph(matrix) {
        this.graph = this.matrixToGraph(matrix)
        this.graph.wipeAllPathData()
    }
    /*
     * converts a matrix into a graph/node representation
     */
    matrixToGraph(matrix) {
        let g = new Graph()
        let nodeMatrix = new Array(matrix.length)
        for (let i = 0; i < matrix.length; i++) {
            nodeMatrix[i] = new Array(matrix[0].length)
        }
        for (let i = 0; i < matrix.length; i++) {
            for (let j = 0; j < matrix[0].length; j++) {
                let val = matrix[i][j]
                if (val == 0 || val == 2) {
                    let n = new PathNode(j, i, val)
                    g.addNode(n)
                    nodeMatrix[i][j] = n
                }
            }
        }
        //console.log(nodeMatrix.length + " by " + nodeMatrix[0].length)

        this.connectAdjacents(nodeMatrix)
        return g
    }

    /*
     * sets references to neighboring nodes determined by their place in the matrix of nodes. 
     * connects up, down, left, right to the center node.
     */
    connectAdjacents(nodeMatrix) {
        for (let i = 0; i < nodeMatrix.length; i++) {
            for (let j = 0; j < nodeMatrix[0].length; j++) {
                let n = nodeMatrix[i][j]
                if (nodeMatrix[i][j] === undefined) {
                    continue;
                }
                if (j > 0) //add left neighbor
                {
                    if (!(nodeMatrix[i][j - 1] === undefined)) {
                        n.adjacentNodes.push([nodeMatrix[i][j - 1], 1])
                    }
                }
                if (j < nodeMatrix[0].length - 1) //add right neighbor
                {
                    if (!(nodeMatrix[i][j + 1] === undefined)) {
                        n.adjacentNodes.push([nodeMatrix[i][j + 1], 1])
                    }
                }
                if (i > 0) //add above neighbor
                {
                    if (!(nodeMatrix[i - 1][j] === undefined)) {
                        n.adjacentNodes.push([nodeMatrix[i - 1][j], 1])
                    }
                }
                if (i < nodeMatrix.length - 1) //add below neighbor
                {
                    if (!(nodeMatrix[i + 1][j] === undefined)) {
                        n.adjacentNodes.push([nodeMatrix[i + 1][j], 1])
                    }
                }
            }
        }
    }

    /*
     * given the start and end coordinates, return a list of coordinates in the format [x, y]
     * the order of these coordinates determines the path from start to end
     */
    findShortestPathToEnds(xStart, yStart) {
        this.graph.wipeAllPathData()
        let startNode = this.graph.getNode(xStart, yStart)
        this.findShortestPaths(startNode)
        let shortest = this.searchShortestPathToEnds()
        let shortestpath = shortest.shortestPath
        shortestpath.push(shortest)
        let result = this.convertPathToListOfLists(shortestpath)
        return result
    }


    /*
     * searches among the nodes for the endpoint nodes, from there, find the endpoint with the shortest path and return path, null if none are found
     */
    searchShortestPathToEnds() {
        let shortest = null;
        let shortestDistance = Number.MAX_SAFE_INTEGER
        for (let i = 0; i < this.graph.nodes.length; i++) {
            let node = this.graph.nodes[i]
            if (node.id == 2 && node.distance < shortestDistance) {
                shortest = node;
                shortestDistance = node.distance
            }
        }
        if (shortest == null) {
            return null
        }
        return shortest
    }

    convertPathToListOfLists(path) {
        let result = []
        for (let i = 0; i < path.length; i++) {
            data = path[i]
            let data = [data.y, data.x]
            result.push(data)
        }
        return result;
    }

    /*
     *given a source node, calculate the shortest path to every node that the specified node can reach.
     *
     */
    findShortestPaths(source) {
        source.setDistance(0)
        let unsettledNodes = []
        let settledNodes = []

        unsettledNodes.push(source)
        let a = 0
        while (unsettledNodes.length != 0) {
            a++
            let currentNode = this.getLowestDistanceNode(unsettledNodes)
            unsettledNodes.splice(unsettledNodes.indexOf(currentNode), 1)

            for (let i = 0; i < currentNode.adjacentNodes.length; i++) {
                let adjacentNode = currentNode.adjacentNodes[i][0]
                let edgeWeight = currentNode.adjacentNodes[i][1]
                if (!settledNodes.includes(adjacentNode) && !unsettledNodes.includes(adjacentNode)) {
                    this.calculateMinimumDistance(adjacentNode, edgeWeight, currentNode)
                    unsettledNodes.push(adjacentNode)
                }
            }
            settledNodes.push(currentNode)
        }
        //console.log(a + " iterations")
    }

    /*
     * return the node in the list that is not settled with the shortest path
     */
    getLowestDistanceNode(unsettledNodes) {
        let lowest = null
        let lowestDistance = Number.MAX_SAFE_INTEGER
        for (let i = 0; i < unsettledNodes.length; i++) {
            let nodeDistance = unsettledNodes[i].distance
            if (nodeDistance < lowestDistance) {
                lowestDistance = nodeDistance
                lowest = unsettledNodes[i]
            }
        }

        return lowest;
    }

    calculateMinimumDistance(evaluationNode, edgeWeight, sourceNode) {
        let sourceDistance = sourceNode.distance
        if (sourceDistance + edgeWeight < evaluationNode.distance) {
            evaluationNode.setDistance(sourceDistance + edgeWeight)
            let shortestPath = []
            for (let i = 0; i < sourceNode.shortestPath.length; i++) {
                shortestPath.push(sourceNode.shortestPath[i])
            }
            shortestPath.push(sourceNode)
            evaluationNode.setShortestPath(shortestPath)
        }
    }

}


/*
 * Node used in graph 
 */
class PathNode {
    constructor(x, y, id) {
        this.distance = Number.MAX_SAFE_INTEGER;
        this.shortestPath = [];
        this.adjacentNodes = [];
        this.x = x;
        this.y = y;
        this.id = id;
    }
    setShortestPath(path) {
        this.shortestPath = path;
    }
    setDistance(distance) {
        this.distance = distance;
    }
}

/*
 * graph construct to contain nodes
 */
class Graph {
    constructor() {
        this.nodes = []
    }

    /*
     * iterates through all nodes in graph
     * resets all pathing information
     * to run another pathing check, run this first
     */
    wipeAllPathData() {
        for (let i = 0; i < this.nodes.length; i++) {
            let node = this.nodes[i]
            node.setShortestPath(node)
            node.distance = Number.MAX_SAFE_INTEGER
        }

    }
    /*
     * searches and returns for a node with given x y coordinates
     */
    getNode(x, y) {
        for (let i = 0; i < this.nodes.length; i++) {
            let node = this.nodes[i]
            if (node.x == x && node.y == y) {
                return node;
            }
        }
        return null;
    }
    addNode(node) {
        this.nodes.push(node)
    }
}
