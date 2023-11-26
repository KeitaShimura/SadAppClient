import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// Fetch all comments for a event
export function getEventCommentsApi(eventId) {
  return axios.get(`${API_HOST}/api/user/events/comments/${eventId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  });
}

// Create a new comment
export function createEventCommentApi(eventId, commentData) {
  return axios.post(
    `${API_HOST}/api/user/events/comments/${eventId}`,
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

// Update a comment
export function updateEventCommentApi(commentId, commentData) {
  return axios.put(
    `${API_HOST}/api/user/events/comments/${commentId}`,
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
export function deleteEventCommentApi(commentId) {
  return axios.delete(`${API_HOST}/api/user/events/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  });
}
