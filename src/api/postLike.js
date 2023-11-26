import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

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
    .catch((error) => console.error("Like Error:", error));
}

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
    .catch((error) => console.error("Unlike Error:", error));
}

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
    .catch((error) => console.error("Check Like Error:", error));
}

export function getLikesForPostApi(postId) {
  const url = `${API_HOST}/api/user/posts/${postId}/likes`;

  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  });
}
