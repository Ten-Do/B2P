import React from 'react';

const Input = ({ className, name, type, register, required, placeholder, errors }) => {
    return (
      <label className={className ? className : ''}>
        {name}
        <input type={type} {...register} placeholder={placeholder} />
        {errors && <p>Поле обязательно</p>}
      </label>
    );
  };
  
  export default Input;