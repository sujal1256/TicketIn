import React, { useEffect, useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { FaUser } from "react-icons/fa";

import axios from "axios";
import Issue from "./Issue";

function MemberIssues({ projectDetails, projectOwner, member }) {
  // find Issues which where assignedTo is member userId of member
  const [searchParams] = useSearchParams();
  const [allIssues, setAllIssues] = useState([]);

  useEffect(() => {
    async function getIssues() {
      const response = await axios.get("/api/v1/issue/get-issues", {
        params: {
          projectId: searchParams.get("q"),
          memberId: member.userId,
        },
      });

      setAllIssues(response?.data?.data?.issues);
    }

    getIssues();
  }, []);
  console.log(allIssues);

  return (
    <div>
      <div className="flex gap-1 items-center mx-4">
        <FaUser className="size-4 " />
        <p>
          {member.userName}{" "}
          <span className="text-sx text-gray-400 ">
            ({allIssues.length} issues)
          </span>
        </p>
      </div>
      {/* issues */}
      <div className="flex w-full justify-around px-28 gap-4">
        {/* todo */}
        <div className="bg-gray-200 w-full h-fit">
          {allIssues
            .filter((e) => e.issueStatus == "Todo")
            .map((e) => {
              return (
                <Issue e={e} userName={member.userName}/>
              );
            })}
        </div>

        {/* doing */}
        <div className="bg-gray-200 w-full">asd</div>

        {/* done */}
        <div className="bg-gray-200 w-full ">asd\\</div>
      </div>
    </div>
  );
}

export default MemberIssues;
