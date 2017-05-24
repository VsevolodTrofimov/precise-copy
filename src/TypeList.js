class TypeList {
  constructor(typeArray) {
    if(typeArray) this.values = [... typeArray]
    else this.values = []
  }

  match(entity) {
    for(let i = 0; i < this.values.length; i++) {
      if(entity instanceof this.values[i].type) return this.values[i]
    }

    console.log('No match for', entity, 'was found in typeList')

    throw new Error('MATCH ERROR')
  }

  add(type, copy) {
    if(typeof copy !== 'function') {
      copy = (x) => new type(x)
      console.warn('copy function for', type, 'was generate automatically')
    }
    this.values.push({type, copy});
  }

  arrange() {
    let instanceMap = {}
    let buffer = void 0

    //creating entities
    let entities = []
    this.values.forEach(el => {
      entities.push(new el.type())
    })

    for(let i = 0; i < this.values.length; i++) {
        for(let j = 0; j < this.values.length; j++) {
          if(i !== j && entities[i] instanceof this.values[j].type) {
            if(instanceMap[j]) instanceMap[j].push(this.values[i].type)
            else instanceMap[j] = [this.values[i].type]
          }
        }
    }

    //basically, it will be a bubble sort, this list should be short(<100) anyway
    function swap(i, j) {
      buffer = this.values[i]
      this.values[i] = this.values[j]
      this.values[j] = buffer

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

    for(let i = 0; i < this.values.length - 1; i++) {
      for(let j = i + 1; j < this.values.length; j++) {
        if(instanceMap[i] && instanceMap[i].indexOf(this.values[j].type) > -1) {
          swap.call(this, i, j)
        }
      }
    }
  }
}

module.exports = TypeList
