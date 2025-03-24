import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

function InviteUserToProject() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [existing, setExisting] = useState(false);
  const [status, setStatus] = useState("loading");
  const [password, setPassword] = useState("");
  const [projectName, setProjectName] = useState({});
  console.log(searchParams.get("q"));

  useEffect(() => {
    async function checkUserExist() {
      try {
        // person will not be logged in.
        const response = await axios.get(
          import.meta.env.VITE_BACKEND_URL + "/api/v1/user/check-existing-user",
          {
            params: { email: searchParams.get("q") },
          }
        );

        if (response.status >= 200 && response.status < 300) {
          setExisting(true);
          setStatus("existing");
        } else if (response.status >= 400 && response.status < 500) {
          setExisting(false);
          setStatus("new-user");
        } else {
          setStatus("error");
          toast.error("Error in the invitation");
        }
      } catch (error) {
        console.error(error);
        setStatus("error");
        toast.error("Error processing invitation");
      }
    }

    async function getProjectDetails() {
      const response = await axios.get(
        import.meta.env.VITE_BACKEND_URL +
          "/api/v1/project/get-project-details",
        {
          params: { projectId: searchParams.get("p") },
        }
      );
      if (response.status >= 200 && response.status < 300) {
        setProjectName(response?.data?.data.projectName);
      } else {
        setStatus("error");
        toast.error("Error getting project details");
      }
    }

    checkUserExist();
    getProjectDetails();
  }, [navigate, searchParams]);

  const handleJoinGroup = async () => {
    try {
      setStatus("processing");

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/join-project",
        { email: searchParams.get("q"), projectId: searchParams.get("p") }
      );

      if (response.status >= 200 && response.status < 300) {
        setStatus("success");
        toast.success("You have successfully joined the project");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setStatus("error");
        toast.error("Failed to join the project");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      toast.error("Error joining the project");
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    try {
      setStatus("processing");
      const token = searchParams.get("acessToken");

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/user/create-account",
        {
          acessToken: token,
          password: password,
        },
        {
          withCredentials: true,
        }
      );

      if (response.status >= 200 && response.status < 300) {
        setStatus("success");
        toast.success("Account created successfully");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        setStatus("new-user");
        toast.error("Failed to create account");
      }
    } catch (error) {
      console.error(error);
      setStatus("new-user");
      toast.error("Error creating account");
    }
  };

  // Custom CSS classes based on Ticketin theme
  const primaryColor = "#9333EA"; // The purple from the Ticketin logo
  const gradientBg = "bg-gradient-to-br from-purple-500 to-purple-700";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="flex justify-center mb-6">
          <div className="flex items-center">
            <div className="w-8 h-8 mr-2 bg-purple-600 rounded-md flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-2xl font-bold text-purple-600 tracking-tight">
              TICKETIN
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white shadow-xl rounded-xl overflow-hidden">
          {/* Card Header */}
          <div className={`${gradientBg} px-6 py-4 text-white`}>
            <h2 className="text-xl font-semibold">Project Invitation</h2>
            <p className="text-purple-100 text-sm">Join the team on Ticketin</p>
          </div>

          {/* Card Content */}
          <div className="p-6">
            {status === "loading" && (
              <div className="py-8 flex flex-col items-center">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Processing your invitation
                </h3>
                <p className="text-gray-500 text-center">
                  Please wait while we set things up for you...
                </p>
              </div>
            )}

            {status === "processing" && (
              <div className="py-8 flex flex-col items-center">
                <div className="relative w-16 h-16 mb-4">
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-200 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-full h-full border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Processing your request
                </h3>
                <p className="text-gray-500 text-center">
                  Please wait while we process your request...
                </p>
              </div>
            )}

            {status === "existing" && (
              <div className="py-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Welcome Back!
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  You're invited to join a new project
                </p>
                <button
                  onClick={handleJoinGroup}
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Join Group
                </button>
              </div>
            )}

            {status === "new-user" && (
              <div className="py-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Create Your Account
                </h3>
                <p className="text-gray-500 text-center mb-4">
                  You'll need a password to join this project
                </p>

                <form onSubmit={handleCreateAccount} className="w-full">
                  <div className="mb-4">
                    <label
                      className="block text-gray-700 text-sm font-medium mb-2"
                      htmlFor="password"
                    >
                      Create Password
                    </label>
                    <input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                  >
                    Create Account
                  </button>
                </form>
              </div>
            )}

            {status === "success" && (
              <div className="py-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Success!
                </h3>
                <p className="text-gray-500 text-center">
                  You'll be redirected to your dashboard momentarily...
                </p>
                <div className="flex items-center justify-center w-full mt-6">
                  <div className="bg-gray-200 h-1 w-full rounded-full overflow-hidden">
                    <div
                      className="bg-green-500 h-1 animate-pulse"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="py-8 flex flex-col items-center">
                <div className="w-16 h-16 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">
                  Invitation Error
                </h3>
                <p className="text-gray-500 text-center mb-6">
                  There was a problem with your invitation link
                </p>
                <button
                  onClick={() => navigate("/")}
                  className="w-full py-2 px-4 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                >
                  Return to Home
                </button>
              </div>
            )}
          </div>

          {/* Card Footer */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-500">
                © {new Date().getFullYear()} Ticketin
              </span>
              <div className="flex space-x-2">
                <a
                  href="#"
                  className="text-xs text-purple-600 hover:text-purple-800"
                >
                  Help
                </a>
                <span className="text-gray-300">|</span>
                <a
                  href="#"
                  className="text-xs text-purple-600 hover:text-purple-800"
                >
                  Privacy
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InviteUserToProject;
