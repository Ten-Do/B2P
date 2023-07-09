/* eslint-disable import/order */
import cn from 'classnames'
import React from 'react'
import { useFormContext } from 'react-hook-form'

/* STYLES */
import PaymentStyles from './Payment.module.scss'

/* ICONS */
import CodeInfo from '../../assets/ic_ques.svg'
import BankLogo from '../../assets/tinkoff-logo.svg'

/* UTILS */
import { formatCardNumber } from '../../utils/formFields/formatCardNum'
import { formatCVC } from '../../utils/formFields/formatCVC'
import { formatDate } from '../../utils/formFields/formatDate'
import { isValidCardNum } from '../../utils/formFields/isValidCardNum'
import { isValidDate } from '../../utils/formFields/isValidDate'

/* COMPONENTS */
import Button from '../../UI/Button/CustomButton'
import CustomButtonStyles from '../../UI/Button/CustomButton.module.scss'
import CustomInput from '../../UI/Input/CustomInput'
import Footer from '../Footer/Footer'

let ButtonSubmitDisabled = cn([
  `${CustomButtonStyles.submit__button}`,
  ` ${CustomButtonStyles.submit__button__disabled}`,
])

let ButtonSubmitEnabled = cn([`${CustomButtonStyles.submit__button}`, ` ${CustomButtonStyles.submit__button__enabled}`])

let SuaiPayButton = cn([`${CustomButtonStyles.submit__button}`, `${CustomButtonStyles.SuaiPay__button}`])

export default function Payment({ fee, toggle }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useFormContext()

  const isFormEmpty = Object.keys(errors).length === 0
  //console.log(Object.keys(errors).length)

  const isFormValid = isValid

  return (
    <>
      <section className={PaymentStyles.form__container}>
        <span className={PaymentStyles.previous__arrow} onClick={toggle}>
          &#10094;
        </span>

        <div
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
                title='Номер карты'
                register={register('number', { required: 'Поле обязательно', validate: isValidCardNum })}
                errors={errors.number}
                options={{
                  placeholder: '1234 5678 1234 5678',
                  onChange: formatCardNumber,
                }}
              />
            </div>

            <div className={PaymentStyles.date__attribute}>
              {/* EXPIRE DATE INPUT */}
              <div>
                <CustomInput
                  title='Месяц / год'
                  register={register('expire', {
                    required: 'Поле обязательно',
                    validate: isValidDate,
                  })}
                  errors={errors.expire}
                  options={{
                    placeholder: 'ММ / ГГ',
                    onChange: formatDate,
                  }}
                />
              </div>

              <div>
                {/* CVV CODE INPUT */}
                <CustomInput
                  title={'CVV / CVC'}
                  register={register('code', {
                    required: 'Поле обязательно',
                    pattern: { value: /^(\d{3})$/g, message: 'Код должен состоять из трех цифр' },
                  })}
                  errors={errors.code}
                  options={{
                    mode: 'secret',
                    placeholder: '123',
                    onChange: formatCVC,
                  }}
                />
              </div>

              {/* CVV CODE INFO SIGN */}
              <figure className={PaymentStyles.cvv__info}>
                <img src={CodeInfo} alt='code info'></img>
              </figure>
            </div>
          </div>
        </div>

        {/* CHECKBOX INPUT */}
        <div className={PaymentStyles.savecard__block}>
          <CustomInput title='Сохранить карту для следующих покупок' options={{ type: 'checkbox' }} />
        </div>

        <p className={PaymentStyles.payment__fee}>Комиссия: {fee ?? 0}₽</p>

        <div className={PaymentStyles.payment__agreement}>
          <div className={PaymentStyles.buttons__container}>
            <Button
              className={isFormEmpty ? ButtonSubmitEnabled : ButtonSubmitDisabled}
              //className={cn({ [ButtonSubmitDisabled]: !isFormEmpty, [ButtonSubmitEnabled]: isFormEmpty })}
              type={'submit'}
              onClick={handleSubmit()}
            >
              Оплатить {watch('amount') ?? 0}₽
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
