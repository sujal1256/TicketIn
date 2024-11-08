import React, { useState, useRef } from "react";
import { GoProject } from "react-icons/go";
import { useSelector } from "react-redux";

function ProjectSidebar() {
  const project = useSelector((state) => state.project.project);

  // State to handle sidebar width
  const [sidebarWidth, setSidebarWidth] = useState(300); // default width in pixels
  const sidebarRef = useRef();

  // Function to handle mouse dragging for resizing
  const handleMouseDown = (e) => {
    const startX = e.clientX;

    const handleMouseMove = (e) => {
      const newWidth = sidebarWidth + (e.clientX - startX);
      if (newWidth >= 200 && newWidth <= 600) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const baseItemStyle =
    "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer";

  return (
    <div
      ref={sidebarRef}
      className="flex flex-col gap-8 bg-white border-r border-gray-200 min-h-screen relative select-none"
      style={{ width: `${sidebarWidth}px` }}
    >
      {/* Resizable Handle */}
      <div
        className="absolute top-0 right-0 h-full w-2 cursor-col-resize bg-gray-300 hover:bg-gray-400"
        onMouseDown={handleMouseDown}
      ></div>

      {/* Project Info */}
      <div className="flex items-center gap-3 bg-gray-100 w-full p-3 rounded-lg">
        <GoProject className="text-3xl text-blue-600" />
        <div className="flex flex-col">
          <p className="font-semibold text-gray-800 text-2xl">
            {project?.projectDetails?.projectName || "Project Name"}
          </p>
          <p className="text-gray-500 text-sm">Software Project</p>
        </div>
      </div>

      {/* Views Section */}
      <ul className="flex flex-col w-full gap-4">
        <li className="text-gray-700 text-xl font-semibold px-3">Views</li>
        <li>
          <div className={baseItemStyle}>
            <GoProject className="text-xl text-green-500" />
            <p className="text-gray-800">Board</p>
          </div>
        </li>
        <li>
          <div className={baseItemStyle}>
            <GoProject className="text-xl text-red-500" />
            <p className="text-gray-800">Issues</p>
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProjectSidebar;
