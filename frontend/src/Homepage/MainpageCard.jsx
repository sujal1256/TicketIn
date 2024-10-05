import React from 'react'

function MainpageCard() {
  return (
    <div className='bg-white w-48 h-52 rounded-lg flex flex-col overflow-hidden p-2'>
        {/* image */}
        <div className='bg-gray-200 h-1/2 w-full'></div>
        <p>Jira Project Name</p>
        <p>User id</p>
    </div>
  )
}

export default MainpageCard