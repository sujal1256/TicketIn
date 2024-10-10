import React from 'react'
import { Link } from 'react-router-dom'

function ProjectNavigator({details}) {
  return (
    <div className='flex text-sm gap-1'>
        <Link className="hover:underline" to={'/'}>Projects</Link>
        <p>/</p>
        <p>{details?.projectDetails?.projectName}</p>
    </div>
  )
}

export default ProjectNavigator