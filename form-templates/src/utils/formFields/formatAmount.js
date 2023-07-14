/**
 * format input value like that:
 *
 * 1000000 -> 1,000,000
 *
 * 1000.23 -> 1,000.23
 *
 * just pass this function to the onChange handler:
 *
 * <input onChange={formatAmount} ... />
 * @param {EventListenerObject} event
 */
export const formatAmount = ({ target }) => {
  const d = target.value.length - target.selectionStart
  target.value = _formatAmount(target.value)
  target.setSelectionRange(target.value.length - d, target.value.length - d)
}

export const _formatAmount = (value) => {
  const parts = value
    .replace(/[^0-9.]/g, '')
    .replace(/\.(?=.*\.)/g, '')
    .replace(/^0+/, '')
    .split('.')
  parts[0] = parts[0].slice(0, 13).replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  if (parts[1]) parts[1] = parts[1].slice(0, 2)
  return parts.join('.')
}
