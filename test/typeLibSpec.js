//test environment
const chai = require('chai');
const assert = chai.assert;

//test subject
const objectType = require('../typeLib/object')
const arrayType = require('../typeLib/array')
const dateType = require('../typeLib/date')
const setType = require('../typeLib/set')
const mapType = require('../typeLib/map')

describe('Type Library', function() {
  it('Includes working object type', function() {
    assert.equal(objectType.type, Object)

    let testObj = {a: {b: 'b'}, c: 'c'}
    let copy = objectType.copy(testObj)

    copy.c = 'd'

    assert.equal(testObj.c, 'c')
    assert.equal(copy.b, testObj.b)
  })

  it('Includes working array type', function() {
    assert.equal(arrayType.type, Array)

    let testArr = [1, 2, {a: 'b'}]
    let copy = arrayType.copy(testArr)

    copy.push(3)

    assert.equal(testArr.length, 3)
    assert.equal(copy[2], testArr[2])
  })

  it('Includes working date type', function() {
    assert.equal(dateType.type, Date)

    let testDate = new Date()
    let checkDate = new Date()
    let copy = dateType.copy(testDate)

    copy.hour = 10

    assert.equal(testDate.hour, checkDate.hour)
    assert.equal(testDate.millisecond, copy.millisecond)
  })

  it('Includes working set type', function() {
    assert.equal(setType.type, Set)

    sampeObj =  {a: 'b'}

    let testSet = new Set([1, sampeObj])
    let copy = setType.copy(testSet)

    copy.add(10)

    assert.isFalse(testSet.has(10))
    assert.equal(testSet.has(sampeObj), copy.has(sampeObj))
  })

  it('Includes working map type', function() {
    assert.equal(mapType.type, Map)

    sampleFuncKey =  function() {}
    sampleObjKey = {a: 'b'}
    sampleStrKey = '1'
    sampleNumKey = 1

    sampleObjVal = {c: 'd'}

    let testMap = new Map()
    testMap.set(sampleFuncKey, 'func')
    testMap.set(sampleObjKey, sampleObjVal)
    testMap.set(sampleStrKey, 'str')
    testMap.set(sampleNumKey, 'num')


    let copy = mapType.copy(testMap)

    copy.set(sampleFuncKey, 'cpyfunc')

    assert.equal(testMap.size, copy.size)
    assert.equal(testMap.get(sampleObjKey), copy.get(sampleObjKey))
    assert.equal(testMap.get(sampleFuncKey), 'func')
    assert.equal(copy.get(sampleStrKey), 'str')
    assert.equal(copy.get(sampleNumKey), 'num')
  })
})
