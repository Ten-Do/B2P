import React, {useState} from 'react';
import { useForm } from "react-hook-form";

/* COMPONENTS */
import Button from '../../UI/Button/Button';


/* STYLES */
import UnipayStyles from './Unipay.module.scss';


/* ICONS */
// svg inline 
const AmountValueIcon = ({fillColor}) => (
  <svg
  fill='none'
  width="12" 
  height="13" 
  viewBox="0 0 12 13" 
  xmlns="http://www.w3.org/2000/svg"
  >
    <path 
    d="M6.67383 8.22754H0.0205078V6.47852H6.62988C7.22168 6.47852 7.69922 6.3877 8.0625 6.20605C8.42578 6.01855 8.69238 5.75781 8.8623 5.42383C9.03223 5.08984 9.11719 4.7002 9.11719 4.25488C9.11719 3.85645 9.03223 3.48437 8.8623 3.13867C8.69238 2.79297 8.42871 2.51172 8.07129 2.29492C7.71387 2.07227 7.24805 1.96094 6.67383 1.96094H4.01953V13H1.81348V0.203125H6.67383C7.6582 0.203125 8.49609 0.375977 9.1875 0.72168C9.87891 1.06738 10.4092 1.54492 10.7783 2.1543C11.1475 2.75781 11.332 3.45215 11.332 4.2373C11.332 5.0752 11.1445 5.79297 10.7695 6.39062C10.4004 6.98242 9.86719 7.43652 9.16992 7.75293C8.47852 8.06934 7.64648 8.22754 6.67383 8.22754ZM6.88477 9.16797V10.917H0.0205078V9.16797H6.88477Z" fill={hoverColor}/>
  </svg>
);

export default function Unipay() {

    const {
        register,
        handleSubmit,
        // watch,
        formState: { errors }
        } = useForm({
        mode: 'onBlur',
        defaultValues: {
            amount: "",
            email: "",
            description: "",
        }
    });
  

    return(
        <form className={UnipayStyles.unipay__form} autoComplete='off'

        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}>
        
        <h1 className={UnipayStyles.form__title}>Создание заказа</h1>

        <div className={UnipayStyles.input__container}>
        <label>Введите сумму заказа
        <figure 
        className={UnipayStyles.amount__icon}>
          <AmountValueIcon 
          fillColor={errors.amount ? 'red' : 'rgb(155, 155, 155)'}
          className={UnipayStyles.amount__icon__svg}/>
        </figure>
        <input className={UnipayStyles.amount__input} type='text' {...register("amount", {required: true, minLength:1, maxLength: 7})} placeholder="0" />
        {errors.amount && <p>Поле обязательно</p>}
        </label>

        <label>Email
        <input type='email' {...register("email", {required: true})} placeholder="example@mail.com" />
        {errors.email && <p>Поле обязательно</p>}
        </label>

        <label>Описание
        <input type='text'
          {...register("description", { required: true})} placeholder="что-то о заказе"/>
        {errors.description && <p>Поле обязательно</p>}
        </label>
        </div>

        <Button className={UnipayStyles.submit__button} type={'submit'} name={'Создать'}></Button>
      </form>
    );
}
