import React from 'react'

//props isloading + button disabled

const CustomButton = ({ className, type = 'button', children, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default CustomButton
