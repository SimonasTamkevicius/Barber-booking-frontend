import React from 'react'
import ChooseBarber from './ChooseBarber';
import OrderWindow from './OrderWindow';

const BookingPage = () => {
  return (
    <div>
        <div className='flex flex-row justify-between'>
            <ChooseBarber />
            <OrderWindow />
        </div>
    </div>
  )
}

export default BookingPage;