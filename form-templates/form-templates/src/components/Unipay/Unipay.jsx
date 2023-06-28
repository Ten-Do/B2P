import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";

import UnipayStyles from './Unipay.module.scss';

export default function Unipay() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
        } = useForm({
        // defaultValues: {
        //     amount: "0",
        //     email: "example@mail.com",
        //     description: "что-то о заказе",
        // }
    });

    console.log(watch("description"));

    return(
        <form
        onSubmit={handleSubmit((data) => {
          alert(JSON.stringify(data));
        })}
      >
        <h1 className={UnipayStyles.form__title}>Создание заказа</h1>

        <label>Введите сумму заказа</label>
        <input {...register("amount", {required: true, maxLength: 10})} placeholder="0" />

        <label>Email</label>
        <input {...register("email", {required: true})} placeholder="example@mail.com" />

        <label>Описание</label>
        <input
          {...register("description", { required: true})} placeholder="что-то о заказе"/>
        {errors.exampleRequired && <p>This field is required</p>}

        <input className={UnipayStyles.submit__button} type="submit" value='Создать' />
      </form>
    );
}