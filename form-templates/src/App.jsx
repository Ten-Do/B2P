/* REACT DEFAULT SETTINGS */
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'

/* STYLES */
import './styles/App.scss'

/* COMPONENTS */
import Payment from './components/Payment/Payment'
import Unipay from './components/Unipay/Unipay'

const App = () => {
  const [currentPage, setCurrentPage] = useState('unipay')
  const formMethods = useForm({
    mode: 'onTouched',
    defaultValues: {
      amount: '',
      email: '',
      description: '',
      number: '',
      expire: '',
      code: '',
    },
  })

  const handleTogglePage = () => {
    setCurrentPage((currentPage) => (currentPage === 'unipay' ? 'payment' : 'unipay'))
  }

  return (
    <FormProvider {...formMethods}>
      <div className='main__container'>
        <form autoComplete='off' onSubmit={formMethods.handleSubmit((data) => console.log(data))}>
          {currentPage === 'unipay' ? <Unipay toggle={handleTogglePage} /> : <Payment toggle={handleTogglePage} />}
        </form>
      </div>
    </FormProvider>
  )
}

export default App
