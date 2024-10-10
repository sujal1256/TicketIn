import React from "react";
import MemberTasks from "./MemberTasks";

function BoardTasks({ details }) {
  const styleString = "bg-gray-200 w-full text-center p-3";
  return (
    <div>
      {/* FIXME: Add number of tasks here */}
      <div className="flex w-full justify-around px-20 gap-1 mt-10">
        <p className={styleString}>To Do</p>
        <p className={styleString}>Doing</p>
        <p className={styleString}>Done</p>
      </div>
      {details.projectDetails?.members?.map((e, index) => {
        return <MemberTasks {...details} key={index}/>;
      })}
    </div>
  );
}

export default BoardTasks;
