import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// 特定の投稿のすべてのコメントを取得
export function getPostCommentsApi(postId) {
  return axios.get(`${API_HOST}/api/user/posts/comments/${postId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("コメントを取得中にエラーが発生しました:", error);
      throw error;
    });
}

// 新しいコメントを作成
export function createPostCommentApi(postId, commentData) {
  return axios.post(
    `${API_HOST}/api/user/posts/comments/${postId}`,
    commentData,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    },
  )
    .then((response) => response.data)
    .catch((error) => {
      console.error("コメントの作成中にエラーが発生しました:", error);
      throw error;
    });
}

// コメントを更新
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
  )
    .then((response) => response.data)
    .catch((error) => {
      console.error("コメントの更新中にエラーが発生しました:", error);
      throw error;
    });
}

// コメントを削除
export function deletePostCommentApi(commentId) {
  return axios.delete(`${API_HOST}/api/user/posts/comments/${commentId}`, {
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  })
    .then((response) => response.data)
    .catch((error) => {
      console.error("コメントの削除中にエラーが発生しました:", error);
      throw error;
    });
}
