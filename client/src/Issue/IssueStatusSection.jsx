import React from "react";
import Issue from "./Issue";
import { FaPlus } from "react-icons/fa";
import CreateIssue from "../Project/CreateIssue";
import { Link } from "react-router-dom";

function IssueStatusSection({
  allIssues,
  member,
  createSection,
  setCreateSection,
  issueStatus,
}) {
  return (
    <div className="bg-gray-100 w-full h-full">
      {allIssues
        ?.filter((e) => e.issueStatus == issueStatus)
        .map((e) => {
          return <Issue e={e} userName={member.userName} key={e._id} />;
        })}
      {!createSection && (
        <div onClick={() => setCreateSection(true)}>
          <div className="w-full m-h-16 p-2 shadow-gray-200 mb-1 hover:bg-gray-300 cursor-pointer flex items-center gap-1 rounded-lg">
            <FaPlus />
            Create Issue
          </div>
        </div>
      )}
      {createSection && (
        <CreateIssue
          member={member}
          issueStatus={issueStatus}
          setCreateSection={setCreateSection}
        />
      )}
    </div>
  );
}

export default IssueStatusSection;
