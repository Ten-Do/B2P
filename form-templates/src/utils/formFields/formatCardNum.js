/**
 * format input value like that:
 * 
 * 123412341234123 -> 1234 1234 1234 123
 * 
 * just pass this function to the onChange handler:
 * 
 * <input onChange={formatCardNumber} ... />
 * @param {EventListenerObject} event
 */
export const formatCardNumber = (event) => {
  event.target.value = event.target.value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}
