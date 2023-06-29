import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";


/* STYLES */
import UnipayStyles from './Unipay.module.scss';


/* ICONS */
import AmountValue from '../../assets/unipay-input-value.png';

export default function Unipay() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
        } = useForm({
        defaultValues: {
            amount: "",
            email: "",
            description: "",
        }
    });

    console.log(watch("description"));

    return(
        <form autoComplete='off'

        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}>
        
        <h1 className={UnipayStyles.form__title}>Создание заказа</h1>

        <label>Введите сумму заказа</label>
        <figure className={UnipayStyles.amount__icon}>
          <img src={AmountValue} alt="amount__value" />
        </figure>
        <input className={UnipayStyles.amount__input} type='number' {...register("amount", {required: true, minLength:1, maxLength: 7})} placeholder="0" />
        {errors.amount && <p>Поле обязательно</p>}

        <label>Email</label>
        <input type='email' {...register("email", {required: true})} placeholder="example@mail.com" />
        {errors.email && <p>Поле обязательно</p>}

        <label>Описание</label>
        <input type='text'
          {...register("description", { required: true})} placeholder="что-то о заказе"/>
        {errors.description && <p>Поле обязательно</p>}

        <input className={UnipayStyles.submit__button} type="submit" value='Создать' />
      </form>
    );
}