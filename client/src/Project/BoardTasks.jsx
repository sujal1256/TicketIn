import React from "react";
import MemberIssues from "./MemberIssues";

function BoardTasks({ details }) {
  const styleString = "bg-gray-200 w-full text-center p-3";
  const sectionStyleString = "flex w-full justify-around px-28 gap-3 mt-10";
  return (
    <div>
      {/* FIXME: Add number of tasks here */}
      <div className={sectionStyleString}>
        <p className={styleString}>To Do</p>
        <p className={styleString}>Doing</p>
        <p className={styleString}>Done</p>
      </div>
      {details.projectDetails?.members?.map((e, index) => {
        return <MemberIssues member={e} {...details} key={index}/>;
      })}
    </div>
  );
}

export default BoardTasks;
