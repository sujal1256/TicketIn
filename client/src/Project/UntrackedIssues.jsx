import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import IssueStatusSection from "../Issue/IssueStatusSection";

function UntrackedIssues() {
  const [untrackedIssues, setUntrackedIssues] = useState([]);
  const [searchParams] = useSearchParams();
  const [todoCreateSection, setTodoCreateSection] = useState(false);
  const [doingCreateSection, setDoingCreateSection] = useState(false);

  useEffect(() => {
    async function getIssues() {
      try {
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/get-untracked-issues",
          {
            params: {
              projectId: searchParams.get("q"),
            },
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );

        setUntrackedIssues(response?.data?.data?.issues || []);
      } catch (error) {
        console.error("Error fetching untracked issues:", error);
      }
    }

    getIssues();
  }, [todoCreateSection, doingCreateSection, searchParams]);

  if (!untrackedIssues || untrackedIssues.length === 0) return null;

  return (
    <div className="mb-6">
      {/* Untracked header */}
      <div className="flex gap-2 items-center py-3 px-4 bg-gray-50 rounded-lg shadow-sm mb-4">
        <div className="bg-gray-200 p-1.5 rounded-full">
          <FaUser className="text-gray-600" />
        </div>
        <div className="flex items-baseline">
          <p className="font-medium text-gray-700">Untracked</p>
          <span className="text-xs text-gray-500 ml-2">
            ({untrackedIssues?.length || 0} issues)
          </span>
        </div>
      </div>

      {/* Issues board */}
      <div className="flex gap-4">
        {/* Todo column */}
        <div className="flex-1 bg-gray-100 rounded">
          <div className="space-y-3">
            <IssueStatusSection
              allIssues={untrackedIssues}
              member={{ userName: "untracked" }}
              issueStatus={"Todo"}
              createSection={todoCreateSection}
              setCreateSection={setTodoCreateSection}
            />
          </div>
        </div>

        {/* Doing column */}
        <div className="flex-1 bg-gray-100 rounded">
          <div className="space-y-3">
            <IssueStatusSection
              allIssues={untrackedIssues}
              member={{ userName: "untracked" }}
              issueStatus={"Doing"}
              createSection={doingCreateSection}
              setCreateSection={setDoingCreateSection}
            />
          </div>
        </div>

        {/* Done column */}
        <div className="flex-1 bg-gray-100 rounded">
          <div className="space-y-3">
            <IssueStatusSection
              allIssues={untrackedIssues}
              member={{ userName: "untracked" }}
              issueStatus={"Done"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UntrackedIssues;