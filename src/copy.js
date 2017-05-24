/**
 * Creates presice copy of your object only objects and arrays listed in path are copied
 * @method preciseObjectCopy
 * @param  {typeList} for copyig by type
 * @param  {Object} source
 * @param  {String[]} path keys to copy
 * @return {Object} part of source, where only listed parts are coped
 */
function preciseObjectCopy (typeList, source, path) {
  let newObj = typeList.match(source).copy(source)

  let proto = source
  let clone = newObj

  for(let i = 0; i < path.length; i++) {
    proto = source
    clone = newObj

    path.slice(0, i).forEach(function(key) {
      proto = proto[key]
      clone = clone[key]
    })

    clone[path[i]] = typeList.match(proto[path[i]]).copy(proto[path[i]])
  }

  return newObj
}

module.exports = preciseObjectCopy
