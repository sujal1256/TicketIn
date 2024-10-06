import React from 'react'
import MainpageCard from './MainpageCard'

function Mainpage() {

  return (
    <div className='bg-blue-200 w-screen p-12'>
        <p className='text-4xl'>Hello, Sujal Malhotra</p>
        {/* your apps */}
        <div className='mt-8 flex gap-8  '>
            <MainpageCard />
            <MainpageCard />
            <MainpageCard />
        </div>
    </div>
  )
}

export default Mainpage