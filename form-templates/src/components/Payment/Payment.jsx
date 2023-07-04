import React from 'react';
import { useForm } from "react-hook-form";


/* COMPONENTS */
import Footer from '../Footer/Footer';
import Button from '../../UI/Button/Button';


/* STYLES */
import PaymentStyles from './Payment.module.scss';


/* ICONS */
import TinkoffLogo from '../../assets/tinkoff-logo.svg';

/* UTILS */
import { isValidCardNum } from '../../utils/inputFields/isValidCardNum';

export default function Payment({amount}) {

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

    return(
        <>
        <section className={PaymentStyles.form__container}>
            <form className={PaymentStyles.card__form} autoComplete='off'>

            {/* Tinkoff Card logo */}
            <figure className={PaymentStyles.tinkoff__logo}>
                <img src={TinkoffLogo} alt="tinkoff__logo" />
             </figure>


                <div className={PaymentStyles.card__attribites}>
                    <div className={PaymentStyles.number__attribute}>
                    <label>Номер карты</label>
                    <input type='number' {...register("number", {required: "Поле обязательно", validate: isValidCardNum})} placeholder="1234 5678 1234 5678"></input>
                    </div>

                    <div className={PaymentStyles.date__attribute}>
                    <div>
                    <label>Месяц / год</label>
                    <input type='number' {...register("expire", {required: "Поле обязательно"})} placeholder="ММ / ГГ"></input>
                    </div>

                    <div>
                    <label>CVV / CVC</label>
                    <input type='password' {...register("code", {required: "Поле обязательно"})} placeholder="123"></input>
                    </div>
                    </div>
                </div>
            </form>

            <div className={PaymentStyles.savecard__block}>
            <label className={PaymentStyles.checkbox__label}>
            <input type="checkbox" />
            Сохранить карту для следующих покупок
            </label>
            </div>

            <div className={PaymentStyles.payment__agreement}>
            <Button className={PaymentStyles.submit__button} type='submit'>Оплатить {amount ?? 0}₽</Button>
            <p className={PaymentStyles.agreement__policy}>Нажимая на кнопку «Перевести», вы соглашаетесь с <b className={PaymentStyles.bold__span}>условиями оферты</b></p>
            </div>
        </section>
        <Footer />
        </>
    );
}
