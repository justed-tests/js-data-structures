 // everything seems hacky here ><
 //
function HashTable (size) {
  this.values = {}
  this.numberOfValues = 0
  this.size = size
}

Object.assign(HashTable.prototype, {
  calculateHash (key) {
    return key.toString().length % this.size
  },

  print () {
    let string = ''
    for (let value in this.values) {
      for (let key in this.values[value]) {
        string += this.values[value][key] + ' '
      }
    }

    return string
  },

  add (key, value) {
    let hash = this.calculateHash(key)

    if (!this.values.hasOwnProperty(hash)) {
      this.values[hash] = {}
    }

    if (!this.values[hash].hasOwnProperty(key)) {
      this.numberOfValues++
    }

    this.values[hash][key] = value
  },

  remove (key) {
    let hash = this.calculateHash(key)

    if (!this.values.hasOwnProperty(hash) ||
        !this.values[hash].hasOwnProperty(key)) return

    delete this.values[hash][key]
    this.numberOfValues--
  },

  search (key) {
    let hash = this.calculateHash(key)

    if (!this.values.hasOwnProperty(hash) ||
        !this.values[hash].hasOwnProperty(key)) return null

    return this.values[hash][key]
  },

  length () {
    return this.numberOfValues
  }
})

var hashTable = new HashTable(3)
hashTable.add('first', 1)
hashTable.add('second', 2)
hashTable.add('third', 3)
hashTable.add('fourth', 4)
hashTable.add('fifth', 5)
hashTable.print()
console.log('length gives 5:', hashTable.length())
console.log('search second gives 2:', hashTable.search('second'))
console.log('search unexist gives null:', hashTable.search('unexist'))
hashTable.remove('fourth')
hashTable.remove('first')
hashTable.print()
console.log('length gives 3:', hashTable.length())
