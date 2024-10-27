import React from "react";
import { GoProject } from "react-icons/go";

function ProjectSidebar() {
  const details = JSON.parse(sessionStorage.getItem("projectDetails"));

  const styleString =
    "bg-red-100 w-full flex items-center gap-2 p-2 rounded-lg flex overflow-hidden";
  return (
    <div className="border-r-2 p-10 pr-1 pl-5 flex flex-col items-start justify-start gap-7">
      <div className={styleString}>
        <GoProject className="text-xl bg-black" />
        <div className="flex flex-col shrink-0 ">
          <p>{details?.projectDetails?.projectName}</p>
          <p className="text-gray-500 text-sm">Software Project</p>
        </div>
      </div>

      {/* Views */}
      <ul className="flex flex-col w-full gap-3">
        <li className="text-gray-600 pl-1 text-lg">Views</li>
        <li className="text-gray-600 ">
          <div className={styleString}>
            <GoProject />
            <p>Board</p>
          </div>
        </li>
        <li className="text-gray-600 ">
          <div className={styleString}>
            <GoProject />
            <p>Issues</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProjectSidebar;
