import cn from 'classnames'
import React from 'react'
import { useForm } from 'react-hook-form'

/* STYLES */
import PaymentStyles from './Payment.module.scss'

/* ICONS */
import CodeInfo from '../../assets/ic_ques.svg'
import BankLogo from '../../assets/tinkoff-logo.svg'

/* COMPONENTS */
import Button from '../../UI/Button/CustomButton'
import CustomButtonStyles from '../../UI/Button/CustomButton.module.scss'
import CustomInput from '../../UI/Input/CustomInput'
/* JSON */
import BanksData from '../../utils/paymentData.json'
import Footer from '../Footer/Footer'

console.log(BanksData)

let ButtonSubmitDisabled = cn([
  `${CustomButtonStyles.submit__button}`,
  ` ${CustomButtonStyles.submit__button__disabled}`,
])

let ButtonSubmitEnabled = cn([`${CustomButtonStyles.submit__button}`, ` ${CustomButtonStyles.submit__button__enabled}`])

let SuaiPayButton = cn([`${CustomButtonStyles.submit__button}`, `${CustomButtonStyles.SuaiPay__button}`])

export default function Payment({ amount, fee, toggle }) {
  const {
    register,
    handleSubmit,
    //watch,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      number: '',
      expire: '',
      code: '',
    },
  })

  //const isFormEmpty = Object.keys(errors).length === 0
  const isFormValid = isValid
  //console.log(Object.keys(errors).length)

  return (
    <>
      <section className={PaymentStyles.form__container}>
        <span className={PaymentStyles.previous__arrow} onClick={toggle}>
          &#10094;
        </span>

        <form
          className={PaymentStyles.card__form}
          autoComplete='off'
          action='/'
          // onSubmit={handleSubmit((data) => {
          //   alert(JSON.stringify(data))
          // })}
        >
          {/* Bank logo */}
          <figure className={PaymentStyles.bank__logo}>
            <img src={BankLogo} alt='bank__logo' />
          </figure>

          <div className={PaymentStyles.card__attribites}>
            <div className={PaymentStyles.number__attribute}>
              {/* CARD NUMBER INPUT */}
              <CustomInput
                title={'Номер карты'}
                type='number'
                register={register('number', { required: true, minLength: 16, maxLength: 16 })}
                placeholder='1234 5678 1234 5678'
                errors={errors.number}
                text={'Поле обязательно'}
              />
              {errors.number?.type === 'minLength' && <p>Не менее 16 символов</p>}
              {errors.number?.type === 'maxLength' && <p>Не более 16 символов</p>}
            </div>

            <div className={PaymentStyles.date__attribute}>
              {/* EXPIRE DATE INPUT */}
              <div>
                <CustomInput
                  title={'Месяц / год'}
                  type='number'
                  register={register('expire', { required: true, maxLength: 4, pattern: /^[0-9]+$/ })}
                  placeholder='ММ / ГГ'
                  errors={errors.expire}
                  text={'Поле обязательно'}
                />
                {errors.expire?.type === 'maxLength' && <p>Не более четырех символов</p>}
                {errors.expire?.type === 'pattern' && <p>Только числа</p>}
              </div>

              <div>
                {/* CVV CODE INPUT */}
                <CustomInput
                  title={'CVV / CVC'}
                  type='password'
                  register={register('code', { required: true, maxLength: 3, pattern: /^[0-9]+$/ })}
                  placeholder='123'
                  errors={errors.code}
                  text={'Поле обязательно'}
                />
                {errors.code?.type === 'maxLength' && <p>Не более трех символов</p>}
                {errors.code?.type === 'pattern' && <p>Только числа</p>}
              </div>

              {/* CVV CODE INFO SIGN */}
              <figure className={PaymentStyles.cvv__info}>
                <img src={CodeInfo} alt='code info'></img>
              </figure>
            </div>
          </div>
        </form>

        {/* CHECKBOX INPUT */}
        <div className={PaymentStyles.savecard__block}>
          <CustomInput
            className={PaymentStyles.checkbox__label}
            title={'Сохранить карту для следующих покупок'}
            type='checkbox'
          />
        </div>

        <p className={PaymentStyles.payment__fee}>Комиссия: {fee ?? 0}₽</p>

        <div className={PaymentStyles.payment__agreement}>
          <div className={PaymentStyles.buttons__container}>
            <Button
              // className={cn({ [ButtonSubmitDisabled]: !isFormEmpty, [ButtonSubmitEnabled]: isFormEmpty })}
              className={isFormValid ? ButtonSubmitEnabled : ButtonSubmitDisabled}
              type={'submit'}
              onClick={handleSubmit()}
            >
              Оплатить {amount ?? 0}₽
            </Button>

            <Button className={SuaiPayButton} type={'button'}>
              SUAI PAY
            </Button>
          </div>
          <p className={PaymentStyles.agreement__policy}>
            Нажимая на кнопку «Перевести», вы соглашаетесь с{' '}
            <b className={PaymentStyles.bold__span}>условиями оферты</b>
          </p>
        </div>
      </section>

      {/* guap pay component button (config - true ? render : not) */}
      {/* если поля валидны, функцией разбиваем всё по красоте и submit'им*/}
      {/* фейковая функция комиссии - когда pan заполнен, отправляем запрос: сигнатура, amount, paysystem/card bin */}

      <Footer />
    </>
  )
}
