import React, { useEffect, useState } from "react";
import IssueComments from "./IssueComments";
import axios from "axios";

function IssueContent({ issue }) {
  const [descriptionBlock, setDescriptionBlock] = useState(false);
  const [description, setDescription] = useState(
    issue?.issue?.issueDescription
  );
  const [titleBox, setTitleBox] = useState(false);
  const [title, setTitle] = useState(issue?.issue?.issueTitle);

  useEffect(() => {
    setTitle(issue?.issue?.issueTitle);
    setDescription(issue?.issue?.issueDescription);
  }, [issue]);


  async function handleSaveData() {
    try {
      const response = await axios.post("/api/v1/issue/update-issue", {
        ...issue?.issue,
        issueTitle: title,
        issueDescription: description,
        issueId: issue?.issue?._id,
      });

      // Assuming response contains updated issue data
      const updatedIssue = response?.data?.data;

      // Update state with the returned data to reflect changes immediately
      setTitle(updatedIssue?.issueTitle || title);
      setDescription(updatedIssue?.issueDescription || description);

      setTitleBox(false);
      setDescriptionBlock(false);
    } catch (error) {
      console.error("Error updating issue:", error);
    }
  }

  return (
    <div className="mt-2 w-full h-full overflow-y-auto">
      {/* issue title */}
      {!titleBox && (
        <p className="p-1 text-3xl" onClick={() => setTitleBox(true)}>
          {issue?.issue?.issueTitle}
        </p>
      )}
      {titleBox && (
        <div>
          <textarea
            type="text"
            value={title}
            className="resize-none w-full p-1 text-lg"
            onChange={(e) => setTitle(e.target.value)}
          />
          {/* Title Buttons */}
          <div className="flex gap-1 justify-end">
            <button
              className="p-1 bg-blue-500 rounded-sm"
              onClick={handleSaveData}
            >
              Save
            </button>
            <button
              className="p-1 bg-slate-200 rounded-sm"
              onClick={() => {
                setTitleBox(false);
                setTitle(issue?.issue?.issueTitle);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      <div>
        <p className="text-lg font-semibold mt-4">Description</p>
        {!descriptionBlock && (
          <div
            className="hover:bg-slate-100 min-w-6 p-1"
            onClick={() => setDescriptionBlock(true)}
          >
            <pre className="text-sm text-slate-600">
              {issue?.issue?.issueDescription
                ? description
                : "Add a description"}
            </pre>
          </div>
        )}
        {descriptionBlock && (
          <div className="border border-black">
            <textarea
              className="resize-none w-full  outline-none p-1"
              onChange={(e) => setDescription(e?.target?.value)}
              value={description}
            >
              {issue?.issue?.issueDescription}
            </textarea>
            {/* Description buttons */}
            <div className="flex justify-end items-center p-1">
              <div className="flex gap-2">
                <button
                  className="p-1 bg-blue-500 rounded-sm"
                  onClick={handleSaveData}
                >
                  Save
                </button>
                <button
                  className="p-1 bg-slate-200 rounded-sm"
                  onClick={() => {
                    setDescriptionBlock(false);
                    setDescription(issue?.issue?.issueDescription);
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <IssueComments issue={issue} />
    </div>
  );
}

export default IssueContent;
