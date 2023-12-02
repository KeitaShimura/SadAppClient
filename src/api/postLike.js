import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// 投稿を「いいね」する
export function likePostApi(postId) {
  const url = `${API_HOST}/api/user/posts/${postId}/like`;

  return axios
    .post(
      url,
      {},
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
      console.error("「いいね」エラー:", error);
      throw error;
    });
}

// 投稿の「いいね」を取り消す
export function unlikePostApi(postId) {
  const url = `${API_HOST}/api/user/posts/${postId}/unlike`;

  return axios
    .delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("「いいね」取り消しエラー:", error);
      throw error;
    });
}

// 投稿に「いいね」したかどうかを確認
export function checkIfPostLikedApi(postId) {
  const url = `${API_HOST}/api/user/posts/${postId}/check_like`;

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
      console.error("「いいね」確認エラー:", error);
      throw error;
    });
}

// 投稿の「いいね」を取得
export function getLikesForPostApi(postId) {
  const url = `${API_HOST}/api/user/posts/${postId}/likes`;

  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => {
      console.error("投稿の「いいね」を取得中にエラーが発生しました:", error);
      throw error;
    });
}
