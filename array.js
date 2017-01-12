function MyArray () {
  this.array = []
}

Object.assign(MyArray.prototype, {
  add (elem) {
    this.array.push(elem)
  },

  remove (elem) {
    this.array = this.array.filter(current => current !== elem)
  },

  search (elem) {
    let foundIndex = this.array.indexOf(elem)
    if (foundIndex > -1) return foundIndex
    return null
  },

  getAtIndex (index) {
    return this.array[index]
  },

  length () {
    return this.array.length
  },

  print () {
    return this.array.join(' ')
  }
})

let a = new MyArray()

a.add(8)
a.add(7)
console.log(a.print())
a.remove(8)
console.log(a.print())
a.add(16)
console.log(a.search(16))
console.log(a.length())
