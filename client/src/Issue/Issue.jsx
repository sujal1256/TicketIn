import React, { useState } from "react";
import Avatar from "react-avatar";
import { Link, useSearchParams } from "react-router-dom";

function Issue({ e, userName }) {
  const [searchParams] = useSearchParams();
  return (
    <Link to={`?q=${searchParams.get("q")}&selectedIssue=${e._id}`}>
      <div className="w-full bg-white h-fit p-2 shadow-gray-200 mb-1">
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
