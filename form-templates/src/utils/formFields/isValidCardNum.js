/**
 * @param {String} value
 * @returns {Boolean | String}
 * True if value look like valid card number and error message if not.
 */
export const isValidCardNum = (cardNumber) => {
  // accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(cardNumber)) return 'Номер карты может состоять только из цифр'

  /* The Luhn Algorithm. */
  // Remove any non-digit characters from the card number
  cardNumber = cardNumber.replace(/\D/g, '')

  const digits = cardNumber.split('').reverse()

  let sum = 0

  for (let i = 0; i < digits.length; i++) {
    let digit = +digits[i]

    if (i % 2 === 1) {
      digit *= 2
      if (digit > 9) {
        digit -= 9
      }
    }
    sum += digit
  }
  return sum % 10 === 0 || 'Карты с таким номером не существует'
}
