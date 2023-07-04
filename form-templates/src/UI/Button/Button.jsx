import React from 'react'

//props isloading + button disabled

const Button = ({ className, type, children, onClick }) => {
  return (
    <button className={className} type={type} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
