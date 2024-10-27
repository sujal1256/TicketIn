import React from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'

function ProjectNavigator() {
  const project = useSelector(state => state.project.project);

  return (
    <div className='flex text-sm gap-1'>
        <Link className="hover:underline" to={'/'}>Projects</Link>
        <p>/</p>
        <p>{project?.projectDetails?.projectName}</p>
    </div>
  )
}

export default ProjectNavigator