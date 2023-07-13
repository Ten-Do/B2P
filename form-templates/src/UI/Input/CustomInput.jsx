import React from 'react'
import './CustomInput.scss'

//styles scss

const CustomInput = ({ register, title, errors, options }) => {
  return (
    <label className={options?.type === 'checkbox' ? 'checkbox__label' : ''}>
      {title}
      <input {...register} {...options} />
      <div className='error-container'>{errors && <p>{errors.message}</p>}</div>
    </label>
  )
}
export default CustomInput
