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
    <div className="w-full px-4 py-1 bg-red-300 flex justify-between">
      <p className="text-red-700">issueid</p>

      <div className="flex gap-1 h-full items-center text-xl">
        <IoIosSettings />
        <button>
          <RxCross1 onClick={handleCloseIssue}/>
        </button>
      </div>
    </div>
  );
}

export default IssueNavbar;
