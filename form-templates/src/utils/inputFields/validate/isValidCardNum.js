/**
 * @param {String} value 
 * @returns {Boolean}
 * True if value look like valid card number.
 */
export function isValidCardNum(cardNumber) {
  // accept only digits, dashes or spaces
  if (/[^0-9-\s]+/.test(value)) return false;

  /* The Luhn Algorithm. */
  
  // Remove any non-digit characters from the card number
  cardNumber = cardNumber.replace(/\D/g, '');

  // Reverse the card number and convert it to an array of digits
  const digits = cardNumber.split('').reverse();

  let sum = 0;

  for (let i = 0; i < digits.length; i++) {
    let digit = +digits[i];

    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  // If the sum is divisible by 10, the card number is valid
  return sum % 10 === 0;
}