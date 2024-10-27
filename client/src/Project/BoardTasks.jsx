import React, { useEffect } from "react";
import MemberIssues from "./MemberIssues";
import { useSearchParams } from "react-router-dom";
import UntrackedIssues from "./UntrackedIssues";

function BoardTasks() {
  const details = JSON.parse(sessionStorage.getItem("projectDetails"));

  return (
    <div className="overflow-hidden overflow-y-scroll h-[60vh] mt-4">
      {details.projectDetails?.members?.map((e, index) => {
        return <MemberIssues member={e} key={index} />;
      })}

      <UntrackedIssues />
    </div>
  );
}

export default BoardTasks;
