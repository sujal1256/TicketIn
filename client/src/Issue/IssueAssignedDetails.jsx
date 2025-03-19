import React, { useState } from "react";
import Avatar from "react-avatar";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { storeIssue } from "../redux/issueSlice";
import { FaTrashAlt, FaRegClock, FaUserEdit, FaChevronDown, FaTimes } from "react-icons/fa";

function IssueAssignedDetails() {
  const issue = useSelector((state) => state.issue.issue);
  const project = useSelector((state) => state.project.project);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function handleIssueStatusChange(e) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/update-issue",
        {
          ...issue.issue,
          issueStatus: e.target.value,
          issueId: searchParams.get("selectedIssue"),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );

      dispatch(storeIssue(response?.data?.data));
    } catch (error) {
      console.error("Error updating issue status:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleAssigneeChange(newAssignee) {
    try {
      setIsLoading(true);
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/update-issue",
        {
          ...issue.issue,
          assignedTo: newAssignee.userId,
          issueId: searchParams.get("selectedIssue"),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );

      dispatch(storeIssue(response?.data?.data));
    } catch (error) {
      console.error("Error updating assignee:", error);
    } finally {
      setDropdownOpen(false);
      setIsLoading(false);
    }
  }

  async function handleDelete() {
    try {
      setIsLoading(true);
      await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/delete-issue",
        {
          issueId: searchParams.get("selectedIssue"),
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );
      
      dispatch(storeIssue([]));
      navigate("/project?q=" + searchParams.get("q"));
    } catch (error) {
      console.error("Error deleting issue:", error?.message);
    } finally {
      setIsLoading(false);
      setShowDeleteModal(false);
    }
  }

  // Helper function to format date nicely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    });
  };

  // Helper function to format time nicely
  const formatTime = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="w-72 border-l border-gray-200 p-4 h-full bg-gray-50">
      <h2 className="font-medium text-lg mb-4 text-gray-700">Issue Details</h2>
      
      {/* Status and Actions */}
      <div className="flex flex-col gap-3 mb-6">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-600">Status:</label>
          <select
            value={issue?.issue?.issueStatus}
            onChange={handleIssueStatusChange}
            className="bg-white border text-gray-700 py-1 px-2 rounded-md text-sm flex-1 outline-none focus:ring-1 focus:ring-purple-400 focus:border-purple-400"
            disabled={isLoading}
          >
            <option value="Todo">Todo</option>
            <option value="Doing">Doing</option>
            <option value="Done">Done</option>
          </select>
        </div>
        
        <button
          className="flex items-center justify-center gap-2 text-red-500 hover:text-white hover:bg-red-500 transition-colors duration-200 px-3 py-2 rounded-md border border-red-200 hover:border-red-500 w-full"
          onClick={() => setShowDeleteModal(true)}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="animate-spin">⟳</span>
          ) : (
            <FaTrashAlt size={14} />
          )}
          <span className="text-sm">Delete Issue</span>
        </button>
      </div>
      
      {/* People */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-600 mb-3">People</h3>
        <div className="bg-white rounded-md shadow-sm border border-gray-200">
          {/* Assignee */}
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Assignee</span>
              <div className="relative">
                <div
                  onClick={() => !isLoading && setDropdownOpen(!dropdownOpen)}
                  className={`cursor-pointer flex items-center gap-2 ${isLoading ? "opacity-50" : "hover:bg-gray-50"}`}
                >
                  <Avatar
                    name={issue?.assignedToUser?.username}
                    size="28"
                    round={true}
                    textSizeRatio={2}
                  />
                  <span className="text-sm text-gray-700">
                    {issue?.assignedToUser?.username || "Unassigned"}
                  </span>
                  <FaChevronDown size={10} className="text-gray-400" />
                </div>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    {project?.projectDetails?.members.map((member) => (
                      <div
                        key={member.userId}
                        onClick={() => handleAssigneeChange(member)}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50"
                      >
                        <Avatar 
                          name={member.userName} 
                          size="24" 
                          round={true} 
                          textSizeRatio={2} 
                        />
                        <span className="text-sm text-gray-700">{member.userName}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Reporter */}
          <div className="p-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-500">Reporter</span>
              <div className="flex items-center gap-2">
                <Avatar
                  name={issue?.createdByUser?.username}
                  size="28"
                  round={true}
                  textSizeRatio={2}
                />
                <span className="text-sm text-gray-700">
                  {issue?.createdByUser?.username || "Unknown"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Dates */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-600 mb-3">Dates</h3>
        <div className="bg-white rounded-md shadow-sm border border-gray-200">
          <div className="p-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <FaRegClock className="text-gray-400" size={14} />
              <div>
                <span className="text-xs font-medium text-gray-500 block">Created</span>
                <span className="text-sm text-gray-700">
                  {formatDate(issue?.issue?.createdAt)}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  at {formatTime(issue?.issue?.createdAt)}
                </span>
              </div>
            </div>
          </div>
          
          <div className="p-3">
            <div className="flex items-center gap-2">
              <FaUserEdit className="text-gray-400" size={14} />
              <div>
                <span className="text-xs font-medium text-gray-500 block">Updated</span>
                <span className="text-sm text-gray-700">
                  {formatDate(issue?.issue?.updatedAt)}
                </span>
                <span className="text-xs text-gray-500 ml-1">
                  at {formatTime(issue?.issue?.updatedAt)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-96 max-w-full animate-fade-in">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-800">Delete Issue</h3>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-500 hover:text-gray-700 transition-colors"
              >
                <FaTimes />
              </button>
            </div>
            
            <div className="mb-6">
              <p className="text-gray-600 mb-2">Are you sure you want to delete this issue?</p>
              <p className="text-gray-500 text-sm">This action cannot be undone.</p>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 text-sm text-white bg-red-500 rounded-md hover:bg-red-600 transition-colors flex items-center gap-2"
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="animate-spin">⟳</span>
                ) : (
                  <FaTrashAlt size={12} />
                )}
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default IssueAssignedDetails;