import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function ParticipationEventApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/participation`;

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
    .catch((error) => console.error("Participation Error:", error));
}

export function leaveEventApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/leave`;

  return axios
    .delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error("Leave Error:", error));
}

export function checkIfEventParticipantsApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/check_participant`;

  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    })
    .then((response) => response.data)
    .catch((error) => console.error("Check Participation Error:", error));
}

export function getParticipantsForEventApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/participants`;

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
