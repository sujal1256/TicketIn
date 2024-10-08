import React from 'react'

function MainpageCard({projectName, projectOwner}) {
  return (
    <div className='bg-white w-48 h-52 rounded-lg flex flex-col overflow-hidden p-2'>
        {/* image */}
        <div className='bg-gray-200 h-1/2 w-full'></div>
        <p>{projectName}</p>
        <p>{projectOwner}</p>
    </div>
  )
}

export default MainpageCard