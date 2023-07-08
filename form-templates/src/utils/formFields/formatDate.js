/**
 * format input value like that:
 *
 * 1 -> 1
 *
 * 12 -> 12
 *
 * 123 -> 12 / 3
 *
 * 1234 -> 12 / 34
 *
 * 12 /  -> 12
 *
 * 12 / 3 -> 12 /3
 *
 * 12 / 34 -> 12 / 34
 *
 * just pass this function to the onChange handler:
 *
 * <input onChange={formatDate} ... />
 * @param {EventListenerObject} event
 */
export const formatDate = ({ target }) => {
  const d = target.value.length - target.selectionStart
  target.value = _formatDate(target.value)
  target.setSelectionRange(target.value.length - d, target.value.length - d)
}

const _formatDate = (value) => {
  return value
    .replace(/\D/g, '')
    .slice(0, 4)
    .replace(/(\d{2}) \/ /g, '$1')
    .replace(/(\d{2})(\d{1,2})/g, '$1 / $2')
}
