import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import Issue from "../Issue/Issue";
import Avatar from "react-avatar";
import IssueStatusSection from "../Issue/IssueStatusSection";
import { useSelector } from "react-redux";

function MemberIssues({ member }) {
  const [searchParams] = useSearchParams();
  const [allIssues, setAllIssues] = useState([]);
  const issue = useSelector((state) => state.issue.issue);

  const [todoCreateSection, setTodoCreateSection] = useState(false);
  const [doingCreateSection, setDoingCreateSection] = useState(false);

  useEffect(() => {
    async function getIssues() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/get-issues",
          {
            params: {
              projectId: searchParams.get("q"),
              memberId: member?.userId,
            },
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );

        setAllIssues(response?.data?.data?.issues);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    }

    getIssues();
  }, [todoCreateSection, doingCreateSection, issue, member?.userId, searchParams]);

  if (allIssues.length === 0) return null;

  return (
    <div className="mb-6">
      {/* Member header */}
      <div className="flex gap-2 items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm mb-4">
        <Avatar
          name={member.userName}
          size="28"
          round={true}
          textMarginRatio={0.25}
          className="border border-gray-200"
        />
        <div className="flex items-baseline">
          <p className="font-medium text-gray-700">{member.userName}</p>
          <span className="text-xs text-gray-500 ml-2">
            ({allIssues.length} issues)
          </span>
        </div>
      </div>

      {/* Issues board */}
      <div className="flex gap-4">
        {/* Todo column */}
        <div className="flex-1">
          <div className="bg-gray-100 border border-gray-200 w-full text-center py-2 rounded-lg shadow-sm mb-4">
            <p className="text-gray-800 font-semibold">To Do</p>
          </div>
          <div className="space-y-3">
            <IssueStatusSection
              allIssues={allIssues}
              member={member}
              issueStatus={"Todo"}
              createSection={todoCreateSection}
              setCreateSection={setTodoCreateSection}
            />
          </div>
        </div>

        {/* Doing column */}
        <div className="flex-1">
          <div className="bg-gray-100 border border-gray-200 w-full text-center py-2 rounded-lg shadow-sm mb-4">
            <p className="text-gray-800 font-semibold">Doing</p>
          </div>
          <div className="space-y-3">
            <IssueStatusSection
              allIssues={allIssues}
              member={member}
              issueStatus={"Doing"}
              createSection={doingCreateSection}
              setCreateSection={setDoingCreateSection}
            />
          </div>
        </div>

        {/* Done column */}
        <div className="flex-1">
          <div className="bg-gray-100 border border-gray-200 w-full text-center py-2 rounded-lg shadow-sm mb-4">
            <p className="text-gray-800 font-semibold">Done</p>
          </div>
          <div className="space-y-3">
            <IssueStatusSection
              allIssues={allIssues}
              member={member}
              issueStatus={"Done"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemberIssues;