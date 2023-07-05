import React from 'react'
import './CustomButton.scss'

//props isloading + button disabled

const CustomButton = ({ className, type = 'submit', children, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default CustomButton
