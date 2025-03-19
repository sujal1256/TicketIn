  import axios from "axios";
  import React, { useState } from "react";
  import { useSearchParams } from "react-router-dom";

  function CreateIssue({ issueStatus, member, setCreateSection }) {
    const [issueTitle, setIssueTitle] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchParams] = useSearchParams();

    async function handleIssueCreation(e) {
      e.preventDefault();
      
      if (!issueTitle.trim()) return;
      
      setIsSubmitting(true);
      
      try {
        await axios.post(
          import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/create-issue",
          {
            issueTitle,
            issueStatus,
            projectId: searchParams.get("q"),
            assignedTo: member?.userId,
          },
          {
            withCredentials: true,
            headers: {
              Authorization: "Bearer " + localStorage.getItem("accessToken"),
            },
          }
        );
        setCreateSection(false);
      } catch (error) {
        console.error("Error creating issue:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
    
    return (
      <form className="bg-white border border-gray-200 rounded-md shadow-sm p-3 mb-2">
        <input
          type="text"
          placeholder="Issue title"
          className="w-full mb-3 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          onChange={(e) => setIssueTitle(e.target.value)}
          value={issueTitle}
          autoFocus
        />
        
        <div className="flex justify-end gap-2">
          <button
            type="button"
            className="px-3 py-1.5 text-sm border border-gray-300 rounded bg-white text-gray-600 hover:bg-gray-50"
            onClick={() => setCreateSection(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-3 py-1.5 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
            onClick={handleIssueCreation}
            disabled={isSubmitting || !issueTitle.trim()}
          >
            {isSubmitting ? "Creating..." : "Create"}
          </button>
        </div>
      </form>
    );
  }

  export default CreateIssue;