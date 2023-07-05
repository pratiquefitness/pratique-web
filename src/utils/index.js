const utils = {
  getFirstLevelRoute: path => {
    const segments = path.split('/').filter(function (segment) {
      return segment !== ''
    })
    if (segments.length > 0) {
      return '/' + segments[0]
    } else {
      return '/'
    }
  },
  getByObjectKeyValue: (array, key, value) => {
    const result = array.filter(obj => {
      return obj[key] === value
    })
    return result[0] || ''
  },
  clearDatabaseResult: data => {
    const updatedData = JSON.stringify(data, (key, value) => (typeof value === 'bigint' ? value.toString() : value))
    return JSON.parse(updatedData)
  }
}

export default utils
