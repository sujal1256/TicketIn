import React from "react";
import IssueContent from "./IssueContent";
import IssueAssignedDetails from "./IssueAssignedDetails";

function IssueBody() {
  return (
    <div className="flex">
      <IssueContent />
      <IssueAssignedDetails />
    </div>
  );
}

export default IssueBody;
