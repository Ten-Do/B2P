//import cn from 'classnames'
import React from 'react'
import { useFormContext } from 'react-hook-form'

/* STYLES */
import UnipayStyles from './Unipay.module.scss'

import AmountValueIcon from '../../UI/AmountValueIcon/AmountValueIcon'
import Button from '../../UI/Button/CustomButton'
import CustomButtonStyles from '../../UI/Button/CustomButton.module.scss'

/* COMPONENTS */
import CustomInput from '../../UI/Input/CustomInput'
import { formatAmount } from '../../utils/formFields/formatAmount'

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
            onChange: formatAmount,
          })}
          errors={errors.amount}
          options={{
            placeholder: '0',
          }}
        />

        {/* CURRENCY ICON */}
        <figure className={UnipayStyles.amount__icon}>
          <AmountValueIcon fillColor={errors.amount ? 'red' : 'rgb(155, 155, 155)'} />
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

      <Button className={isValid && CustomButtonStyles.submit__button__enabled} onClick={toggle} disabled={!isValid}>
        Создать
      </Button>
    </div>
  )
}
