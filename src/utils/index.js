import { months } from '@/constants'

const utils = {
  getFirstLevelRoute: path => {
    if (path === null) return '/'
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
  },
  convertToEmbedUrl: url => {
    const videoId = url.split('/').pop()
    return `https://www.youtube.com/embed/${videoId}`
  },
  getMonthNames: month => {
    const monthSelected = months.filter(mes => mes.key === parseInt(month))
    return monthSelected.length ? monthSelected[0] : months[0]
  },
  fieldSearch: (list, input, field) => {
    list = list.filter(item => item[field].includes(input))
    return list
  },
  wildCardSearch: (list, input) => {
    const searchText = item => {
      for (const key in item) {
        if (item[key] == null) {
          continue
        }
        if (item[key].toString().toUpperCase().indexOf(input.toString().toUpperCase()) !== -1) {
          return true
        }
      }
    }
    list = list.filter(value => searchText(value))
    return list
  },
  copyTextToClipboard: text => {
    if (!navigator.clipboard) {
      fallbackCopyTextToClipboard(text)
      return
    }
    navigator.clipboard.writeText(text).then(
      function () {
        return true
      },
      function (err) {
        console.error(err)
        return false
      }
    )
  }
}

export default utils
