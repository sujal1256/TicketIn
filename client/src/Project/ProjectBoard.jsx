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
  const project = useSelector((state) => state.project.project);
  const [addUserMenu, setAddUserMenu] = useState(false);
  const [searchParams] = useSearchParams();
  const selectedIssue = searchParams.get("selectedIssue");

  return (
    <div className="border-l border-gray-200 bg-white w-full relative p-6 flex-shrink-0">
      {selectedIssue && <IssueDetails />}

      <ProjectNavigator />

      <div className="flex justify-between items-center mt-4">
        <div className="flex items-center gap-6">
          <BoardSearchBar />

          <div className="flex items-center gap-3">
            {project?.projectDetails?.members?.map((member, index) => (
              <UserComponent key={index} {...member} />
            ))}
          </div>

          <div className="relative">
            <button 
              onClick={() => setAddUserMenu(!addUserMenu)}
              className="focus:outline-none"
            >
              <FaUserPlus className="text-gray-600 hover:text-blue-600 p-2 w-10 h-10 rounded-full transition-colors duration-200 cursor-pointer" />
            </button>
            {addUserMenu && (
              <div className="absolute right-0 mt-2 z-20">
                <AddUserMenu />
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm text-gray-700">Group By:</p>
            <select
              name="groupBy"
              className="bg-white border border-gray-300 rounded-md p-1 text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="none">None</option>
              <option value="assignee">Assignee</option>
            </select>
          </div>
          <button className="focus:outline-none">
            <IoIosSettings className="text-gray-600 hover:text-blue-600 p-2 w-10 h-10 rounded-full transition-colors duration-200 cursor-pointer" />
          </button>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex gap-4 mt-8">
        <div className="flex-1">
          <div className="bg-gray-100 border border-gray-200 w-full text-center py-2 rounded-lg shadow-sm">
            <p className="text-gray-800 font-semibold">To Do</p>
          </div>
          <div className="mt-4 space-y-3">
            {/* Task cards will be rendered by BoardTasks */}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-gray-100 border border-gray-200 w-full text-center py-2 rounded-lg shadow-sm">
            <p className="text-gray-800 font-semibold">Doing</p>
          </div>
          <div className="mt-4 space-y-3">
            {/* Task cards will be rendered by BoardTasks */}
          </div>
        </div>
        
        <div className="flex-1">
          <div className="bg-gray-100 border border-gray-200 w-full text-center py-2 rounded-lg shadow-sm">
            <p className="text-gray-800 font-semibold">Done</p>
          </div>
          <div className="mt-4 space-y-3">
            {/* Task cards will be rendered by BoardTasks */}
          </div>
        </div>
      </div>

      {/* Tasks Board */}
      <BoardTasks />
    </div>
  );
}

export default ProjectBoard;