let objectKeys = Object.keys || function (obj) {
    let keys = []
    for (let key in obj) {
        if ({}.hasOwnProperty.call(obj, key)) keys.push(key)
    }
    return keys
}

let objectType = {
  type: Object,
  copy: function (obj) {
    let copy = {},
        keys = objectKeys(obj)
    for (let i = 0, l = keys.length; i < l; i++) {
      copy[keys[i]] = obj[keys[i]];
    }
    return copy
  }
}

module.exports = objectType
