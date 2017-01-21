const Node = function (data) {
  if (data === undefined) throw new Error('wrong node!')
  this.data = data
  this.children = []
}

const Tree = function () {
  this.root = null
}

Object.assign(Tree.prototype, {
  add (data, toNodeData) {
    let node = new Node(data)
    let parent = toNodeData ? this.findBFS(toNodeData) : null

    if (parent) {
      parent.children.push(node)
    } else {
      if (this.root) return 'Root node is already assigned'
      this.root = node
    }
  },

  remove (data) {
    if (this.root.data === data) this.root = null

    let queue = [this.root]
    while (queue.length) {
      let node = queue.shift()

      for (let i = 0; i < node.children.length; i++) {
        if (node.children[i].data === data) {
          return node.children.splice(i, 1)
        }
        queue.push(node.children[i])
      }
    }
  },

  contains (data) {
    return !!this.findBFS(data)
  },

  findBFS (data) {
    let queue = [this.root]

    while (queue.length) {
      let node = queue.shift()
      if (node.data === data) return node

      node.children.forEach(node => queue.push(node))
    }
  },

  _preOrder (node, fn) {
    if (!node) return

    if (fn) fn(node)
    node.children.forEach(node => this._preOrder(node, fn))
  },

  _postOrder (node, fn) {
    if (!node) return

    node.children.forEach(node => this._postOrder(node, fn))
    if (fn) fn(node)
  },

  traverseDFS (fn, method) {
    let current = this.root

    if (method) {
      this['_' + method](current, fn)
    } else {
      this._preOrder(current, fn)
    }
  },

  traverseBFS (fn) {
    let queue = [this.root]
    while (queue.length) {
      let node = queue.shift()
      if (fn) fn(node)
      node.children.forEach(node => queue.push(node))
    }
  },

  print () {
    if (!this.root) return console.log('No root node found')

    let newLine = new Node('|')
    let queue = [this.root, newLine]
    let string = ''

    while (queue.length) {
      let node = queue.shift()
      string += node.data.toString() + ' '

      if (node === newLine && queue.length) queue.push(newLine)
      node.children.forEach(node => queue.push(node))
    }

    console.log(string.slice(0, -2).trim())
  },

  printByLevel () {
    if (!this.root) return console.log('No root node found')

    let newLine = new Node('\n')
    let queue = [this.root, newLine]
    let string = ''

    while (queue.length) {
      let node = queue.shift()
      string += node.data.toString() + (node.data === '\n' ? '' : ' ')

      if (node === newLine && queue.length) queue.push(newLine)
      node.children.forEach(node => queue.push(node))
    }

    console.log(string)
  }
})

let tree = new Tree()
tree.print()
tree.add('ceo')
tree.add('cto', 'ceo')
tree.add('dev1', 'cto')
tree.add('dev2', 'cto')
tree.add('dev3', 'cto')
tree.add('cfo', 'ceo')
tree.add('accountant', 'cfo')
tree.add('cmo', 'ceo')
tree.print() // => ceo | cto cfo cmo | dev1 dev2 dev3 accountant
tree.printByLevel()  // => ceo \n cto cfo cmo \n dev1 dev2 dev3 accountant
console.log('tree contains dev1 is true:', tree.contains('dev1')) // => true
console.log('tree contains dev4 is false:', tree.contains('dev4')) // => false
console.log('--- BFS')
tree.traverseBFS((node) => { console.log(node.data) }) // => ceo cto cfo cmo dev1 dev2 dev3 accountant
console.log('--- DFS preOrder')
tree.traverseDFS((node) => { console.log(node.data) }, 'preOrder') // => ceo cto dev1 dev2 dev3 cfo accountant cmo
console.log('--- DFS postOrder')
tree.traverseDFS((node) => { console.log(node.data) }, 'postOrder') // => dev1 dev2 dev3 cto accountant cfo cmo ceo
tree.remove('cmo')
tree.print() // => ceo | cto cfo | dev1 dev2 dev3 accountant
tree.remove('cfo')
tree.print() // => ceo | cto | dev1 dev2 dev3
