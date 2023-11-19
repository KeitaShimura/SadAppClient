import axios from 'axios';
import { API_HOST, TOKEN } from "../utils/constant";
import { jwtDecode } from 'jwt-decode';

export function registerApi(user) {
  const url = `${API_HOST}/api/user/register`;

  return axios.post(url, user, { withCredentials: true })
    .then(response => {
      // 登録成功時の処理
      return response.data;
    })
    .catch(err => {
      // エラーハンドリング
      return err.response.data;
    });
}

export function loginApi(user) {
  const url = `${API_HOST}/api/user/login`;

  return axios.post(url, user, { withCredentials: true })
    .then(response => {
      // ログイン成功時の処理
      if (response.data.token) {
        setTokenApi(response.data.token);
      }
      return response.data;
    })
    .catch(err => {
      // エラーハンドリング
      return err.response.data;
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
  const currentTime = new Date().getTime(); // Use new Date() to get the current date and time

  if (expire < currentTime) {
    return true;
  }

  return false;
}
