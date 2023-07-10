import React from 'react'
import './CustomButton.module.scss'

const CustomButton = ({ className, type = 'button', children, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default CustomButton
