import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function likeEventApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/like`;

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

export function unlikeEventApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/unlike`;

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

export function checkIfEventLikedApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/check_like`;

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

export function getLikesForEventApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/likes`;

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
      console.error("投稿のいいねを取得中にエラーが発生しました:", error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}
