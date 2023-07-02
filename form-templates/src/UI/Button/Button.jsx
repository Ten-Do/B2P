import React from 'react';

function Button(props) {
      return <button 
      className={props.className}
      type={props}
      >{props.name}</button>;
  }

export default Button;