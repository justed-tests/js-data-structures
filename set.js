const MySet = function () {
  this.values = []
  this.numberOfValues = 0
}

Object.assign(MySet.prototype, {
  add (value) {
    if (this.contains(value)) return

    this.values.push(value)
    this.numberOfValues++
  },

  remove (value) {
    if (!this.contains(value)) return

    let index = this._getIndex(value)
    this.values.splice(index, 1)
    this.numberOfValues--
  },

  contains (value) {
    return this._getIndex(value) > -1
  },

  union (set) {
    let newSet = new MySet()
    set.values.forEach(value => newSet.add(value))
    this.values.forEach(value => newSet.add(value))

    return newSet
  },

  intersect (set) {
    let newSet = new MySet()
    this.values.forEach((value) => {
      if (set.contains(value)) newSet.add(value)
    })

    return newSet
  },

  difference (set) {
    let newSet = new MySet()

    this.values.forEach((value) => {
      if (!set.contains(value)) newSet.add(value)
    })

    return newSet
  },

  isSubset (set) {
    return set.values.every(value => this.contains(value))
  },

  _getIndex (value) {
    return this.values.indexOf(value)
  },

  length () {
    return this.numberOfValues
  },

  print () {
    console.log(this.values.join(' '))
  }
})

var set = new MySet()
set.add(1)
set.add(2)
set.add(3)
set.add(4)
set.print()
set.remove(3)
set.print()
console.log('contains 4 is true:', set.contains(4))
console.log('contains 3 is false:', set.contains(3))
console.log('---')
var set1 = new MySet()
set1.add(1)
set1.add(2)
var set2 = new MySet()
set2.add(2)
set2.add(3)
var set3 = set2.union(set1)
set3.print()
var set4 = set2.intersect(set1)
set4.print()
var set5 = set.difference(set3)
set5.print()
var set6 = set3.difference(set)
set6.print()
console.log('set1 subset of set is true:', set.isSubset(set1))
console.log('set2 subset of set is false:', set.isSubset(set2))
console.log('set1 length gives 2:', set1.length())
console.log('set3 length gives 3:', set3.length())
