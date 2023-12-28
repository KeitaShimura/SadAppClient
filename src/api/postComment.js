import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// 特定の投稿のすべてのコメントを取得
export function getPostCommentsApi(postId, page, pageSize) {
  return axios
    .get(
      `${API_HOST}/api/user/posts/comments/${postId}?page=${page}&pageSize=${pageSize}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getTokenApi()}`,
        },
      },
    )
    .then((response) => response)
    .catch((error) => {
      console.error("コメントを取得中にエラーが発生しました:", error);
      throw error;
    });
}

// 新しいコメントを作成
export function createPostCommentApi(postId, commentData) {
  return axios
    .post(`${API_HOST}/api/user/posts/comments/${postId}`, commentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      // エラーハンドリング
      if (error.response) {
        // サーバーからのエラーレスポンス
        throw new Error(error.response.data.message);
      } else if (error.request) {
        // リクエストがサーバーに到達しなかった場合
        throw new Error(
          "ネットワークエラー：リクエストが送信されませんでした。",
        );
      } else {
        // その他のエラー
        throw new Error("エラーが発生しました：" + error.message);
      }
    });
}

// コメントを更新
export function updatePostCommentApi(commentId, commentData) {
  return axios
    .put(`${API_HOST}/api/user/posts/comments/${commentId}`, commentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("コメントの更新中にエラーが発生しました:", error);
      throw error;
    });
}

// コメントを削除
export function deletePostCommentApi(commentId) {
  return axios
    .delete(`${API_HOST}/api/user/posts/comments/${commentId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => response)
    .catch((error) => {
      console.error("コメントの削除中にエラーが発生しました:", error);
      throw error;
    });
}
