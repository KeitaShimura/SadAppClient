import axios from "axios";
import { API_HOST, TOKEN } from "../utils/constant";
import { getTokenApi } from "./auth";

export function followUserApi(userId) {
  const token = localStorage.getItem(TOKEN);

  const url = `${API_HOST}/api/user/follow/${userId}`; // Adjust the endpoint as needed

  return axios
    .post(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
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
  const token = localStorage.getItem(TOKEN);

  const url = `${API_HOST}/api/user/unfollow/${userId}`; // Replace with your API endpoint for unfollow

  return axios
    .delete(url, {
      headers: {
        Authorization: `Bearer ${token}`,
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
  console.log(targetUserId);
  const token = localStorage.getItem(TOKEN);
  const url = `${API_HOST}/api/user/check_if_following/${targetUserId}`;

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export function getFollowingListApi(userId) {
  const token = localStorage.getItem(TOKEN);

  const url = `${API_HOST}/api/following/${userId}`; // Replace with your API endpoint for fetching following list

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export function getFollowerListApi(userId) {
  const token = getTokenApi(); // Retrieve the token
  const url = `${API_HOST}/api/followers/${userId}`; // Replace with your API endpoint for fetching followers list

  return axios
    .get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      return response.data; // Handle the response data
    })
    .catch((error) => {
      console.error("Error:", error.response ? error.response.data : error);
    });
}
