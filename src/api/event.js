import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function getEventsApi(page, pageSize) {
  return axios
    .get(`${API_HOST}/api/user/events?page=${page}&pageSize=${pageSize}`, {
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

export function getUserEventsApi(id, page, pageSize) {
  const url = `${API_HOST}/api/user/user_events/${id}?page=${page}&pageSize=${pageSize}`;

  return axios
    .get(url, {
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

export function createEventApi(eventData, image) {
  const formData = new FormData();
  formData.append("title", eventData.title);
  formData.append("content", eventData.content);
  formData.append("event_url", eventData.event_url);
  formData.append("event_date", eventData.event_date);

  if (image) {
    formData.append("image", image);
  }

  return axios
    .post(`${API_HOST}/api/user/events`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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

export function getEventApi(id) {
  return axios
    .get(`${API_HOST}/api/user/events/${id}`, {
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

export function updateEventApi(id, eventData) {
  return axios
    .put(`${API_HOST}/api/user/events/${id}`, eventData, {
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

export function deleteEventApi(id) {
  return axios
    .delete(`${API_HOST}/api/user/events/${id}`, {
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
export function getUserLikedEventsApi(userId, page, pageSize) {
  const url = `${API_HOST}/api/user/events/${userId}/liked_events?page=${page}&pageSize=${pageSize}`;

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
      console.error("投稿を取得中にエラーが発生しました:", error);
      throw error;
    });
}

export function getUserParticipatedEvents(userId, page, pageSize) {
  const url = `${API_HOST}/api/user/events/${userId}/participated_events?page=${page}&pageSize=${pageSize}`;

  return axios
    .get(url, {
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
      } else {
        // その他のエラー
        throw new Error("エラーが発生しました：" + error.message);
      }
    });
}
