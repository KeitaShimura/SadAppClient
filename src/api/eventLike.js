import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// イベントに「いいね」を付ける
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
        ,
      },
    )
    .then((response) => response.data)
    .catch((error) => {
      console.error("いいねエラー:", error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// イベントの「いいね」を解除する
export function unlikeEventApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/unlike`;

  return axios
    .delete(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("「いいね」解除エラー:", error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// イベントが「いいね」されているかをチェック
export function checkIfEventLikedApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/check_like`;

  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("「いいね」チェックエラー:", error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}

// イベントの「いいね」を取得
export function getLikesForEventApi(eventId) {
  const url = `${API_HOST}/api/user/events/${eventId}/likes`;

  return axios
    .get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      ,
    })
    .then((response) => response.data)
    .catch((error) => {
      console.error("イベントのいいねを取得中にエラーが発生しました:", error);
      throw error; // エラーを再スローして詳細を確認できるようにします
    });
}
