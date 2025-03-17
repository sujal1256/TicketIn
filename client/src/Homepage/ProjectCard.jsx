import React from "react";
import { CiCalendarDate } from "react-icons/ci";
import { Link } from "react-router-dom";

function ProjectCard({ project }) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200">
      <Link to={`/project?q=${project._id}`}>
        <div className="p-6">
          <div className="flex items-center mb-4">
            <div
              className={`w-3 h-3 rounded-full mr-2 ${
                project.status === "completed"
                  ? "bg-green-500"
                  : project.status === "in-progress"
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            ></div>
            <span className="text-sm text-gray-500 capitalize">
              {project.status || "Active"}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {project.name}
          </h3>
          <p className="text-gray-600 mb-4 line-clamp-2">
            {project.description || "No description available"}
          </p>
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <CiCalendarDate className="h-6 w-6 text-gray-500 mr-1" />
              <span className="text-xs text-gray-500">
                {new Date(project.createdAt).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default ProjectCard;
