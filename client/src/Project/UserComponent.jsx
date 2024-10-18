import React, { useState } from "react";
// import { FaUser } from "react-icons/fa";
import NamePopUp from "./NamePopUp";
import Avatar from "react-avatar";

function UserComponent({ userName, userRole }) {
  const [namePopUp, setNamePopUp] = useState(false);
  return (
    <div className="relative">
      <Avatar name={userName} size="33" className="rounded-full" onMouseEnter={()=>setNamePopUp(true)} onMouseLeave={()=>setNamePopUp(false)}/>

      {namePopUp && <NamePopUp username={userName} />}
    </div>
  );
}

export default UserComponent;
