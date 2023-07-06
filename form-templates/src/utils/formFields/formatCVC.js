/**
 * deletes everything except numbers
 *
 * just pass this function to the onChange handler:
 *
 * <input onChange={formatDate} ... />
 * @param {EventListenerObject} event
 */
export const formatCVC = (event) => {
  event.target.value = event.target.value.slice(0, 3).replace(/\D/g, '')
}
