const Node = function (data) {
  this.data = data
  this.isWord = false
  this.prefixes = 0
  this.children = {}
}
const Trie = function () {
  this.root = new Node('')
}

Object.assign(Trie.prototype, {
  add (word) {
    if (!this.root) return null
    this._addNode(this.root, word)
  },

  _addNode (node, word) {
    if (!node || !word) return null

    node.prefixes++
    let letter = word.charAt(0)
    let child = node.children[letter]

    if (!child) {
      child = new Node(letter)
      node.children[letter] = child
    }

    let reminder = word.substring(1)
    if (!reminder) child.isWord = true

    this._addNode(child, reminder)
  },

  remove (word) {
    if (!this.root) return
    if (this.contains(word)) this._removeNode(this.root, word)
  },

  _removeNode (node, word) {
    if (!node || !word) return null

    let letter = word.charAt(0)
    let child = node.children[letter]

    if (!child) return
    let reminder = word.substring(1)

    if (reminder) {
      if (child.prefixes === 1) {
        delete node.children[letter]
      } else {
        this._removeNode(child, reminder)
      }
    } else {
      if (child.prefixes === 0) {
        delete node.children.letter
      } else {
        child.isWord = false
      }
    }
  },

  contains (word) {
    if (!this.root) return false

    return this._contains(this.root, word)
  },

  _contains (node, word) {
    if (!node || !word) return false

    let letter = word.charAt(0)
    let child = node.children[letter]
    if (!child) return false

    let reminder = word.substring(1)
    if (!reminder && child.isWord === true) return true

    return this._contains(child, reminder)
  },

  countWords () {
    if (!this.root) return console.log('No root node found')

    let queue = [this.root]
    let counter = 0

    while (queue.length) {
      let node = queue.shift()

      if (node.isWord) counter++

      for (let child of Object.keys(node.children)) {
        queue.push(node.children[child])
      }
    }

    return counter
  },

  getWords () {
    let words = []
    let word = ''
    this._getWords(this.root, words, word)
    return words
  },

  _getWords (node, words, word) {
    for (let child of Object.keys(node.children)) {
      word += child
      if (node.children[child].isWord) words.push(word)

      this._getWords(node.children[child], words, word)
      word = word.substring(0, word.length - 1)
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
      if (queue.length && node === newLine) queue.push(newLine)

      for (let child of Object.keys(node.children)) {
        queue.push(node.children[child])
      }
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
      string += node.data.toString() + (node === newLine ? '' : ' ')
      if (queue.length && node === newLine) queue.push(newLine)

      for (let child of Object.keys(node.children)) {
        queue.push(node.children[child])
      }
    }

    console.log(string.trim())
  }
})

var trie = new Trie()
trie.add('one')
trie.add('two')
trie.add('fifth')
trie.add('fifty')
trie.print() // => | o t f | n w i | e o f | t | h y
trie.printByLevel() // => o t f \n n w i \n e o f \n t \n h y
console.log('words are: one, two, fifth, fifty:', trie.getWords()) // => [ 'one', 'two', 'fifth', 'fifty' ]
console.log('trie count words is 4:', trie.countWords()) // => 4
console.log('trie contains one is true:', trie.contains('one')) // => true
console.log('trie contains on is false:', trie.contains('on')) // => false
trie.remove('one')
console.log('trie contains one is false:', trie.contains('one')) // => false
console.log('trie count words is 3:', trie.countWords()) // => 3
console.log('words are two, fifth, fifty:', trie.getWords()) // => [ 'two', 'fifth', 'fifty' ]
