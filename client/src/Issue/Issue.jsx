import React, { useState } from "react";
import Avatar from "react-avatar";
import { Link, useSearchParams } from "react-router-dom";

function Issue({ e, userName }) {
  const [searchParams] = useSearchParams();
  async function handleStartEvent(e) {
    e.dataTransfer.setData("issue", e.target.getAttribute("issue_id"));
  }
  return (
    <Link to={`?q=${searchParams.get("q")}&selectedIssue=${e._id}`}>
      <div
        draggable="true"
        className="w-full bg-white h-fit p-2 shadow-gray-200 mb-1"
        onDragStart={handleStartEvent}
        issue_id = {e._id}
      >
        <p>{e.issueTitle}</p>
        <div className="flex justify-end">
          {userName === "untracked" ? null : (
            <Avatar
              name={userName}
              size="22"
              round={true}
              textMarginRatio={0.1}
            />
          )}
        </div>
      </div>
    </Link>
  );
}

export default Issue;
