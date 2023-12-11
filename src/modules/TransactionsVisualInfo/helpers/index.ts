export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь'
]

export const getRangeDateFromMonth = (
  date: Date
): {
  firstDay: Date
  lastDay: Date
} => {
  return {
    firstDay: new Date(date.getFullYear(), date.getMonth(), 1),
    lastDay: new Date(date.getFullYear(), date.getMonth() + 1, 0)
  }
}
