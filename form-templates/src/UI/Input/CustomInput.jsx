import React from 'react'
import './CustomInput.scss'

const CustomInput = ({ register, title, errors, text, className = '', type = 'text', placeholder = '' }) => {
  return (
    <label className={className ? className : ''}>
      {title}
      <input type={type} {...register} placeholder={placeholder} />
      {errors && <p>{text}</p>}
    </label>
  )
}
export default CustomInput
