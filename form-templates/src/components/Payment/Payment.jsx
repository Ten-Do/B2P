import React from 'react';
import { useForm } from "react-hook-form";


/* COMPONENTS */
import Footer from '../Footer/Footer';
import Button from '../../UI/Button/Button';
import Input from '../../UI/Input/Input';


/* STYLES */
import PaymentStyles from './Payment.module.scss';


/* ICONS */
import TinkoffLogo from '../../assets/tinkoff-logo.svg';

export default function Payment({amount, fee, toggle}) {

    const {
        register,
        handleSubmit,
        //watch,
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
            <form className={PaymentStyles.card__form} autoComplete='off'
                    onSubmit={handleSubmit((data) => {
                        alert(JSON.stringify(data));
                      })}>

            {/* Tinkoff Card logo */}
            <figure className={PaymentStyles.tinkoff__logo}>
                <img src={TinkoffLogo} alt="tinkoff__logo" />
             </figure>


                <div className={PaymentStyles.card__attribites}>
                    <div className={PaymentStyles.number__attribute}>
                    {/* CARD NUMBER INPUT */}
                    <Input
                    title={'Номер карты'}
                    type='number'
                    register={register("number", { required: true, size:16 })}
                    placeholder="1234 5678 1234 5678"
                    errors={errors.number}/>
                    </div>

                    <div className={PaymentStyles.date__attribute}>
                    {/* EXPIRE DATE INPUT */}
                    <div>
                    <Input
                    title={'Месяц / год'}
                    type='number'
                    register={register("expire", { required: true})}
                    placeholder="ММ / ГГ"
                    errors={errors.expire}/>
                    </div>

                    <div>
                    {/* CVV CODE INPUT */}
                   <Input
                    title={'CVV / CVC'}
                    type='password'
                    register={register("code", { required: true, size:3 })}
                    placeholder="123"
                    errors={errors.code}/>
                    </div>
                    </div>
                </div>
            </form>

            {/* CHECKBOX INPUT */}
            <div className={PaymentStyles.savecard__block}>
                <Input
                className={PaymentStyles.checkbox__label}
                title={'Сохранить карту для следующих покупок'}
                type='checkbox'/>
            </div>

            <p className={PaymentStyles.payment__fee}>Комиссия: {fee ?? 0}₽</p>

            <div className={PaymentStyles.payment__agreement}>
            <Button className={PaymentStyles.submit__button} type={'submit'} onClick={toggle}>Оплатить {amount ?? 0}₽</Button>
            <p className={PaymentStyles.agreement__policy}>Нажимая на кнопку «Перевести», вы соглашаетесь с <b className={PaymentStyles.bold__span}>условиями оферты</b></p>
            </div>
        </section>
        <Footer />
        </>
    );
}
