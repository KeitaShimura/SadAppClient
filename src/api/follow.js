import axios from "axios";
import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function followUserApi(userId) {
  const url = `${API_HOST}/api/user/follow/${userId}`; // Adjust the endpoint as needed

  return axios
    .post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${getTokenApi()}`,
          "Content-Type": "application/json",
        },
        withCredentials: true,
      },
    )
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error("Error:", error.response ? error.response.data : error);
    });
}

export function unfollowUserApi(userId) {
  const url = `${API_HOST}/api//unfollow/${userId}`; // Replace with your API endpoint for unfollow

  return axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data; // Handle the response data
    })
    .catch((error) => {
      console.error("Error:", error.response ? error.response.data : error);
    });
}

export function checkIfFollowingApi(authUserId, targetUserId) {
  const url = `${API_HOST}/api/user/check_if_following/${targetUserId}`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
        "Content-Type": "application/json",
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data; // true または false を返します
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

export function getFollowingApi(userId) {
  const url = `${API_HOST}/api/user/followings/${userId}`; // Replace with your API endpoint for fetching following list

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      return response.data; // Handle the response data
    })
    .catch((error) => {
      console.error("Error:", error.response ? error.response.data : error);
    });
}

export function getFollowersApi(userId) {
  const url = `${API_HOST}/api/user/followers/${userId}`; // Replace with your API endpoint for fetching followers list

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${getTokenApi()}`,
      },
    })
    .then((response) => {
      return response.data; // Handle the response data
    })
    .catch((error) => {
      console.error("Error:", error.response ? error.response.data : error);
    });
}
