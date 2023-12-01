import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// ユーザーをフォローする
export function followUserApi(userId) {
  const url = `${API_HOST}/api/user/follow/${userId}`;

  return axios
    .post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${getTokenApi()}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("フォローエラー:", error.response ? error.response.data : error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// ユーザーのフォローを解除する
export function unfollowUserApi(userId) {
  const url = `${API_HOST}/api/user/unfollow/${userId}`;

  return axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("フォロー解除エラー:", error.response ? error.response.data : error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// ユーザーをフォローしているかチェック
export function checkIfFollowingApi(authUserId, targetUserId) {
  const url = `${API_HOST}/api/user/check_if_following/${targetUserId}`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("フォローチェックエラー:", error.response ? error.response.data : error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// フォローしているユーザー一覧を取得
export function getFollowingApi(userId) {
  const url = `${API_HOST}/api/user/followings/${userId}`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("フォロー一覧取得エラー:", error.response ? error.response.data : error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// フォロワー一覧を取得
export function getFollowersApi(userId) {
  const url = `${API_HOST}/api/user/followers/${userId}`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
      },
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("フォロワー一覧取得エラー:", error.response ? error.response.data : error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}
