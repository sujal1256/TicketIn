import React from 'react'
import { RiMenuFill } from "react-icons/ri";
import { IoIosNotifications } from "react-icons/io";
import { IoIosHelpCircle } from "react-icons/io";
import { IoIosSettings } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";




import SearchBar from './SearchBar';


function Navbar() {
  return (
    <div className='bg-red-200 grid grid-cols-[1fr_5fr] p-2 px-5'>
        {/* left */}
        <div className='flex justify-center items-center gap-2'>
            <RiMenuFill />
            <p className='text-2xl'>Logo</p>
        </div>
        <div className='bg-green-300 flex justify-between items-center'>
            {/* left icons */}
            <div className='flex gap-3 items-center justify-between'>
                <p>Home</p>
                <p>Projects</p>
                {/* <p>Goals</p>
                <p>Teams</p> */}
            </div>
            <div className='flex text-2xl gap-2 items-center'>
                <SearchBar />
                <IoIosNotifications />
                <IoIosHelpCircle />
                <IoIosSettings />
                <FaUserCircle />
                    
            </div>
        </div>

        {/* right */}
        <div></div>
    </div>
  )
}

export default Navbar