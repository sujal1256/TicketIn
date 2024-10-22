import React from 'react'

function IssueAssignedDetails({issue}) {
  return (
    <div className='w-full'>
      <div className='flex justify-start p-2'>
        <select value={issue?.issue?.issueStatus}>
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>
    </div>
  )
}

export default IssueAssignedDetails