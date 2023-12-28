import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// すべての投稿を取得
export function getPostsApi(page, pageSize) {
  return axios
    .get(`${API_HOST}/api/user/posts?page=${page}&pageSize=${pageSize}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => {
      return response;
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

// 特定のユーザーの投稿を取得
export function getUserPostsApi(id, page, pageSize) {
  const url = `${API_HOST}/api/user/user_posts/${id}?page=${page}&pageSize=${pageSize}`;

  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    ,
  })
    .then((response) => {
      if (response.status >= 400) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error("ユーザーの投稿を取得中にエラーが発生しました:", error);
      throw error;
    });
}

// 新しい投稿を作成
export function createPostApi(postData, image) {
  const formData = new FormData();
  formData.append("content", postData.content);
  if (image) {
    // 画像ファイルのサイズや種類の検証が必要な場合、ここに追加
    formData.append("image", image);
  }

  return axios
    .post(`${API_HOST}/api/user/posts`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => response)
    .catch((error) => {
      console.error("投稿の作成中にエラーが発生しました:", error);
      throw error;
    });
}

// 特定の投稿を取得
export function getPostApi(id) {
  return axios
    .get(`${API_HOST}/api/user/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
    })
    .then((response) => response)
    .catch((error) => {
      console.error("投稿の取得中にエラーが発生しました:", error);
      throw error;
    });
}

// 特定の投稿を更新
export function updatePostApi(id, postData) {
  return axios
    .put(`${API_HOST}/api/user/posts/${id}`, postData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("投稿の更新中にエラーが発生しました:", error);
      throw error;
    });
}

// 特定の投稿を削除
export function deletePostApi(id) {
  return axios
    .delete(`${API_HOST}/api/user/posts/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => response)
    .catch((error) => {
      console.error("投稿の削除中にエラーが発生しました:", error);
      throw error;
    });
}

// ユーザーがいいねした投稿を取得
export function getUserLikedPostsApi(userId) {
  const url = `${API_HOST}/api/user/posts/${userId}/liked_posts`;

  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error(
        "ユーザーがいいねした投稿を取得中にエラーが発生しました:",
        error,
      );
      throw error;
    });
}
