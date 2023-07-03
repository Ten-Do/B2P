import React from 'react';

const Input = ({ className, title, type, register, placeholder, errors }) => {
    return (
      <label className={className ? className : ''}>
        {title}
        <input type={type} {...register} placeholder={placeholder} />
        {errors && <p>Поле обязательно</p>}
      </label>
    );
  };
  
  export default Input;