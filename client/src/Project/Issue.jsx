import React, { useState } from "react";
import { FaUser } from "react-icons/fa";

function Issue({ e, userName }) {
  return (
    <div className="w-full bg-white m-h-16 h-fit p-2 shadow-gray-200 rounded-lg mb-1">
      <p>{e.issueTitle}</p>
      <div className="flex justify-end">
        <FaUser className="hover:bg-gray-200 p-1 size-6 rounded-full" />
      </div>
    </div>
  );
}

export default Issue;
