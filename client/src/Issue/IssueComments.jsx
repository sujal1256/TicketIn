import React, { useState } from "react";
import { useSelector } from "react-redux";

function IssueComments() {
  const issue = useSelector(state => state.issue.issue);

  const [commentContent, setCommentContent] = useState("");

  return (
    <div className="bg-red- mt-10 p-4 flex flex-col gap-2">
      <div>
        <p>Comments</p>
        <div className="text-sm text-slate-500">All Comments</div>
      </div>
      <div className="border p-1 border-black">
        <textarea
          className="text-sm w-full resize-none p-1 outline-none"
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment"
        ></textarea>
        <div className="flex gap-2 justify-end">
          <button className="p-1 bg-blue-500 rounded-sm">Save</button>
          <button
            className="p-1 bg-slate-200 rounded-sm"
            onClick={() => {
              setDescriptionBlock(false);
              setDescription("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default IssueComments;
