import React from 'react';

const Input = ({register, title, errors, className='', type='text', placeholder='' }) => {
    return (
      <label className={className ? className : ''}>
        {title}
        <input type={type} {...register} placeholder={placeholder} />
        {errors && <p>{errors.message}</p>}
      </label>
    );
  };
  
  export default Input;
