import React from 'react'
import './CustomInput.scss'

//styles scss

const CustomInput = ({
  register,
  title,
  errors,
  text,
  format = () => {},
  className = '',
  type = 'text',
  placeholder = '',
}) => {
  return (
    <label className={className ? className : ''}>
      {title}
      <input type={type} {...register} onChange={format} placeholder={placeholder} />
      {errors && <p>{errors.message}</p>}
    </label>
  )
}
export default CustomInput
