import React from "react";
import ProjectNavigator from "./ProjectNavigator";
import BoardSearchBar from "./BoardSearchBar";
import { FaUser } from "react-icons/fa";
import { FaUserPlus } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import BoardTasks from "./BoardTasks";

function ProjectBoard({ details }) {
  return (
    <div className="border-l-2 p-10 px-2 bg-green-50 w-full">
      <ProjectNavigator details={details} />
      {/* Seach Bar and members */}
      <div className="flex bg-violet-400 w-full justify-between items-center px-2">
        <div className="flex items-center gap-5 bg-red-300  ">
          <BoardSearchBar />
          <div>
            {details?.projectDetails?.members.map((e, index) => {
              return (
                <FaUser
                  key={index}
                  className="bg-violet-500 p-1 w-8 h-8 rounded-full"
                />
              );
            })}
          </div>
          {/* Add User */}
          <button>
            <FaUserPlus className="bg-gray-500  p-1 w-8 h-8 rounded-full" />
          </button>
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
            <IoIosSettings className="p-1 w-9 h-9 rounded-full"/>
          </button>
        </div>
      </div>
      <BoardTasks details={details}/>
    </div>
  );
}

export default ProjectBoard;
