import React from 'react'
import './CustomInput.scss'

//styles scss

const CustomInput = ({ register, title, errors, options }) => {
  return (
    <label className={options?.type === 'checkbox' ? 'checkbox__label' : ''}>
      {title}
      <input {...register} {...options} />
      {errors && <p>{errors.message}</p>}
    </label>
  )
}
export default CustomInput
