import { API_HOST } from "../utils/constant";

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
