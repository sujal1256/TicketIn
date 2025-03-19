import React, { useState } from "react";
import Avatar from "react-avatar";
import { Link, useSearchParams } from "react-router-dom";
import { FaBars } from "react-icons/fa6";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeIssue } from "../redux/issueSlice";

function Issue({ e, userName, issueId }) {
  const [searchParams] = useSearchParams();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  
  function handleStartEvent(event) {
    event.dataTransfer.setData("issue", event.target.getAttribute("issue_id"));
  }

  async function handleDelete(event) {
    event.preventDefault();
    
    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/delete-issue",
        {
          issueId,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      dispatch(storeIssue([]));
    } catch (error) {
      console.error("Error deleting the issue:", error);
    }
    
    setDropdownOpen(false);
  }

  return (
    <Link to={`?q=${searchParams.get("q")}&selectedIssue=${e._id}`}>
      <div
        draggable="true"
        className="w-full bg-white border border-gray-200 rounded-md shadow-sm p-3  relative flex flex-col justify-between hover:shadow-md transition-shadow duration-200"
        onDragStart={handleStartEvent}
        issue_id={e._id}
      >
        <div className="flex flex-col gap-2">
          <p className="text-gray-800 font-medium line-clamp-2">{e.issueTitle}</p>
          
          <div className="mt-2 flex justify-between items-center">
            {/* Issue metadata could go here */}
            <div className="flex items-center text-xs text-gray-500">
              {e.issueType && (
                <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{e.issueType}</span>
              )}
            </div>
            
            <div className="flex justify-end">
              {userName !== "untracked" && (
                <Avatar
                  name={userName}
                  size="24"
                  round={true}
                  textMarginRatio={0.15}
                  className="border border-gray-200"
                />
              )}
            </div>
          </div>
        </div>
        
        <div
          className="absolute right-2 top-2 hover:bg-gray-100 p-1.5 rounded-md cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDropdownOpen((prev) => !prev);
          }}
        >
          <FaBars className="text-gray-500" size={14} />
          
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-1 w-32 bg-white shadow-lg border border-gray-200 rounded-md z-10 py-1"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-50 text-sm"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}

export default Issue;