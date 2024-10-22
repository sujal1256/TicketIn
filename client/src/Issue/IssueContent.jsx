import React, { useEffect, useState } from "react";
import IssueComments from "./IssueComments";

function IssueContent({ issue }) {
  const [descriptionBlock, setDescriptionBlock] = useState(false);
  const [description, setDescription] = useState(issue?.issue?.description);
  const [titleBox, setTitleBox] = useState(false);
  const [title, setTitle] = useState(issue?.issue?.issueTitle);

  useEffect(() => {
    if (issue?.issue?.issueTitle) {
      setTitle(issue.issue.issueTitle);
      setDescription(issue?.issue?.description);
    }
  }, [issue]);

  
  
  return (
    <div className="mt-2 w-full h-full overflow-y-auto">
      {/* issue title */}
      {!titleBox && (
        <p className="p-1 text-3xl" onClick={() => setTitleBox(true)}>{issue?.issue?.issueTitle}</p>
      )}
      {titleBox && (
        <div>
          <textarea
            type="text"
            value={title}
            className="resize-none w-full p-1 text-lg"
            onChange={(e)=>setTitle(e.target.value)}
          />
          {/* Title Buttons */}
          <div className="flex gap-1 justify-end">
            <button className="p-1 bg-blue-500 rounded-sm">Save</button>
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
            {issue?.description ? (
              <pre>{issue?.issue?.description}</pre>
            ) : (
              <p className="text-slate-300 text-sm">Add a description</p>
            )}
          </div>
        )}
        {descriptionBlock && (
          <div className="border border-black">
            <textarea
              className="resize-none w-full  outline-none p-1"
              onChange={(e) => setDescription(e?.target?.value)}
              value={description}
            >
              {issue?.issue?.description}
            </textarea>
            {/* Description buttons */}
            <div className="flex justify-end items-center p-1">
              <div className="flex gap-2">
                <button className="p-1 bg-blue-500 rounded-sm">Save</button>
                <button
                  className="p-1 bg-slate-200 rounded-sm"
                  onClick={() => {
                    setDescriptionBlock(false);
                    setDescription(issue?.issue?.description);
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
