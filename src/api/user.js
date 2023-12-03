import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// すべてのユーザーのデータを取得
export function getAllUsersApi(page, pageSize) {
  // APIのURLを構築する
  const url = `${API_HOST}/api/user/users?page=${page}&pageSize=${pageSize}`;

  // fetchリクエスト用のパラメータを設定する
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`, // 認証トークンを含める
    },
    withCredentials: true,
  };

  // fetchリクエストを実行
  return fetch(url, params)
    .then((response) => {
      // レスポンスのステータスコードが400以上の場合はエラーとして扱う
      if (response.status >= 400) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json(); // レスポンスのJSONを解析
    })
    .then((result) => {
      // 解析されたJSONデータ（ユーザーデータの配列）を返す
      return result;
    })
    .catch((err) => {
      // エラー発生時の処理
      return { error: true, message: err.message };
    });
}

// 特定のユーザーのデータを取得
export function getUserApi(id) {
  // APIのURLを構築する
  const url = `${API_HOST}/api/user/user/${id}`;

  // fetchリクエスト用のパラメータを設定する
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  };

  // fetchリクエストを実行
  return fetch(url, params)
    .then((response) => {
      // レスポンスのステータスコードが400以上の場合はエラーとして扱う
      if (response.status >= 400) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json(); // レスポンスのJSONを解析
    })
    .then((result) => {
      // 解析されたJSONデータを返す
      return result;
    })
    .catch((err) => {
      // エラー発生時の処理
      return { error: true, message: err.message };
    });
}

// ユーザーデータを更新
export function updateUserData(profileData) {
  return axios
    .put(`${API_HOST}/api/user/user`, profileData, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
        "Content-Type": "application/json", // JSON ヘッダーを設定
      },
      withCredentials: true,
    })
    .then((response) => {
      console.log("Updated Data:", response.data);
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response ? error.response.data : error);
      throw error;
    });
}

// ユーザーデータを更新
export async function updatePassword(currentPassword, newPassword) {
  const requestData = {
    current_password: currentPassword,
    password: newPassword,
    password_confirm: newPassword,
  };

  return axios
    .put(`${API_HOST}/api/user/password`, requestData, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      // 成功時の処理
      console.log("Updated Data:", response.data);
      return response.data;
    })
    .catch((error) => {
      // エラーハンドリング
      console.error("Error:", error.response ? error.response.data : error);
      throw error;
    });
}
