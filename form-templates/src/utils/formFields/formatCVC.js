/**
 * deletes everything except numbers
 *
 * just pass this function to the onChange handler:
 *
 * <input onChange={formatDate} ... />
 * @param {EventListenerObject} event
 */
export const formatCVC = ({ target }) => {
  target.value = target.value.replace(/\D/g, '').slice(0, 3)
}
