import React from 'react'

/* STYLES */
import FooterStyles from './Footer.module.scss'

/* ICONS */
import LockIcon from '../../assets/lock-logo.svg'
import McardIcon from '../../assets/mcard-logo.svg'
import MirIcon from '../../assets/mir-logo.svg'
import VisaIcon from '../../assets/visa-logo.svg'

export default function Footer({ order }) {
  return (
    <div className={FooterStyles.footer__container}>
      <section className={FooterStyles.footer__items}>
        <div className={FooterStyles.footer__logos}>
          {/* visa icon */}
          <figure className={FooterStyles.visa__icon}>
            <img src={VisaIcon} alt='visa__icon' />
          </figure>
          {/* mastercard icon  */}
          <figure className={FooterStyles.mcard__icon}>
            <img src={McardIcon} alt='mcard__icon' />
          </figure>
          {/* mir icon */}
          <figure className={FooterStyles.mir__icon}>
            <img src={MirIcon} alt='mir__icon' />
          </figure>
        </div>

        <div className={FooterStyles.footer__secure}>
          <figure className={FooterStyles.lock__icon}>
            <img src={LockIcon} alt='lock__icon' />
          </figure>
          <span className={FooterStyles.secure__info}>Данные банковской карты будут переданы в зашифрованном виде</span>
        </div>

        {/* order - динамический номер заказа */}
        {/* <div className={FooterStyles.footer__order}>Заказ №{order ?? 123456}</div> */}
      </section>
    </div>
  )
}
