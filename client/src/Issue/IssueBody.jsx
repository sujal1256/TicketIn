import React from "react";
import IssueContent from "./IssueContent";
import IssueAssignedDetails from "./IssueAssignedDetails";

function IssueBody({issue}) {
  return (
    <div className="flex justify-center h-full">
      <IssueContent issue={issue}/>
      <IssueAssignedDetails issue={issue}/>
    </div>
  );
}

export default IssueBody;
