import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// イベントに参加する
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
    .catch((error) => {
      console.error("参加エラー:", error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// イベントから退出する
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
    .catch((error) => {
      console.error("退出エラー:", error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// イベントの参加者をチェック
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
    .catch((error) => {
      console.error("参加者チェックエラー:", error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// イベントの参加者を取得
export function getParticipantsForEventApi(eventId, page, pageSize) {
  const url = `${API_HOST}/api/user/events/${eventId}/participants?page=${page}&pageSize=${pageSize}`;

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
      console.error("イベントの参加者取得中にエラーが発生しました:", error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}
