import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

// イベントのすべてのコメントを取得
export function getEventCommentsApi(eventId) {
  return axios
    .get(`${API_HOST}/api/user/events/comments/${eventId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
    })
    .then((response) => {
      return response;
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

// 新しいコメントを作成
export function createEventCommentApi(eventId, commentData) {
  return axios
    .post(`${API_HOST}/api/user/events/comments/${eventId}`, commentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return response;
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

// コメントを更新
export function updateEventCommentApi(commentId, commentData) {
  return axios
    .put(`${API_HOST}/api/user/events/comments/${commentId}`, commentData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    })
    .then((response) => {
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

// コメントを削除
export function deleteEventCommentApi(commentId) {
  return axios
    .delete(`${API_HOST}/api/user/events/comments/${commentId}`, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    })
    .then((response) => {
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
