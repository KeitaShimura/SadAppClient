import axios from "axios";
import { API_HOST, TOKEN } from "../utils/constant";

// Fetch all posts
export function getPostsApi() {
  const token = localStorage.getItem(TOKEN);
  return axios.get(`${API_HOST}/api/posts`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Create a new post
export function createPostApi(postData) {
  const token = localStorage.getItem(TOKEN);
  return axios.post(`${API_HOST}/api/posts`, postData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

// Fetch a single post by ID
export function getPostApi(id) {
  const token = localStorage.getItem(TOKEN);
  return axios.get(`${API_HOST}/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Update a post by ID
export function updatePostApi(id, postData) {
  const token = localStorage.getItem(TOKEN);
  return axios.put(`${API_HOST}/api/posts/${id}`, postData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

// Delete a post by ID
export function deletePostApi(id) {
  const token = localStorage.getItem(TOKEN);
  return axios.delete(`${API_HOST}/api/posts/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
