import React, { useEffect, useState } from "react";
import IssueNavbar from "./IssueNavbar";
import IssueBody from "./IssueBody";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeIssue, removeIssue } from "../redux/issueSlice";
import { removeComments, storeComments } from "../redux/commentSlice";

function IssueDetails() {
  const [searchParams] = useSearchParams();
  const selectedIssue = searchParams.get("selectedIssue");
  const projectId = searchParams.get("q");
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const project = useSelector((state) => state.project.project);
  const comments = useSelector((state) => state.comments.comments);
  const issue = useSelector((state) => state.issue.issue);

  useEffect(() => {
    async function fetchIssueData() {
      setIsLoading(true);
      setError(null);

      try {
        // Fetch issue details
        const issueResponse = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/issue/get-issue-details`,
          {
            params: {
              projectId,
              selectedIssue,
            },
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        dispatch(storeIssue(issueResponse?.data?.data.issue));

        // Fetch issue comments
        const commentsResponse = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/api/v1/issue/comment/get-all-comments`,
          {
            params: { issueId: selectedIssue, projectId },
            withCredentials: true,
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        dispatch(storeComments(commentsResponse?.data?.data));
      } catch (error) {
        console.error("Error fetching issue data:", error);
        setError("Failed to load issue details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchIssueData();

    return () => {
      dispatch(removeIssue());
      dispatch(removeComments());
    };
  }, [dispatch, projectId, selectedIssue]);

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-75 flex justify-center items-center backdrop-blur-sm overflow-hidden p-6">
      <div className="bg-white w-4/5 h-4/5 rounded-lg shadow-xl flex flex-col overflow-hidden transition-all duration-300 ease-in-out">
        {isLoading ? (
          <div className="flex-1 flex flex-col justify-center items-center p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600 mb-4"></div>
            <p className="text-gray-500">Loading issue details...</p>
          </div>
        ) : error ? (
          <div className="flex-1 flex flex-col justify-center items-center p-8">
            <div className="text-red-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <p className="text-gray-700 font-medium">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <>
            <div className="border-b border-gray-200 px-6 py-4">
              <IssueNavbar />
            </div>
            <div className="flex-1 overflow-auto p-6">
              <IssueBody />
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => window.history.back()}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors mr-2"
              >
                Close
              </button>
              {issue && !issue.assignee && (
                <button className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  Assign to me
                </button>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default IssueDetails;
