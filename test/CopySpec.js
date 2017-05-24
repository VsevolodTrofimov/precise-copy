//test environment
const chai = require('chai');
const assert = chai.assert;
const deepFreeze = require('deep-freeze');

//test subject
const copy = require('../src/copy')
const TypeList = require('../src/TypeList')
const objectType = require('../typeLib/object')
const arrayType = require('../typeLib/array')

describe('Copy', function() {
  let source = {}

  beforeEach(function() {
    source = {a: {b: 'b', c: {d: 'd',  e: {f: 'f'}}}, g: {h: 'h'}}
  })

  it('Performs the pure precise copy', function() {
    deepFreeze(source)
    let copy1 = copy(new TypeList([objectType]), source, ['a'])
    let copy2 = copy(new TypeList([objectType]), source, ['a', 'c', 'e'])

    assert.strictEqual(copy1.g, source.g)
    assert.strictEqual(copy2.g, source.g)

    assert.strictEqual(copy1.a.c, source.a.c)
    assert.notStrictEqual(copy2.a.c, source.a.c)

    assert.strictEqual(copy2.a.c.d, source.a.c.d)
  })

  it('Works with arrays', function() {
    source.a.b = [{i: 'i'}, {j: 'j'}]

    let copy1 = copy(new TypeList([arrayType, objectType]), source, ['a', 'b', 1])

    assert.isTrue(Array.isArray(source.a.b))

    assert.strictEqual(copy1.g, source.g)

    assert.strictEqual(copy1.a.b[0], source.a.b[0])
    assert.notStrictEqual(copy1.a.b[1], source.a.b[1])
  })
});
