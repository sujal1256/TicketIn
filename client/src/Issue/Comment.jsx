import axios from "axios";
import React, { useState } from "react";
import Avatar from "react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { storeComments } from "../redux/commentSlice";
import { useSearchParams } from "react-router-dom";

function Comment({ comment }) {
  const comments = useSelector((state) => state?.comments?.comments);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(comment?.commentText);

  async function handleDeleteComment() {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/comment/delete-comment",
      {
        commentId: comment?._id,
        issueId: searchParams.get("selectedIssue"),
        projectId: searchParams.get("q"),
        accessToken: localStorage.getItem("accessToken"),
      },
      {
        withCredentials: true,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
      }
    );

    dispatch(
      storeComments(
        Array.from(comments).filter((e) => e._id !== response?.data?.data?._id)
      )
    );
  }

  async function handleEditComment() {
    const response = await axios.post(
      import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/comment/update-comment",
      {
        commentId: comment?._id,
        issueId: searchParams.get("selectedIssue"),
        projectId: searchParams.get("q"),
        newCommentText: editedText,
        accessToken: localStorage.getItem("accessToken"),
      },
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("accessToken"),
        },
        withCredentials: true,
      }
    );

    if (response?.data?.data) {
      const updatedComments = comments.map((e) =>
        e._id === comment?._id ? { ...e, commentText: editedText } : e
      );
      dispatch(storeComments(updatedComments));
      setIsEditing(false);
    }
  }

  return (
    <div className="flex gap-3 items-start border-b border-gray-200 pb-4 pt-3">
      <div className="flex-shrink-0">
        <Avatar
          name={comment?.createdByName}
          round={true}
          size="32"
          color="#8A3FFC"
          textSizeRatio={2.5}
          className="shadow-sm"
        />
      </div>
      <div className="flex flex-col w-full">
        <div className="flex justify-between items-center mb-1">
          <p className="text-sm font-medium text-gray-800">{comment?.createdByName}</p>
          <div className="text-xs text-gray-500">
            {new Date(comment?.createdAt).toLocaleDateString()}
          </div>
        </div>
        
        {isEditing ? (
          <div className="flex flex-col gap-2 w-full">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 text-sm w-full focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            <div className="flex gap-2 justify-end">
              <button
                className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
              <button
                className="text-xs bg-purple-600 text-white px-3 py-1 rounded-md hover:bg-purple-700 transition-colors"
                onClick={handleEditComment}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <>
            <p className="text-sm text-gray-700 mb-2">{comment?.commentText}</p>
            <div className="flex gap-3">
              <button
                className="text-xs text-purple-600 hover:text-purple-800 transition-colors"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
              <button
                className="text-xs text-gray-500 hover:text-red-600 transition-colors"
                onClick={handleDeleteComment}
              >
                Delete
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Comment;