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
  async function handleStartEvent(e) {
    e.dataTransfer.setData("issue", e.target.getAttribute("issue_id"));
  }

  async function handleDelete(e) {
    e.preventDefault();
    // Add your delete logic here

    try {
      const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/delete-issue", {
        issueId,
        withCredentials: true,
      });
      // nothing to do with storage only did to update the frontend
      dispatch(storeIssue([]));
      console.log(response);
    } catch (error) {
      console.log("Error in deleting the issue", error);
    }
    console.log(`Delete issue with ID: ${e._id}`);
    setDropdownOpen(false);
  }

  return (
    <Link to={`?q=${searchParams.get("q")}&selectedIssue=${e._id}`}>
      <div
        draggable="true"
        className="w-full bg-white h-fit min-h-[80px] p-2 shadow-gray-200 mb-1 relative flex flex-col justify-between"
        onDragStart={handleStartEvent}
        issue_id={e._id}
      >
        <p className="w-3/4">{e.issueTitle}</p>
        <div className="flex justify-end">
          {userName === "untracked" ? null : (
            <Avatar
              name={userName}
              size="22"
              round={true}
              textMarginRatio={0.1}
            />
          )}
        </div>
        <div
          className="absolute right-2 top-2 hover:bg-gray-200 p-1 rounded-lg"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setDropdownOpen((prev) => !prev);
          }}
        >
          <FaBars />
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-2 w-28 bg-white shadow-lg border border-gray-200 rounded-lg z-10"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={handleDelete}
                className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
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
