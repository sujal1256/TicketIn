import React, { useState } from "react";
import { FaUser } from "react-icons/fa";
import NamePopUp from "./NamePopUp";

function UserComponent({ userName, userRole }) {
  const [namePopUp, setNamePopUp] = useState(false);
  return (
    <div className="relative">
      <FaUser className="bg-violet-500 p-1 w-8 h-8 rounded-full" onMouseEnter={()=>setNamePopUp(true)} onMouseLeave={()=>setNamePopUp(false)}/>

      {namePopUp && <NamePopUp username={userName} />}
    </div>
  );
}

export default UserComponent;
