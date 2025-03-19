import React from "react";
import { RxCross1 } from "react-icons/rx";
import { IoIosSettings } from "react-icons/io";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

function IssueNavbar() {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();

  function handleCloseIssue() {
    navigate("/project?q=" + searchParams.get("q"));
  }

  return (
    <div className="w-full px-4 py-3 bg-white border-b flex justify-between items-center shadow-sm">
      <div className="flex items-center gap-2">
        <div className="h-6 w-6 flex items-center justify-center rounded-md bg-purple-600 text-white text-xs font-medium">
          ID
        </div>
        <p className="text-gray-700 font-medium">Issue Details</p>
      </div>

      <div className="flex gap-3 items-center">
        <button className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors">
          <IoIosSettings className="text-xl" />
        </button>
        <button 
          onClick={handleCloseIssue}
          className="text-gray-500 hover:text-gray-700 p-1 rounded hover:bg-gray-100 transition-colors"
        >
          <RxCross1 className="text-xl" />
        </button>
      </div>
    </div>
  );
}

export default IssueNavbar;