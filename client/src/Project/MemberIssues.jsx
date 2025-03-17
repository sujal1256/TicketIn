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
      const response = await axios.get(import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/get-issues", {
        params: {
          projectId: searchParams.get("q"),
          memberId: member?.userId,
        },
      });

      setAllIssues(response?.data?.data?.issues);
    }

    getIssues();
  }, [todoCreateSection, doingCreateSection, issue]);

  if (allIssues.length === 0) return null;

  return (
    <div className="mb-12">
      <div className="flex gap-1 items-center mx-4 my-5">
        <Avatar
          name={member.userName}
          size="22"
          round={true}
          textMarginRatio={0.25}
        />
        <p>
          {member.userName}
          <span className="text-sx text-gray-400 ">
            ({allIssues.length} issues)
          </span>
        </p>
      </div>
      {/* issues */}
      <div className="flex w-full justify-around px-28 gap-4 h-screen">
        {/* Todo */}
        <div className="flex-1 flex flex-col h-full">
          <IssueStatusSection
            allIssues={allIssues}
            member={member}
            issueStatus={"Todo"}
            createSection={todoCreateSection}
            setCreateSection={setTodoCreateSection}
          />
        </div>

        {/* Doing */}
        <div className="flex-1 flex flex-col h-full">
          <IssueStatusSection
            allIssues={allIssues}
            member={member}
            issueStatus={"Doing"}
            createSection={doingCreateSection}
            setCreateSection={setDoingCreateSection}
          />
        </div>

        {/* Done */}
        <div className="flex-1 flex flex-col h-full">
          <IssueStatusSection
            allIssues={allIssues}
            member={member}
            issueStatus={"Done"}
          />
        </div>
      </div>
    </div>
  );
}

export default MemberIssues;
