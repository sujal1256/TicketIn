import React, { useEffect, useState } from "react";
import IssueNavbar from "./IssueNavbar";
import IssueBody from "./IssueBody";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function IssueDetails() {
  const [searchParams] = useSearchParams();
  const selectedIssue = searchParams.get("selectedIssue");
  const projectId = searchParams.get("q");
  const [issue, setIssue] = useState();

  useEffect(() => {
    async function getIssueDetails() {
      const response = await axios.get("/api/v1/issue/get-issue-details", {
        params: {
          projectId,
          selectedIssue,
        },
      });

      setIssue(response?.data?.data?.issue);
      sessionStorage.setItem("issueDetails", JSON.stringify(response?.data?.data?.issue));
    }

    getIssueDetails();
    return (()=>{
      sessionStorage.removeItem("issueDetails");
    })
  }, []);

  return (
    <div className="absolute w-full h-full z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center">
      {/* issue details */}
      <div className="bg-white w-3/4 h-3/4 p-2 rounded-lg flex-col">
        <IssueNavbar />
        <IssueBody  />
      </div>
    </div>
  );
}

export default IssueDetails;
