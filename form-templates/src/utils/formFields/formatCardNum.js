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
  // const d = target.value.length - target.selectionStart
  const pos = target.selectionStart
  target.value = _formatCardNumber(target.value)
  // target.setSelectionRange(target.value.length - d, target.value.length - d)
  target.setSelectionRange(pos, pos)
}

const _formatCardNumber = (value) => {
  return value
    .replace(/\D/g, '')
    .slice(0, 19)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
}

export const cardNumField_onKeyPress = (event) => {
  const pos = event.target.selectionStart
  if (event.key === 'Backspace') {
    if (event.target.value.charAt(pos - 1) === ' ') {
      event.target.setSelectionRange(pos - 1, pos - 1)
    }
  } else if (!isNaN(event.key)) {
    if (event.target.value.charAt(pos) === ' ' || event.target.value.charAt(pos) === '') {
      window.requestAnimationFrame(() => event.target.setSelectionRange(pos + 2, pos + 2))
      // setTimeout(() => event.target.setSelectionRange(pos + 2, pos + 2), 1000)
    }
  } else if (event.key.length === 1 && !event.ctrlKey) {
    event.preventDefault()
  }
}
