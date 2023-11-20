import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

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
        // エラーメッセージを含むErrorオブジェクトを投げる
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json(); // レスポンスのJSONを解析
    })
    .then((result) => {
      // 解析されたJSONデータを返す
      return result;
    })
    .catch((err) => {
      // エラー発生時の処理を行う
      // エラーフラグとメッセージを含むオブジェクトを返す
      return { error: true, message: err.message };
    });
}

export function updateUserData(bannerFile, iconFile, profileData) {
  const formData = new FormData();

  // バナーとアバターファイルを追加（存在する場合）
  if (bannerFile) formData.append("banner", bannerFile);
  if (iconFile) formData.append("icon", iconFile);

  // プロフィールデータを追加（存在する場合）
  if (profileData) {
    for (const key in profileData) {
      formData.append(key, profileData[key]);
    }
  }

  return axios
    .put(`${API_HOST}/api/user/user`, formData, {
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
    });
}
