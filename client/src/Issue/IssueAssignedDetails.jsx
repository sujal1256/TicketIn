import React from "react";
import Avatar from "react-avatar";

function IssueAssignedDetails({ issue }) {
  console.log(issue);

  return (
    <div className="w-full">
      <div className="flex justify-start p-2 mt-2">
        <select value={issue?.issue?.issueStatus}>
          <option value="Todo">Todo</option>
          <option value="Doing">Doing</option>
          <option value="Done">Done</option>
        </select>
      </div>

      <table className="mt-3 w-full border border-gray-300 rounded-lg">
        <thead>
          <tr>
            <th className="text-left p-3 bg-gray-100 font-medium text-sm">
              Details
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="w-full flex items-center justify-between px-3 py-2 border-b">
            <td className="text-sm font-medium text-gray-700">Assignee</td>
            <td className="flex items-center gap-2">
              <Avatar
                name={issue?.assignedToUser?.username}
                size="33"
                round={true}
              />
              <p className="w-fit text-sm text-gray-700">
                {issue?.assignedToUser?.username}
              </p>
            </td>
          </tr>

          <tr className="w-full flex items-center justify-between px-3 py-2 border-b">
            <td className="text-sm font-medium text-gray-700">Reporter</td>
            <td className="flex items-center gap-2">
              <Avatar
                name={issue?.assignedToUser?.username}
                size="33"
                round={true}
              />
              <p className="w-fit text-sm text-gray-700">
                {issue?.assignedToUser?.username}
              </p>
            </td>
          </tr>
        </tbody>
      </table>

      <div>
        <p>
          Created At{" "}
          <span className="underline">{new Date(issue?.issue?.createdAt).toDateString()}</span>
        </p>
        <p>
          Updated At{" "}
          <span className="underline">{new Date(issue?.issue?.createdAt).toTimeString().split(' ')[0]}</span>
        </p>
      </div>
    </div>
  );
}

export default IssueAssignedDetails;
