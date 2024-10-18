import React, { useState } from "react";
import Avatar from "react-avatar";
import { FaUser } from "react-icons/fa";

function Issue({ e, userName }) {
  return (
    <div className="w-full bg-white h-fit p-2 shadow-gray-200 mb-1">
      <p>{e.issueTitle}</p>
      <div className="flex justify-end">
      <Avatar name={userName} size="22" round = {true} textMarginRatio={0.1}/>
      </div>
    </div>
  );
}

export default Issue;
