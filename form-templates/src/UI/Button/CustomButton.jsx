import React from 'react'
import './CustomButton.module.scss'

const CustomButton = ({ disabled, className, type = 'button', children, onClick }) => {
  if (disabled)
    return (
      <button className={className} type={type} onClick={onClick} disabled>
        {children}
      </button>
    )
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default CustomButton
