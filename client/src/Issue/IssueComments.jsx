import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { storeComments } from "../redux/commentSlice";

function IssueComments() {
  const issue = useSelector((state) => state.issue.issue);
  const project = useSelector((state) => state.project.project);
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();

  const [searchParams] = useSearchParams();

  const [commentContent, setCommentContent] = useState("");

  const addComment = async () => {
    if (!commentContent) return;

    try {
      const newComment = {
        commentText: commentContent,
        issueId: issue?.issue?._id,
        projectId: searchParams.get("q"),
      };

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/comment/add-comment",
        newComment
      );
      console.log(response?.data?.data);

      dispatch(storeComments([...comments, response?.data?.data]));
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  return (
    <div className="bg-gray-50 pt-8 px-3 py-6 flex flex-col gap-4 overflow-hidden">
      <p className="text-lg font-semibold">Comments</p>
      <div className="border p-2 rounded-lg border-gray-300">
        <textarea
          className="text-sm w-full resize-none p-2 outline-none border rounded-md"
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Add a comment"
        ></textarea>
        <div className="flex gap-2 justify-end mt-2">
          <button
            className="p-2 bg-blue-500 text-white rounded-sm"
            onClick={addComment}
          >
            Save
          </button>
          <button
            className="p-2 bg-slate-200 rounded-sm"
            onClick={() => setCommentContent("")}
          >
            Cancel
          </button>
        </div>
      </div>

      <div>
        <p className="text-lg font-semibold">All Comments</p>
        <div className="flex flex-col gap-4 mt-2">
          {comments &&
            Array.from(comments)
              .reverse()
              ?.map((e) => <Comment comment={e} key={e._id} />)}
        </div>
      </div>
    </div>
  );
}

export default IssueComments;
