import React from 'react';

const Input = ({ name, type, register, required, placeholder, errors }) => {
    return (
      <label>
        {name}
        <input type={type} {...register} placeholder={placeholder} />
        {errors && <p>Поле обязательно</p>}
      </label>
    );
  };
  
  export default Input;