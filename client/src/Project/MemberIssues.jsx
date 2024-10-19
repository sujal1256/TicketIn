import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";

import axios from "axios";
import Issue from "./Issue";
import Avatar from "react-avatar";
import IssueStatusSection from "./IssueStatusSection";

function MemberIssues({ member }) {
  // find Issues which where assignedTo is member userId of member
  const [searchParams] = useSearchParams();
  const [allIssues, setAllIssues] = useState([]);

  const [todoCreateSection, setTodoCreateSection] = useState(false);
  const [doingCreateSection, setDoingCreateSection] = useState(false);

  useEffect(() => {
    async function getIssues() {
      const response = await axios.get("/api/v1/issue/get-issues", {
        params: {
          projectId: searchParams.get("q"),
          memberId: member?.userId,
        },
      });

      setAllIssues(response?.data?.data?.issues);
    }

    getIssues();
  }, [todoCreateSection, doingCreateSection]);

  if (allIssues.length == 0) return;

  return (
    <div>
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
      <div className="flex w-full justify-around px-28 gap-4 ">
        {/* todo */}
        <IssueStatusSection
          allIssues={allIssues}
          member={member}
          issueStatus={"Todo"}
          createSection={todoCreateSection}
          setCreateSection={setTodoCreateSection}
        />

        {/* doing */}
        <IssueStatusSection
          allIssues={allIssues}
          member={member}
          issueStatus={"Doing"}
          createSection={doingCreateSection}
          setCreateSection={setDoingCreateSection}
        />

        {/* done */}
        <div className="bg-gray-100 w-full h-fit">
          {allIssues
            .filter((e) => e.issueStatus == "Done")
            .map((e) => {
              return <Issue e={e} userName={member.userName} key={e._id} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default MemberIssues;
