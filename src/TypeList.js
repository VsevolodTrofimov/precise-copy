class TypeList {
  constructor(typeArray) {
    if(typeArray) this.list = [... typeArray]
    else this.list = []
  }

  match(entity) {
    for(let i = 0; i < this.list.length; i++) {
      if(entity instanceof this.list[i].type) {

        console.log('matched', entity, 'as', this.list[i].type)
        console.log('constructed', this.list[i].copy(entity))
        return this.list[i].copy(entity)
      }
    }

    throw new Error('No match was found in typetypeList')
  }

  add(type, copy) {
    if(typeof copy !== 'function') {
      copy = (x) => new type(x)
      console.warn('copy function for', type, 'was generate automatically')
    }
    this.list.push({type, copy});
  }

  arrange() {
    let instanceMap = {}
    let buffer = void 0

    //creating entities
    let entities = []
    this.list.forEach(el => {
      entities.push(new el.type())
    })

    for(let i = 0; i < this.list.length; i++) {
        for(let j = 0; j < this.list.length; j++) {
          if(i !== j && entities[i] instanceof this.list[j].type) {
            if(instanceMap[j]) instanceMap[j].push(this.list[i].type)
            else instanceMap[j] = [this.list[i].type]
          }
        }
    }

    //basically, it will be a bubble sort, this list should be short(<100) anyway
    function swap(i, j) {
      buffer = this.list[i]
      this.list[i] = this.list[j]
      this.list[j] = buffer

      if(instanceMap[i] && instanceMap[j]) {
        buffer = instanceMap[i]
        instanceMap[i] = instanceMap[j]
        instanceMap[j] = buffer
      } else if(instanceMap[i]) {
        instanceMap[j] = instanceMap[i]
        instanceMap[i] = null
      } else if(instanceMap[j]) {
        instanceMap[i] = instanceMap[j]
        instanceMap[j] = null
      }
    }

    for(let i = 0; i < this.list.length - 1; i++) {
      for(let j = i + 1; j < this.list.length; j++) {
        if(instanceMap[i] && instanceMap[i].indexOf(this.list[j].type) > -1) {
          swap.call(this, i, j)
        }
      }
    }
  }
}

module.exports = TypeList
