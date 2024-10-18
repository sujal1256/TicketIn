import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FaPlus, FaUser } from "react-icons/fa";

import axios from "axios";
import Issue from "./Issue";
import CreateIssue from "./CreateIssue";
import Avatar from "react-avatar";

function MemberIssues({ projectDetails, projectOwner, member }) {
  // find Issues which where assignedTo is member userId of member
  const [searchParams] = useSearchParams();
  const [allIssues, setAllIssues] = useState([]);
  
  const [todoCreateSection, setTodoCreateSection] = useState(false);
  const [doingCreateSection, setDoingCreateSection] = useState(false);
  const [doneCreateSection, setDoneCreateSection] = useState(false);

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

  if(allIssues.length == 0) return;
  return (
    <div >
      <div className="flex gap-1 items-center mx-4 my-5">
        <Avatar name={member.userName} size="22" round = {true} textMarginRatio={0.25}/>
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
        <div className="bg-gray-100 w-full h-full">
          {allIssues
            .filter((e) => e.issueStatus == "Todo")
            .map((e) => {
              return <Issue e={e} userName={member.userName} key={e._id} />;
            })}
          {!todoCreateSection && (
            <div onClick={() => setTodoCreateSection(true)}>
              <div className="w-full m-h-16 p-2 shadow-gray-200 mb-1 hover:bg-gray-300 cursor-pointer flex items-center gap-1 rounded-lg">
                <FaPlus />
                Create Issue
              </div>
            </div>
          )}
          {todoCreateSection && (
            <CreateIssue member={member} issueStatus={"Todo"} setCreateSection={setTodoCreateSection}/>
          )}
        </div>

        {/* doing */}
        <div className="bg-gray-100 w-full h-full">
          {allIssues
            .filter((e) => e.issueStatus == "Doing")
            .map((e) => {
              return <Issue e={e} userName={member.userName} key={e._id} />;
            })}
          {!doingCreateSection && (
            <div onClick={() => setDoingCreateSection(true)}>
              <div className="w-full m-h-16 p-2 shadow-gray-200 mb-1 hover:bg-gray-300 cursor-pointer flex items-center gap-1 rounded-lg">
                <FaPlus />
                Create Issue
              </div>
            </div>
          )}
          {doingCreateSection && (
            <CreateIssue member={member} issueStatus={"Doing"} setCreateSection={setDoingCreateSection}/>
          )}
        </div>

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
