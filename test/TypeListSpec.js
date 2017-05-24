//test environment
const chai = require('chai');
const assert = chai.assert;

//test subject
const TypeList = require('../src/TypeList')
const objectType = require('../typeLib/object')
const arrayType = require('../typeLib/array')
const dateType = require('../typeLib/date')

describe('TypeList', function() {
  it('Constructs without argumets', function() {
    let typeList = new TypeList()
    assert.equal(typeList.values.length, 0)
  })
  it('Constructs with given typeArray argumet', function() {
    let typeArray = [objectType, arrayType]
    let typeList = new TypeList(typeArray)

    assert.equal(typeList.values.length, 2)
    assert.equal(typeList.values[0], objectType)
  })

  it('Rearrages items by inheritance', function() {
    function MyDate() {
      Date.call(arguments)
      this.isMy = true
    }

    let myDateType = {
      type: MyDate,
      copy: x => MyDate(x)
    }

    let typeList = new TypeList([objectType, arrayType, dateType, myDateType])

    function calculateParentsToLeft(el, i) {
      let entity = new el.type()
          parentCount = 0

      for(--i; i >= 0; i--) {
        if(entity instanceof typeList.values[i].type) parentCount++
      }

      return parentCount
    }

    typeList.arrange()

    typeList.values.forEach(function(el, i) {
      assert.equal(calculateParentsToLeft(el, i), 0)
    })
  })

  it('Matches objects by type', function() {
    let typeList = new TypeList([objectType, arrayType, dateType])
    typeList.arrange()

    let x = new Date()
    let y = [1, 2, 3]

    assert.equal(typeList.match(x), dateType)
    assert.equal(typeList.match(y), arrayType)
  })
});
