import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosSettings } from "react-icons/io";

function IssueNavbar() {
  return (
    <div className="w-full px-4 py-1 bg-red-300 flex justify-between">
      <p className="text-red-700">issueid</p>

      <div className="flex gap-1 h-full items-center text-xl">
        <IoIosSettings />
        <RxCross1 />
      </div>
    </div>
  );
}

export default IssueNavbar;
