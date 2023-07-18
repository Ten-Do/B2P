/* REACT DEFAULT SETTINGS */
import React, { useEffect, useRef, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

/* STYLES */
import './styles/App.scss'

/* COMPONENTS */
import Payment from './components/Payment/Payment'
import Unipay from './components/Unipay/Unipay'

const App = () => {
  const [notify, setNotify] = useState({})
  const modal = useRef(null)
  const onClose = () => {
    modal.current.className = 'modal hide'
  }
  const showModal = (flag) => {
    setNotify(flag ? { emoji: '🎉', text: 'Оплата прошла успешно' } : { emoji: '😿', text: 'Не удалось оплатить' })
    setTimeout(() => (modal.current.className = 'modal'), 0)
  }
  const onKeydown = ({ key }) => {
    if (key === 'Escape') {
      onClose()
    }
  }
  useEffect(() => {
    document.addEventListener('keydown', onKeydown)
    return () => document.removeEventListener('keydown', onKeydown)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [currentPage, setCurrentPage] = useState('unipay')
  const formMethods = useForm({
    mode: 'onTouched',
    defaultValues: {
      amount: localStorage.getItem('amount') || '',
      email: localStorage.getItem('email') || '',
      description: localStorage.getItem('description') || '',
      number: '',
      expire: '',
      code: '',
    },
  })

  const handleTogglePage = () => {
    setCurrentPage((currentPage) => (currentPage === 'unipay' ? 'payment' : 'unipay'))
  }

  return (
    <>
      <FormProvider {...formMethods}>
        <div className='main__container'>
          <form autoComplete='off' onSubmit={formMethods.handleSubmit((data) => console.log(data))}>
            {currentPage === 'unipay' ? (
              <Unipay toggle={handleTogglePage} />
            ) : (
              <Payment toggle={handleTogglePage} showNotify={showModal} />
            )}
          </form>
        </div>
      </FormProvider>
      <div className='modal hide' ref={modal} onClick={onClose}>
        <div className='modal-dialog' onClick={(e) => e.stopPropagation()}>
          <div className='modal-header'>
            <span className='modal-close' onClick={onClose}>
              &times;
            </span>
          </div>
          <div className='modal-body'>
            <div className='modal-content'>
              <div className='center'>
                <div className='notify center'>
                  <span className='notify__emoji'>{notify.emoji}</span>
                  <p className='notify__message'>{notify.text}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
