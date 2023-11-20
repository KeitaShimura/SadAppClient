import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// Fetch all posts
export function getPostsApi() {
  return axios.get(`${API_HOST}/api/user/posts`, {
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  });
}

// Create a new post
export function createPostApi(postData) {
  return axios.post(`${API_HOST}/api/user/posts`, postData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  });
}

// Fetch a single post by ID
export function getPostApi(id) {
  return axios.get(`${API_HOST}/api/user/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
  });
}

// Update a post by ID
export function updatePostApi(id, postData) {
  return axios.put(`${API_HOST}/api/user/posts/${id}`, postData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  });
}

// Delete a post by ID
export function deletePostApi(id) {
  return axios.delete(`${API_HOST}/api/user/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  });
}
