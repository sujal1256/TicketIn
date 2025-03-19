import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Comment from "./Comment";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import { storeComments } from "../redux/commentSlice";
import { FaRegComment, FaPaperPlane } from "react-icons/fa";

function IssueComments() {
  const issue = useSelector((state) => state.issue.issue);
  const comments = useSelector((state) => state.comments.comments);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [commentContent, setCommentContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addComment = async () => {
    if (!commentContent.trim()) return;

    try {
      setIsSubmitting(true);
      const newComment = {
        commentText: commentContent,
        issueId: issue?.issue?._id,
        projectId: searchParams.get("q"),
      };

      const response = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/v1/issue/comment/add-comment",
        newComment,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
          },
          withCredentials: true,
        }
      );

      dispatch(storeComments([...comments, response?.data?.data]));
      setCommentContent("");
    } catch (error) {
      console.error("Error adding comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      addComment();
    }
  };

  return (
    <div className="w-full">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <FaRegComment className="text-purple-500" />
          <h2 className="text-lg font-medium text-gray-700">Add Comment</h2>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm">
          <textarea
            className="text-sm w-full resize-none p-3 outline-none rounded-t-lg min-h-24 border-b border-gray-100"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your comment here... (Ctrl+Enter to submit)"
            disabled={isSubmitting}
          ></textarea>
          <div className="flex justify-between items-center px-3 py-2 bg-gray-50 rounded-b-lg">
            <div className="text-xs text-gray-500">
              Use Ctrl+Enter to submit
            </div>
            <div className="flex gap-2">
              <button
                className="px-3 py-1 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors text-sm"
                onClick={() => setCommentContent("")}
                disabled={isSubmitting || !commentContent.trim()}
              >
                Cancel
              </button>
              <button
                className={`px-3 py-1 flex items-center gap-1 rounded-md text-sm transition-colors ${
                  commentContent.trim() 
                    ? "bg-purple-600 text-white hover:bg-purple-700" 
                    : "bg-purple-300 text-white cursor-not-allowed"
                }`}
                onClick={addComment}
                disabled={isSubmitting || !commentContent.trim()}
              >
                {isSubmitting ? (
                  <>
                    <span className="animate-spin">⟳</span>
                    <span>Posting...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane size={12} />
                    <span>Post</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comments list */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium text-gray-700">
            Comments ({comments?.length || 0})
          </h2>
          {comments?.length > 0 && (
            <div className="text-xs text-gray-500">
              Newest first
            </div>
          )}
        </div>
        
        {comments?.length > 0 ? (
          <div className="space-y-4">
            {Array.from(comments)
              .reverse()
              ?.map((comment) => (
                <Comment comment={comment} key={comment._id} />
              ))}
          </div>
        ) : (
          <div className="text-center py-8 px-4 bg-gray-50 rounded-lg border border-gray-200">
            <p className="text-gray-500 text-sm">
              No comments yet. Be the first to add one!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default IssueComments;