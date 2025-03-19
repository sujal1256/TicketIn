import React from "react";
import Issue from "./Issue";
import { FaPlus } from "react-icons/fa";
import CreateIssue from "./CreateIssue";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeIssue } from "../redux/issueSlice";

function IssueStatusSection({
  allIssues,
  member,
  createSection,
  setCreateSection,
  issueStatus,
}) {
  const dispatch = useDispatch();
  
  async function handleDropEvent(e) {
    try {
      e.preventDefault();
      const issueId = e.dataTransfer.getData("issue");
      const issue = allIssues.find((e) => e._id === issueId);
      
      if (!issue) return;
      
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/update-issue",
        {
          ...issue,
          issueStatus: issueStatus,
          issueId,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );
      
      if (response?.data?.data) {
        dispatch(storeIssue(response.data.data));
      }
    } catch (error) {
      console.error("Error updating issue status:", error);
    }
  }

  const filteredIssues = allIssues?.filter(e => e.issueStatus === issueStatus) || [];

  return (
    <div
      className="w-full min-h-32 flex flex-col rounded-md"
      onDragOver={(e) => {
        e.preventDefault();
      }}
      onDrop={handleDropEvent}
    >
      <div className="space-y-1 mb-2">
        {filteredIssues.map((issue) => (
          <Issue
            e={issue}
            userName={member.userName}
            key={issue._id}
            issueId={issue._id}
          />
        ))}
      </div>

      {issueStatus !== "Done" && (
        <div>
          {!createSection ? (
            <div 
              onClick={() => setCreateSection?.(true)}
              className="flex items-center gap-2 mt-2 p-2.5 text-gray-600 bg-white border border-gray-200 rounded-md hover:bg-gray-50 cursor-pointer transition-colors duration-150 shadow-sm"
            >
              <FaPlus className="text-gray-500" size={12} />
              <span className="text-sm font-medium">Create Issue</span>
            </div>
          ) : (
            <CreateIssue
              member={member}
              issueStatus={issueStatus}
              setCreateSection={setCreateSection}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default IssueStatusSection;