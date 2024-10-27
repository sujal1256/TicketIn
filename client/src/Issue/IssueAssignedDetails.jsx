import React, { useEffect, useState } from "react";
import Avatar from "react-avatar";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {storeIssue} from '../redux/issueSlice'

function IssueAssignedDetails() {
  const issue = useSelector(state => state.issue.issue);
  const project = useSelector(state => state.project.project);
  const dispatch = useDispatch();

  const [dropdownOpen, setDropdownOpen] = useState(false); // Dropdown state
  const [searchParams] = useSearchParams();


  async function handleIssueStatusChange(e) {
    const response = await axios.post("/api/v1/issue/update-issue", {
      ...issue.issue,
      issueStatus: e.target.value,
      issueId: searchParams.get("selectedIssue"),
    });

    dispatch(storeIssue(response?.data?.data));
    
  }

  async function handleAssigneeChange(newAssignee) {
    const response = await axios.post("/api/v1/issue/update-issue", {
      ...issue.issue,
      assignedTo: newAssignee.userId,
      issueId: searchParams.get("selectedIssue"),
    });
    console.log(response?.data?.data);
    
    setDropdownOpen(false); // Close dropdown
    dispatch(storeIssue(response?.data?.data));


  }

  return (
    <div className="w-full">
      <div className="flex justify-start p-2 mt-2">
        <select value={issue?.issue?.issueStatus} onChange={handleIssueStatusChange}>
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <table className="mt-3 w-full border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="text-left p-3 bg-gray-100 font-medium text-sm">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-full flex items-center justify-between px-3 py-2 border-b">
            <td className="text-sm font-medium text-gray-700">Assignee</td>
            <td className="flex items-center gap-2 relative">
              {/* Assignee display that toggles dropdown */}
              <div onClick={() => setDropdownOpen(!dropdownOpen)} className="cursor-pointer flex items-center gap-2">
                <Avatar name={issue?.assignedToUser?.username} size="33" round={true} />
                <p className="w-fit text-sm text-gray-700">
                  {issue?.assignedToUser?.username}
                </p>
              </div>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  {project?.projectDetails?.members.map((member) => (
                    <div
                      key={member.userId}
                      onClick={() => handleAssigneeChange(member)}
                      className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      <Avatar name={member.userName} size="25" round={true} />
                      <p className="text-sm text-gray-700">{member.userName}</p>
                    </div>
                  ))}
                </div>
              )}
            </td>
          </tr>

          <tr className="w-full flex items-center justify-between px-3 py-2 border-b">
            <td className="text-sm font-medium text-gray-700">Reporter</td>
            <td className="flex items-center gap-2">
              <Avatar name={issue?.createdByUser?.username} size="33" round={true} />
              <p className="w-fit text-sm text-gray-700">
                {issue?.createdByUser?.username}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <p>
          Created At{" "}
          <span className="underline">
            {new Date(issue?.issue?.createdAt).toDateString()}
          </span>
        </p>
        <p>
          Updated At{" "}
          <span className="underline">
            {new Date(issue?.issue?.createdAt).toTimeString().split(" ")[0]}
          </span>
        </p>
      </div>
    </div>
  );
}

export default IssueAssignedDetails;
