import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function getEventsApi(page, pageSize) {
  return axios.get(
    `${API_HOST}/api/user/events?page=${page}&pageSize=${pageSize}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getTokenApi()}`,
      },
      withCredentials: true,
    },
  );
}

export function getUserEventsApi(id, page, pageSize) {
  const url = `${API_HOST}/api/user/user_events/${id}?page=${page}&pageSize=${pageSize}`;

  const params = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  };

  return fetch(url, params)
    .then((response) => {
      // レスポンスのステータスコードが400以上の場合はエラーとして扱う
      if (response.status >= 400) {
        // エラーメッセージを含むErrorオブジェクトを投げる
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      return response.json(); // レスポンスのJSONを解析
    })
    .then((result) => {
      // 解析されたJSONデータを返す
      console.log(result);

      return result;
    })
    .catch((err) => {
      // エラー発生時の処理を行う
      // エラーフラグとメッセージを含むオブジェクトを返す
      return { error: true, message: err.message };
    });
}

export function createEventApi(eventData) {
  return axios.post(`${API_HOST}/api/user/events`, eventData, {
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  });
}

export function getEventApi(id) {
  return axios.get(`${API_HOST}/api/user/events/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
  });
}

export function updateEventApi(id, eventData) {
  return axios.put(`${API_HOST}/api/user/events/${id}`, eventData, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  });
}

export function deleteEventApi(id) {
  return axios.delete(`${API_HOST}/api/user/events/${id}`, {
    headers: {
      Authorization: `Bearer ${getTokenApi()}`,
    },
    withCredentials: true,
  });
}
