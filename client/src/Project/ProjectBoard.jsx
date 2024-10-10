import React from 'react'
import ProjectNavigator from './ProjectNavigator'

function ProjectBoard({details}) {
  return (
    <div className='border-l-2 p-10 bg-green-50 w-full'>
      <ProjectNavigator details={details}/>
      
    </div>
  )
}

export default ProjectBoard