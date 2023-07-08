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
export const formatCardNumber = ({ target }) => {
  const d = target.value.length - target.selectionStart
  target.value = _formatCardNumber(target.value)
  target.setSelectionRange(target.value.length - d, target.value.length - d)
}

const _formatCardNumber = (value) => {
  return value
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}
