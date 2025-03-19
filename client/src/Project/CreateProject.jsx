import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateProject = () => {
  const navigate = useNavigate();

  const [projectName, setProjectName] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectOwner, setProjectOwner] = useState("");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    const projectData = {
      projectName,
      projectDescription,
      projectOwner,
      startDate,
      endDate,
    };

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/project/create-project",
        projectData,{
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );
      console.log("Project created successfully:", response.data);
      // Redirect to the main page or project detail page
      navigate("/");
    } catch (error) {
      console.error("Error creating project:", error);
      setErrorMessage("Failed to create project. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-2">
          Create your project
        </h2>
        <p className="text-center text-gray-600 mb-8">
          Effortlessly manage tickets, track progress, and achieve goals
        </p>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          {errorMessage && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Project Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Name
              </label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                placeholder="Enter project name"
              />
            </div>

            {/* Project Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Description
              </label>
              <textarea
                value={projectDescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                rows="4"
                placeholder="Describe your project"
              />
            </div>

            {/* Project Owner */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Project Owner
              </label>
              <input
                type="text"
                value={projectOwner}
                onChange={(e) => setProjectOwner(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                placeholder="Enter project owner's name"
              />
            </div>

            {/* Date Range */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  End Date (Optional)
                </label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-violet-500 focus:border-violet-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-violet-600 hover:bg-violet-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Creating..." : "Create Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProject;
