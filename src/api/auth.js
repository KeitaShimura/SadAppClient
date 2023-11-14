import { jwtDecode } from "jwt-decode";
import { API_HOST, TOKEN } from "../utils/constant";

export function registerApi(user) {
  const url = `${API_HOST}/api/user/register`;
  const userTemp = user;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userTemp),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { code: 404, message: "このメールは利用できません。" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function loginApi(user) {
  const url = `${API_HOST}/api/user/login`;
  const userTemp = user;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userTemp),
  };

  return fetch(url, params)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      }
      return { message: "ユーザーネームまたはパスワードが違います。" };
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function setTokenApi(token) {
  localStorage.setItem(TOKEN, token);
}

export function getTokenApi(token) {
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
    const timeout = expire - Date.new();

    if (timeout < 0) {
        return true;
    }

    return false;
}