import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import Counter from '../../../components/Counter'
import { faSquareMinus } from '@fortawesome/free-solid-svg-icons'

const EditFood = ({item}) => {
    
    const [value, setValue]=useState(item.amount)

  return (
    <div className='flex justify-between mt-1'>
        <div className='flex  items-center w-2/3'>
            <FontAwesomeIcon icon={faSquareMinus} className='text-white cursor-pointer hover:text-healthyDarkOrange2  text-sm mr-1 ' />
            <p className='text-white text-xs font-bold '>{item.name}</p>
        </div>
        <Counter value={value} setValue={setValue} colour='bg-healthyOrange' />
    </div>
  )
}

export default EditFood