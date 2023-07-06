/**
 * @param {String} value
 * @returns {Boolean | String}
 * True if `value` look like valid date and current date < `value`. error message if not.
 */
export const isValidDate = (value) => {
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear() % 100
  const currentMonth = currentDate.getMonth() + 1

  const [inputMonth = -1, inputYear = -1] = value.split(' / ').map(parseInt)

  if (inputMonth > 12 || inputMonth < 1) return 'Месяц введен неверно'
  else if (inputYear < currentYear || (inputMonth < currentMonth && inputYear === currentYear))
    return 'Срок действия карты истек'
  return true
}
