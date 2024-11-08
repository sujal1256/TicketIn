import React, { useEffect } from "react";
import MemberIssues from "./MemberIssues";
import { useSearchParams } from "react-router-dom";
import UntrackedIssues from "./UntrackedIssues";
import { useSelector } from "react-redux";

function BoardTasks() {
  const project = useSelector(state => state.project.project);

  return (
    <div className="overflow-hidden overflow-y-scroll h-[60vh] mt-4 border-2 border-gray-100 rounded-lg">
      {project?.projectDetails?.members?.map((e, index) => {
        return <MemberIssues member={e} key={index} />;
      })}

      <UntrackedIssues />
    </div>
  );
}

export default BoardTasks;
