import axios from "axios";
import { API_HOST, TOKEN } from "../utils/constant";
import { jwtDecode } from "jwt-decode";

export function registerApi(user) {
  const url = `${API_HOST}/api/user/register`;

  return axios
    .post(url, user, { withCredentials: true })
    .then((response) => {
      // 登録成功時の処理
      if (response.data.token) {
        setTokenApi(response.data.token);
      }
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

export function loginApi(user) {
  const url = `${API_HOST}/api/user/login`;

  return axios
    .post(url, user, { withCredentials: true })
    .then((response) => {
      // ログイン成功時の処理
      if (response.data.token) {
        setTokenApi(response.data.token);
      }
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

export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenApi() {
  return localStorage.getItem(TOKEN);
}

export function logoutApi(token) {
  return localStorage.removeItem(TOKEN);
}

export function isUserLoggedAPI() {
  const token = getTokenApi();

  if (!token) {
    logoutApi();
    return null;
  }

  if (isExpired(token)) {
    logoutApi();
  }

  return jwtDecode(token);
}

function isExpired(token) {
  const { exp } = jwtDecode(token);
  const expire = exp * 1000;
  const currentTime = new Date().getTime();

  if (expire < currentTime) {
    return true;
  }

  return false;
}
