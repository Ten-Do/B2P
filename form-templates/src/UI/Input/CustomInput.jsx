import React from 'react'

//styles scss

const CustomInput = ({ register, title, errors, className = '', type = 'text', placeholder = '' }) => {
  return (
    <label className={className ? className : ''}>
      {title}
      <input type={type} {...register} placeholder={placeholder} />
      {errors && <p>{errors.message}</p>}
    </label>
  )
}
export default CustomInput
