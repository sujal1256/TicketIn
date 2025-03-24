import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useSearchParams } from "react-router-dom";

function AddUserMenu() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const [error, setError] = useState("");

  const handleAddUser = async function (e) {
    e.preventDefault();
    const projectID = searchParams.get("q");

    if (!projectID) {
      toast.error("Project ID is missing");
      return;
    }

    if (!email.trim()) {
      setError("Email is required");
      return;
    }

    setError("");
    setIsLoading(true);

    try {
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL +
          "/api/v1/project/add-user-to-project",
        {
          projectId: projectID.trim(),
          email: email.trim(),
        },
        {
          withCredentials: true,
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
        }
      );

      toast.success(
        response?.data?.data.message || "User invited successfully"
      );
      setEmail("");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Failed to invite user");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="absolute top-[120%] right-0 bg-white rounded-lg shadow-lg w-64 p-4 z-50 border border-gray-200">
      <ToastContainer />
      <h3 className="text-sm font-semibold text-gray-800 mb-3">
        Invite User to Project
      </h3>

      <form onSubmit={handleAddUser}>
        <div className="mb-3">
          <label
            htmlFor="userEmail"
            className="block text-xs text-gray-600 mb-1"
          >
            User Email
          </label>
          <input
            type="email"
            id="userEmail"
            placeholder="email@example.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
            className={`w-full px-3 py-2 text-sm bg-gray-50 border ${
              error ? "border-red-300" : "border-gray-300"
            } rounded-md focus:outline-none focus:ring-1 focus:ring-purple-500 focus:border-purple-500`}
          />
          {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 transition-colors duration-200"
          >
            {isLoading ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Inviting...
              </span>
            ) : (
              "Send Invitation"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddUserMenu;
