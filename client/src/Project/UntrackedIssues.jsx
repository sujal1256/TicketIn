import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import IssueStatusSection from "../Issue/IssueStatusSection";
import Issue from "../Issue/Issue";

function UntrackedIssues() {
  const [untrackedIssues, setUntrackedIssues] = useState();
  const [searchParams] = useSearchParams();
  const [todoCreateSection, setTodoCreateSection] = useState();
  const [doingCreateSection, setDoingCreateSection] = useState();

  useEffect(() => {
    async function getIssues() {
      const response = await axios.get("/api/v1/issue/get-untracked-issues", {
        params: {
          projectId: searchParams.get("q"),
        },
      });

      setUntrackedIssues(response?.data?.data?.issues);
    }

    getIssues();
  }, [todoCreateSection, doingCreateSection]);

  console.log(untrackedIssues);
  

  return (
    <div>
      <div className="flex gap-1 items-center mx-4 my-5">
        <FaUser />
        <p>
          Untracked
          <span className="text-sx text-gray-400 ">
            ({untrackedIssues?.length} issues)
          </span>
        </p>
      </div>
      {/* issues */}
      <div className="flex w-full justify-around px-28 gap-4 ">
        {/* todo */}
        <IssueStatusSection
          allIssues={untrackedIssues}
          member={{ userName: "untracked" }}
          issueStatus={"Todo"}
          createSection={todoCreateSection}
          setCreateSection={setTodoCreateSection}
        />

        {/* doing */}
        <IssueStatusSection
          allIssues={untrackedIssues}
          member={{ userName: "untracked" }}
          issueStatus={"Doing"}
          createSection={doingCreateSection}
          setCreateSection={setDoingCreateSection}
        />

        {/* done */}
        <IssueStatusSection
          allIssues={untrackedIssues}
          member={{ userName: "untracked" }}
          issueStatus={"Done"}
        />
      </div>
    </div>
  );
}

export default UntrackedIssues;
