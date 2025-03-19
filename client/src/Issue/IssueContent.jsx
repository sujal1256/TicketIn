import React, { useEffect, useState } from "react";
import IssueComments from "./IssueComments";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeIssue } from "../redux/issueSlice";

function IssueContent() {
  const dispatch = useDispatch();
  const issue = useSelector((state) => state.issue.issue);

  const [descriptionBlock, setDescriptionBlock] = useState(false);
  const [description, setDescription] = useState(
    issue?.issue?.issueDescription
  );
  const [titleBox, setTitleBox] = useState(false);
  const [title, setTitle] = useState(issue?.issue?.issueTitle);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTitle(issue?.issue?.issueTitle);
    setDescription(issue?.issue?.issueDescription);
  }, [issue]);

  async function handleSaveData() {
    try {
      setIsLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/update-issue",
        {
          ...issue?.issue,
          issueTitle: title,
          issueDescription: description,
          issueId: issue?.issue?._id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );

      // Assuming response contains updated issue data
      const updatedIssue = response?.data?.data;

      // Update state with the returned data to reflect changes immediately
      setTitle(updatedIssue?.issue?.issueTitle || title);
      setDescription(updatedIssue?.issue?.issueDescription || description);

      setTitleBox(false);
      setDescriptionBlock(false);

      dispatch(storeIssue(response?.data?.data));
    } catch (error) {
      console.error("Error updating issue:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-3xl h-full overflow-y-auto pr-4 py-4">
      {/* Issue header */}
      <div className="flex items-center mb-2">
        <div className="flex-1">
          {!titleBox ? (
            <h1 
              className="text-2xl font-semibold text-gray-800 py-1 px-2 rounded-md hover:bg-gray-100 cursor-pointer" 
              onClick={() => setTitleBox(true)}
            >
              {issue?.issue?.issueTitle || "Untitled Issue"}
            </h1>
          ) : (
            <div className="border border-gray-300 rounded-md shadow-sm mb-2">
              <textarea
                type="text"
                value={title}
                className="resize-none w-full p-2 text-lg outline-none rounded-t-md"
                onChange={(e) => setTitle(e.target.value)}
                autoFocus
              />
              <div className="flex gap-2 justify-end p-2 bg-gray-50 rounded-b-md">
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setTitleBox(false);
                    setTitle(issue?.issue?.issueTitle);
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                  onClick={handleSaveData}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Issue metadata */}
      <div className="mb-6">
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center">
            <span className="font-medium mr-1">Status:</span> 
            <span className="bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
              {issue?.issue?.status || "Open"}
            </span>
          </div>
          <div>
            <span className="font-medium mr-1">Created:</span>
            {new Date(issue?.issue?.createdAt).toLocaleDateString() || "N/A"}
          </div>
        </div>
      </div>

      {/* Issue description */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-700">Description</h2>
        {!descriptionBlock ? (
          <div
            className="border border-gray-200 rounded-md p-3 hover:bg-gray-50 min-h-24 cursor-pointer"
            onClick={() => setDescriptionBlock(true)}
          >
            {issue?.issue?.issueDescription ? (
              <pre className="text-sm text-gray-600 whitespace-pre-wrap font-sans">
                {description}
              </pre>
            ) : (
              <p className="text-sm text-gray-400 italic">Add a description</p>
            )}
          </div>
        ) : (
          <div className="border border-gray-300 rounded-md shadow-sm">
            <textarea
              className="resize-none w-full outline-none p-3 text-sm min-h-32 rounded-t-md"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              autoFocus
            />
            <div className="flex justify-end items-center p-2 bg-gray-50 rounded-b-md">
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                  onClick={() => {
                    setDescriptionBlock(false);
                    setDescription(issue?.issue?.issueDescription);
                  }}
                  disabled={isLoading}
                >
                  Cancel
                </button>
                <button
                  className="px-3 py-1 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors flex items-center"
                  onClick={handleSaveData}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⟳</span>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Divider */}
      <hr className="my-6 border-gray-200" />

      {/* Issue comments */}
      <div>
        <h2 className="text-lg font-semibold mb-4 text-gray-700">Comments</h2>
        <IssueComments />
      </div>
    </div>
  );
}

export default IssueContent;