import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// Fetch all comments for a post
export function getPostCommentsApi(postId) {
  return axios.get(`${API_HOST}/api/user/posts/comments/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  });
}

// Create a new comment
export function createPostCommentApi(postId, commentData) {
  return axios.post(
    `${API_HOST}/api/user/posts/comments`,
    {
      postId,
      ...commentData,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    },
  );
}

// Update a comment
export function updatePostCommentApi(commentId, commentData) {
  return axios.put(
    `${API_HOST}/api/user/posts/comments/${commentId}`,
    commentData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    },
  );
}

// Delete a comment
export function deletePostCommentApi(commentId) {
  return axios.delete(`${API_HOST}/api/user/posts/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  });
}
