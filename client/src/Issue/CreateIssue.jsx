import axios from "axios";
import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

function CreateIssue({ issueStatus, member, setCreateSection }) {
  const [issueTitle, setIssueTitle] = useState("");
  const [searchParams] = useSearchParams();

  async function handleIssueCreation(e) {
    e.preventDefault();
    try {
      const response = await axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/create-issue", {
          issueTitle,
          issueStatus,
          projectId: searchParams.get("q"),
          assignedTo: member?.userId,
          withCredentials: true,
        })
        .catch((e) => {
          console.log(e);
        });
      console.log("Issue created successfully");
    } catch (error) {
      console.log(error);

      console.log("Error in posting data", error.message);
    }

    setCreateSection(false);
  }
  return (
    <form className="flex flex-col gap-1 p-1">
      <input
        type="text"
        className="w-full h-10 outline-none"
        onChange={(e) => setIssueTitle(e.target.value)}
      />
      <div className="flex justify-end px-6 h-full">
        <button
          className="p-2 bg-blue-400 h-7 text-center flex items-center"
          onClick={(e) => handleIssueCreation(e)}
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default CreateIssue;
