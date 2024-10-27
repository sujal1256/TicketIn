import React, { useState } from "react";
import ProjectNavigator from "./ProjectNavigator";
import BoardSearchBar from "./BoardSearchBar";
import { FaUserPlus } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import BoardTasks from "./BoardTasks";
import AddUserMenu from "./AddUserMenu.jsx";
import UserComponent from "./UserComponent";
import { useSearchParams } from "react-router-dom";
import IssueDetails from "../Issue/IssueDetails.jsx";
import { useSelector } from "react-redux";

function ProjectBoard() {
  const project = useSelector(state => state.project.project);
  const [addUserMenu, setAddUserMenu] = useState(false);
  const [searchParams] = useSearchParams();
  const selectedIssue = searchParams.get("selectedIssue");

  return (
    <div className="border-l-2 p-10 px-2 bg-green-50 w-full relative">
      {selectedIssue && <IssueDetails />}
      <ProjectNavigator />
      {/* Seach Bar and members */}
      <div className="flex bg-violet-400 w-full justify-between items-center px-2">
        <div className="flex items-center gap-5 bg-red-300  ">
          <BoardSearchBar />
          <div className="flex">
            {project?.projectDetails?.members.map((e, index) => {
              return <UserComponent key={index} {...e} />;
            })}
          </div>

          {/* Add User */}
          <div className="relative">
            <button>
              <FaUserPlus
                className="bg-gray-500  p-1 w-8 h-8 rounded-full"
                onClick={() => setAddUserMenu(!addUserMenu)}
              />
            </button>
            {addUserMenu && <AddUserMenu />}
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div>
            <div className="flex gap-2   items-center">
              <p className="text-xs">GROUP BY</p>
              <select name="groupBy" className="">
                <option value="none">None</option>
                <option value="assignee">Assignee</option>
              </select>
            </div>
          </div>
          <button>
            <IoIosSettings className="p-1 w-9 h-9 rounded-full" />
          </button>
        </div>
      </div>
      <div className="flex w-full justify-around px-28 gap-3 mt-10">
        <p className="bg-gray-200 w-full text-center p-3">To Do</p>
        <p className="bg-gray-200 w-full text-center p-3">Doing</p>
        <p className="bg-gray-200 w-full text-center p-3">Done</p>
      </div>
      <BoardTasks />
    </div>
  );
}

export default ProjectBoard;
