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
      }
    );

    if (response?.data?.data) {
      // Update the comment in the redux store
      const updatedComments = comments.map((e) =>
        e._id === comment?._id ? { ...e, commentText: editedText } : e
      );
      dispatch(storeComments(updatedComments));
      setIsEditing(false);
    }
  }

  return (
    <div className="flex gap-2 items-start border-b-2 pb-2">
      <Avatar
        name={comment?.createdByName}
        round={true}
        size="30"
        className="mt-1"
      />
      <div className="flex flex-col">
        <p className="text-md font-semibold">{comment?.createdByName}</p>
        {isEditing ? (
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="border rounded px-2 py-1 text-sm"
            />
            <button
              className="text-sm text-green-500 font-semibold hover:underline"
              onClick={handleEditComment}
            >
              Save
            </button>
            <button
              className="text-sm text-red-500 font-semibold hover:underline"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <p className="text-sm">{comment?.commentText}</p>
        )}
        <div className="flex gap-4 text-sm">
          <button
            className="text-sm text-blue-500 font-semibold hover:underline"
            onClick={handleDeleteComment}
          >
            Delete
          </button>
          <button
            className="text-sm text-blue-500 font-semibold hover:underline"
            onClick={() => setIsEditing(true)}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}

export default Comment;
