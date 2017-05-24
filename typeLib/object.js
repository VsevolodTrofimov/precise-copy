let objectType = {
  type: Object,
  copy: function (obj) {
      let copy = {}
      for (let key in obj) {
          copy[key] = obj[key]
      }
      return copy
  }
}

module.exports = objectType
