import React from 'react'
import { FaHome } from "react-icons/fa";
import { PiTrafficSignal } from "react-icons/pi";



function Sidebar() {
  return (
    <div className='flex flex-col bg-slate-100 w-1/6 h-screen gap-8'>
        <div className='flex items-center gap-2'>
            <FaHome />
            Home
        </div>
        <div className='flex items-center gap-2'>
            <PiTrafficSignal />
            Status Updates
        </div>
    </div>
  )
}

export default Sidebar