import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import ReactDOM from "react-dom";


/* COMPONENTS */
import Footer from '../Footer/Footer';


/* STYLES */
import PaymentStyles from './Payment.module.scss';


/* ICONS */
import TinkoffLogo from '../../assets/tinkoff-logo.svg';

export default function Payment() {

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors }
        } = useForm({
        defaultValues: {
            number: "",
            expire: "",
            code: "",
        }
    });

    console.log(watch("code"));

    return(
        <>
        <section>
            <form className={PaymentStyles.card__form} autoComplete='off'>

            {/* Tinkoff Card logo */}
            <figure className={PaymentStyles.tinkoff__logo}>
                <img src={TinkoffLogo} alt="tinkoff__logo" />
             </figure>

                <div className={PaymentStyles.card__attribites}>
                    <div className={PaymentStyles.number__attribute}>
                    <label>Номер карты</label>
                    <input type='number' {...register("number", {required: true, size:16})} placeholder="1234 5678 1234 5678"></input>
                    </div>

                    <div className={PaymentStyles.date__attribute}>
                    <div>
                    <label>Месяц / год</label>
                    <input type='number' {...register("expire", {required: true})} placeholder="ММ / ГГ"></input>
                    </div>

                    <div>
                    <label>CVV / CVC</label>
                    <input type='password' {...register("code", {required: true})} placeholder="123"></input>
                    </div>
                    </div>
                </div>
            </form>
        </section>
        <Footer />
        </>
    );
}