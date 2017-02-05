const Graph = function () {
  this.vertices = []
  this.edges = []
  this.numberOfEdges = []
}

Object.assign(Graph.prototype, {
  addVertex (vertex) {
    this.vertices.push(vertex)
    this.edges[vertex] = []
  },

  addEdge (vertex1, vertex2) {
    this.edges[vertex1].push(vertex2)
    this.edges[vertex2].push(vertex1)
    this.numberOfEdges++
  },

  removeVertex (vertex) {
    let index = this.vertices.indexOf(vertex)
    if (~index) {
      this.vertices.splice(index, 1)
    }

    while (this.edges[vertex].length) {
      let adjastedVertex = this.edges[vertex].pop()
      this.removeEdge(adjastedVertex, vertex)
    }
  },

  removeEdge (vertex1, vertex2) {
    let index1 = this.edges[vertex1] ? this.edges[vertex1].indexOf(vertex2) : -1
    let index2 = this.edges[vertex2] ? this.edges[vertex2].indexOf(vertex1) : -1

    if (~index1) {
      this.edges[vertex1].splice(index1, 1)
      this.numberOfEdges--
    }

    if (~index2) {
      this.edges[vertex2].splice(index2, 1)
    }
  },

  traverseDFS (vertex, fn) {
    if (!~this.vertices.indexOf(vertex)) {
      return console.log('vertex no found')
    }

    let visited = []
    this._traverseDFS(vertex, visited, fn)
  },

  _traverseDFS (vertex, visited, fn) {
    visited[vertex] = true

    if (this.edges[vertex] !== undefined) {
      fn(vertex)
    }

    for (var i = 0; i < this.edges[vertex].length; i++) {
      let v = this.edges[vertex][i]
      if (!visited[v]) {
        this._traverseDFS(v, visited, fn)
      }
    }
  },

  traverseBFS (vertex, fn) {
    if (!~this.vertices.indexOf(vertex)) {
      return console.log('vertex not found')
    }

    let queue = []
    queue.push(vertex)
    let visited = []
    visited[vertex] = true

    while (queue.length) {
      let vertex = queue.shift()
      fn(vertex)

      for (let i = 0; i < this.edges[vertex].length; i++) {
        let current = this.edges[vertex][i]
        if (!visited[current]) {
          visited[current] = true
          queue.push(current)
        }
      }
    }
  },

  pathFromTo (vertexSource, vertexDestination) {
    if (!~this.vertices.indexOf(vertexSource)) {
      return console.log('vertex not found')
    }

    let queue = []
    queue.push(vertexSource)
    let visited = []
    visited[vertexSource] = true
    var paths = []

    while (queue.length) {
      let vertex = queue.shift()

      for (let i = 0; i < this.edges[vertex].length; i++) {
        let current = this.edges[vertex][i]
        if (!visited[current]) {
          visited[current] = true
          queue.push(current)
          paths[current] = vertex
        }
      }
    }

    if (!visited[vertexDestination]) {
      return undefined
    }

    let path = []
    for (let j = vertexDestination; j !== vertexSource; j = paths[j]) {
      path.push(j)
    }

    path.push(vertexSource)

    return path.reverse().join('-')
  },

  size () {
    return this.vertices.length
  },

  relations () {
    return this.numberOfEdges
  },

  print () {
    let str = this
      .vertices
      .map(vertex => vertex + ' -> ' + this.edges[vertex].join(', ').trim())
      .join(' |')

    console.log(str)
  }
})

const graph = new Graph()

graph.addVertex(1)
graph.addVertex(2)
graph.addVertex(3)
graph.addVertex(4)
graph.addVertex(5)
graph.addVertex(6)
graph.print() // 1 -> | 2 -> | 3 -> | 4 -> | 5 -> | 6 ->
graph.addEdge(1, 2)
graph.addEdge(1, 5)
graph.addEdge(2, 3)
graph.addEdge(2, 5)
graph.addEdge(3, 4)
graph.addEdge(4, 5)
graph.addEdge(4, 6)
graph.print() // 1 -> 2, 5 | 2 -> 1, 3, 5 | 3 -> 2, 4 | 4 -> 3, 5, 6 | 5 -> 1, 2, 4 | 6 -> 4
console.log('graph size (number of vertices):', graph.size()) // => 6
console.log('graph relations (number of edges):', graph.relations()) // => 7
graph.traverseDFS(1, vertex => console.log(vertex)) // => 1 2 3 4 5 6
console.log('---')
graph.traverseBFS(1, vertex => console.log(vertex)) // => 1 2 5 3 4 6
graph.traverseDFS(0, vertex => console.log(vertex)) // => 'Vertex not found'
graph.traverseBFS(0, vertex => console.log(vertex)) // => 'Vertex not found'
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)) // => 6-4-5-1
console.log('path from 3 to 5:', graph.pathFromTo(3, 5)) // => 3-2-5
graph.removeEdge(1, 2)
graph.removeEdge(4, 5)
graph.removeEdge(10, 11)
console.log('graph relations (number of edges):', graph.relations()) // => 5
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)) // => 6-4-3-2-5-1
graph.addEdge(1, 2)
graph.addEdge(4, 5)
console.log('graph relations (number of edges):', graph.relations()) // => 7
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)) // => 6-4-5-1
graph.removeVertex(5)
console.log('graph size (number of vertices):', graph.size()) // => 5
console.log('graph relations (number of edges):', graph.relations()) // => 4
console.log('path from 6 to 1:', graph.pathFromTo(6, 1)) // => 6-4-3-2-1
