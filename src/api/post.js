import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// Fetch all posts
export function getPostsApi(page, pageSize) {
  return axios.get(
    `${API_HOST}/api/user/posts?page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    },
  );
}

// Fetch all posts
export function getUserPostsApi(id, page, pageSize) {
  const url = `${API_HOST}/api/user/user_posts/${id}?page=${page}&pageSize=${pageSize}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  };

  return fetch(url, params)
    .then((response) => {
      // レスポンスのステータスコードが400以上の場合はエラーとして扱う
      if (response.status >= 400) {
        // エラーメッセージを含むErrorオブジェクトを投げる
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json(); // レスポンスのJSONを解析
    })
    .then((result) => {
      // 解析されたJSONデータを返す
      console.log(result);

      return result;
    })
    .catch((err) => {
      // エラー発生時の処理を行う
      // エラーフラグとメッセージを含むオブジェクトを返す
      return { error: true, message: err.message };
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
  return axios
    .get(`${API_HOST}/api/user/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
    })
    .then((response) => {
      // レスポンスが正常に返された場合の処理
      console.log("Response:", response);
      return response;
    })
    .catch((error) => {
      // エラーが発生した場合の処理
      console.error("Error during API call:", error);
      // エラーメッセージまたは全体のエラーオブジェクトを返す
      return error.message || error;
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

export function getUserLikedPostsApi(userId) {
  const url = `${API_HOST}/api/user/posts/${userId}/liked_posts`;

  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("投稿を取得中にエラーが発生しました:", error);
      throw error;
    });
}
