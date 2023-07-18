/* eslint-disable import/order */
import cn from 'classnames'
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { Tooltip } from 'react-tooltip'

/* STYLES */
import PaymentStyles from './Payment.module.scss'

/* ICONS */
import CodeInfo from '../../assets/ic_ques.svg'

/* UTILS */
import { formatCardNumber, cardNumField_onKeyPress } from '../../utils/formFields/formatCardNum'
import { formatCVC } from '../../utils/formFields/formatCVC'
import { formatDate } from '../../utils/formFields/formatDate'
import { isValidCardNum } from '../../utils/formFields/isValidCardNum'
import { isValidDate } from '../../utils/formFields/isValidDate'

/* COMPONENTS */
import Button from '../../UI/Button/CustomButton'
import CustomButtonStyles from '../../UI/Button/CustomButton.module.scss'
import CustomInput from '../../UI/Input/CustomInput'
import Footer from '../Footer/Footer'
import fetchCardInfo from '../../utils/payment/fetchCardInfo'
import { _formatAmount } from '../../utils/formFields/formatAmount'
import { Service } from '../../servises/service'

let SuaiPayButton = cn([`${CustomButtonStyles.submit__button}`, `${CustomButtonStyles.SuaiPay__button}`])
const getFee = (amount, fee, minFee) => {
  amount = +amount.replaceAll(',', '') * 100
  if (fee * amount < minFee) return minFee * 0.01
  return (fee * amount) / 10000
}
export default function Payment({ toggle, showNotify }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useFormContext()

  const [card, setCard] = useState(null) // {}
  const fee = getFee(watch('amount'), card?.fee, card?.min_fee) || 0

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <section className={PaymentStyles.form__container}>
        <span className={PaymentStyles.previous__arrow} onClick={toggle}>
          &#10094;
        </span>
        <div
          style={
            card?.colors
              ? { boxShadow: `0 0 18px ${card?.colors?.main}`, transition: 'all 0.5s ease' }
              : { transition: 'all 0.5s ease' }
          }
          className={PaymentStyles.card__form}
        >
          {/* Bank logo */}
          {card?.logo && (
            <figure className={PaymentStyles.bank__logo}>
              <img src={process.env.PUBLIC_URL + '/banks/icons/' + card.logo + '.svg'} alt='bank__logo' />
            </figure>
          )}
          <div className={PaymentStyles.card__attribites}>
            <div className={PaymentStyles.number__attribute}>
              {/* CARD NUMBER INPUT */}
              <CustomInput
                title='Номер карты'
                register={register('number', {
                  required: 'Поле обязательно',
                  validate: isValidCardNum,
                  onChange: (e) => {
                    fetchCardInfo(e.target.value).then((cardInfo) => {
                      setCard(cardInfo)
                    })
                    formatCardNumber(e)
                  },
                })}
                errors={errors.number}
                options={{
                  placeholder: '1234 5678 1234 5678',
                  onKeyDown: cardNumField_onKeyPress,
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
                    onChange: formatDate,
                  })}
                  errors={errors.expire}
                  options={{
                    placeholder: 'ММ / ГГ',
                  }}
                />
              </div>

              <div>
                {/* CVV CODE INPUT */}
                <CustomInput
                  title={'CVV / CVC'}
                  register={register('code', {
                    required: 'Поле обязательно',
                    pattern: { value: /^(\d{3})$/g, message: 'код должен быть трехзначным' },
                    onChange: formatCVC,
                  })}
                  errors={errors.code}
                  options={{
                    mode: 'secret',
                    placeholder: '123',
                  }}
                />
              </div>

              {/* CVV CODE INFO SIGN */}
              <figure id='anchor-element-id' className={PaymentStyles.cvv__info}>
                <img src={CodeInfo} alt='code info'></img>
              </figure>
              <Tooltip
                anchorSelect='#anchor-element-id'
                className={PaymentStyles.tooltip}
                content='Три цифры с обратной стороны карты'
              />
            </div>
          </div>
        </div>

        {/* CHECKBOX INPUT */}
        <div className={PaymentStyles.savecard__block}>
          <CustomInput title='Сохранить карту для следующих операций' options={{ type: 'checkbox' }} />
        </div>

        <div className={PaymentStyles.payment__fee}>
          Комиссия{fee ? `: ${_formatAmount(String(fee))}₽` : ' зависит от платежной системы'}
        </div>

        <div className={PaymentStyles.payment__agreement}>
          <div className={PaymentStyles.buttons__container}>
            <button
              className={isValid ? CustomButtonStyles.submit__button__enabled : ''}
              disabled={!isValid}
              onClick={handleSubmit((data) => {
                Service.makeOperation(data)
                  .then((...params) => {
                    toggle()
                    showNotify(true)
                    reset()
                    localStorage.clear()
                  })
                  .catch(() => showNotify(false))
              })}
            >
              Оплатить {_formatAmount(String(+watch('amount').replaceAll(',', '') + fee))}₽
            </button>

            <Button className={SuaiPayButton} type='button'>
              SUAI PAY
            </Button>
          </div>
          <div className={PaymentStyles.agreement__policy}>
            Нажимая на кнопку «Перевести», вы соглашаетесь с{' '}
            <b className={PaymentStyles.bold__span}>условиями оферты</b>
          </div>
        </div>
      </section>

      {/* guap pay component button (config - true ? render : not) */}
      {/* если поля валидны, функцией разбиваем всё по красоте и submit'им*/}
      {/* фейковая функция комиссии - когда pan заполнен, отправляем запрос: сигнатура, amount, paysystem/card bin */}

      <Footer />
    </div>
  )
}
