module.exports = format_date

var months = [
    'January'
  , 'February'
  , 'March'
  , 'April'
  , 'May'
  , 'June'
  , 'July'
  , 'August'
  , 'September'
  , 'October'
  , 'November'
  , 'December'
]

function format_date(_date) {
  if(!_date) return 'N/A'

  var date = new Date(_date)
    , result = ''

  result += month(date.getMonth()) + ' '
  result += date.getDate() + ', '
  result += date.getFullYear() + ' '

  return result
}

function month(num) {
  return months[num]
}
