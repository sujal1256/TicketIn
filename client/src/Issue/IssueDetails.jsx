import React, { useEffect, useState } from "react";
import IssueNavbar from "./IssueNavbar";
import IssueBody from "./IssueBody";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { storeIssue, removeIssue } from "../redux/issueSlice";

function IssueDetails() {
  const [searchParams] = useSearchParams();
  const selectedIssue = searchParams.get("selectedIssue");
  const projectId = searchParams.get("q");
  const [issue, setIssue] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    async function getIssueDetails() {
      const response = await axios.get("/api/v1/issue/get-issue-details", {
        params: {
          projectId,
          selectedIssue,
        },
      });
      setIssue(response?.data?.data?.issue);
      dispatch(storeIssue(response?.data?.data.issue));
    }

    async function getIssueComments() {
      const response = await axios.get(
        "/api/v1/issue/comment/get-all-comments",
        {
          params: { issueId: selectedIssue, projectId },
        }
      );

      console.log(response?.data?.data);
    }

    getIssueComments();
    getIssueDetails();
    return () => {
      dispatch(removeIssue());
    };
  }, []);

  return (
    <div className="absolute w-full h-full z-10 bg-gray-600 bg-opacity-50 flex justify-center items-center overflow-hidden">
      {/* issue details */}
      <div className="bg-white w-3/4 h-3/4 p-2 rounded-lg flex-col">
        <IssueNavbar />
        <IssueBody />
      </div>
    </div>
  );
}

export default IssueDetails;
