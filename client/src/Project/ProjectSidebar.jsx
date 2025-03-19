import React, { useState, useRef } from "react";
import { GoProject } from "react-icons/go";
import { useSelector } from "react-redux";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function ProjectSidebar() {
  const project = useSelector((state) => state.project.project);

  // State to handle sidebar width and collapsed state
  const [sidebarWidth, setSidebarWidth] = useState(300); // default width in pixels
  const [isCollapsed, setIsCollapsed] = useState(false);
  const previousWidth = useRef(300); // Store previous width before collapse
  const sidebarRef = useRef();


  const toggleCollapse = () => {
    if (isCollapsed) {
      setSidebarWidth(previousWidth.current);
    } else {
      // Collapse the sidebar
      previousWidth.current = sidebarWidth; 
      setSidebarWidth(60);
    }
    setIsCollapsed(!isCollapsed);
  };

  const baseItemStyle =
    "flex items-center gap-3 p-3 rounded-lg hover:bg-gray-100 transition cursor-pointer";

  return (
    <div
      ref={sidebarRef}
      className="flex flex-col gap-8 bg-white border-r border-gray-200 min-h-screen relative select-none transition-all duration-300"
      style={{ width: `${sidebarWidth}px` }}
    >

      <div
        className="absolute -right-4 top-4 bg-white shadow-md rounded-full p-1 cursor-pointer hover:bg-gray-100 border border-gray-200 z-10"
        onClick={toggleCollapse}
      >
        {isCollapsed ? <FaChevronRight size={14} className="text-purple-600" /> : <FaChevronLeft size={14} className="text-purple-600" />}
      </div>

      {/* Project Info */}
      <div className={`flex items-center gap-3 bg-gray-100 w-full p-3 rounded-lg ${isCollapsed ? "justify-center" : ""}`}>
        <GoProject className={`${isCollapsed ? "text-2xl" : "text-3xl"} text-purple-600`} />
        {!isCollapsed && (
          <div className="flex flex-col">
            <p className="font-semibold text-gray-800 text-lg">
              {project?.projectDetails?.projectName || "Project Name"}
            </p>
            <p className="text-gray-500 text-sm">Software Project</p>
          </div>
        )}
      </div>

      {/* Views Section */}
      <ul className="flex flex-col w-full gap-4">
        {!isCollapsed && (
          <li className="text-gray-700 text-xl font-semibold px-3">Views</li>
        )}
        <li>
          <div className={`${baseItemStyle} ${isCollapsed ? "justify-center" : ""}`}>
            <GoProject className="text-xl text-green-500" />
            {!isCollapsed && <p className="text-gray-800">Board</p>}
          </div>
        </li>
        <li>
          <div className={`${baseItemStyle} ${isCollapsed ? "justify-center" : ""}`}>
            <GoProject className="text-xl text-red-500" />
            {!isCollapsed && <p className="text-gray-800">Issues</p>}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default ProjectSidebar;