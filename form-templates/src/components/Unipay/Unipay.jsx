import cn from 'classnames'
import React from 'react'
import { useFormContext } from 'react-hook-form'

/* STYLES */
import UnipayStyles from './Unipay.module.scss'

import Button from '../../UI/Button/CustomButton'
import CustomButtonStyles from '../../UI/Button/CustomButton.module.scss'

/* COMPONENTS */
import CustomInput from '../../UI/Input/CustomInput'
import { formatAmount } from '../../utils/formFields/formatAmount'

/* ICONS */
const AmountValueIcon = ({ fillColor }) => (
  <svg fill='none' width='12' height='13' viewBox='0 0 12 13' xmlns='http://www.w3.org/2000/svg'>
    <path
      d='M6.67383 8.22754H0.0205078V6.47852H6.62988C7.22168 6.47852 7.69922 6.3877 8.0625 6.20605C8.42578 6.01855 8.69238 5.75781 8.8623 5.42383C9.03223 5.08984 9.11719 4.7002 9.11719 4.25488C9.11719 3.85645 9.03223 3.48437 8.8623 3.13867C8.69238 2.79297 8.42871 2.51172 8.07129 2.29492C7.71387 2.07227 7.24805 1.96094 6.67383 1.96094H4.01953V13H1.81348V0.203125H6.67383C7.6582 0.203125 8.49609 0.375977 9.1875 0.72168C9.87891 1.06738 10.4092 1.54492 10.7783 2.1543C11.1475 2.75781 11.332 3.45215 11.332 4.2373C11.332 5.0752 11.1445 5.79297 10.7695 6.39062C10.4004 6.98242 9.86719 7.43652 9.16992 7.75293C8.47852 8.06934 7.64648 8.22754 6.67383 8.22754ZM6.88477 9.16797V10.917H0.0205078V9.16797H6.88477Z'
      fill={fillColor}
    />
  </svg>
)

// let ButtonSubmitDisabled = cn([
//   `${CustomButtonStyles.submit__button}`,
//   ` ${CustomButtonStyles.submit__button__disabled}`,
// ])

// let ButtonSubmitEnabled = cn([`${CustomButtonStyles.submit__button}`, ` ${CustomButtonStyles.submit__button__enabled}`])

export default function Unipay({ toggle }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useFormContext()

  return (
    <div
      className={UnipayStyles.unipay__form}
      onSubmit={handleSubmit((data) => {
        toggle()
      })}
    >
      <h1 className={UnipayStyles.form__title}>Создание заказа</h1>

      <div className={UnipayStyles.input__container}>
        {/* ORDER PRICE INPUT */}
        <CustomInput
          title='Введите сумму заказа'
          register={register('amount', {
            required: 'Поле обязательно',
          })}
          errors={errors.amount}
          options={{
            placeholder: '0',
            onChange: formatAmount,
          }}
        />

        {/* CURRENCY ICON */}
        <figure className={UnipayStyles.amount__icon}>
          <AmountValueIcon
            fillColor={errors.amount ? 'red' : 'rgb(155, 155, 155)'}
            className={UnipayStyles.amount__icon__svg}
          />
        </figure>

        {/* EMAIL INPUT */}
        <CustomInput
          title='Email'
          register={register('email', {
            required: 'Поле обязательно',
            pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: 'email введен неверно' },
          })}
          errors={errors.email}
          options={{
            placeholder: 'example@mail.com',
            type: 'email',
          }}
        />

        {/* DESCRIPTION INPUT */}
        <CustomInput
          title='Описание'
          register={register('description', { required: 'Поле обязательно' })}
          errors={errors.description}
          options={{
            placeholder: 'Что-то о заказе',
          }}
        />
      </div>

      <Button
        className={isValid && CustomButtonStyles.submit__button__enabled}
        onClick={handleSubmit(toggle)}
        disabled={!isValid}
        type='submit'
      >
        Создать
      </Button>
    </div>
  )
}
