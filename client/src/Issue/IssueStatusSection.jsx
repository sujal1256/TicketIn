import React from "react";
import Issue from "./Issue";
import { FaPlus } from "react-icons/fa";
import CreateIssue from "./CreateIssue";
import axios from "axios";
import { useDispatch } from "react-redux";
import {storeIssue} from '../redux/issueSlice'

function IssueStatusSection({
  allIssues,
  member,
  createSection,
  setCreateSection,
  issueStatus,
}) {
  const dispatch = useDispatch();
  async function handleDropEvent(e) {
    const issueId = e.dataTransfer.getData("issue");
    const issue = await allIssues.find((e) => e._id == issueId);

    const response = await axios.post(import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/update-issue", {
      ...issue,
      issueStatus: issueStatus,
      issueId,
    });
    console.log(response?.data?.data);

    dispatch(storeIssue(response?.data?.data));
  }

  return (
    <div
      className="p-1 bg-gray-100 w-full h-full flex-grow"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDropEvent}
    >
      {allIssues
        ?.filter((e) => e.issueStatus == issueStatus)
        .map((e) => {
          return <Issue e={e} userName={member.userName} key={e._id} issueId={e._id} />;
        })}

      {issueStatus != "Done" && !createSection && (
        <div onClick={() => setCreateSection(true)}>
          <div className="w-full m-h-16 p-2 shadow-gray-200 mb-1 hover:bg-gray-300 cursor-pointer flex items-center gap-1 rounded-lg">
            <FaPlus />
            Create Issue
          </div>
        </div>
      )}
      {issueStatus != "Done" && createSection && (
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
