import React from "react";
import IssueContent from "./IssueContent";
import IssueAssignedDetails from "./IssueAssignedDetails";

function IssueBody() {
  return (
    <div className="flex justify-center h-full">
      <IssueContent />
      <IssueAssignedDetails/>
    </div>
  );
}

export default IssueBody;
