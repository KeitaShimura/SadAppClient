import axios from "axios";
import { registerApi, loginApi } from "./auth"; // あなたのAPIファイルへのパス
import { API_HOST } from "../utils/constant";

jest.mock("axios"); // axiosモジュールをモック化

test("registerApiがユーザーデータと共にPOSTリクエストを送信する", async () => {
  const user = {
    "name": "志村",
    "email": "1k1eitashim111ura202s1111@gmail.com",
    "password": "111111111",
    "password_confirm": "111111111"
  };
  const responseData = { token: "testToken" };
  axios.post.mockResolvedValue({ data: responseData }); // axios.postのモックを設定

  const result = await registerApi(user);

  // axios.postが適切に呼び出されたことを確認
  expect(axios.post).toHaveBeenCalledWith(
    `${API_HOST}/api/user/register`,
    user,
    { withCredentials: true },
  );

  // 適切なレスポンスが返されたことを確認
  expect(result).toEqual(responseData);
});

test("loginApiがユーザーデータと共にPOSTリクエストを送信する", async () => {
  const user = {
    "email": "keitashimura2023@gmail.com",
    "password": "11111111"
  };
  const responseData = { token: "testToken" };
  axios.post.mockResolvedValue({ data: responseData }); // axios.postのモックを設定

  const result = await loginApi(user);

  // axios.postが適切に呼び出されたことを確認
  expect(axios.post).toHaveBeenCalledWith(`${API_HOST}/api/user/login`, user, {
    withCredentials: true,
  });

  // 適切なレスポンスが返されたことを確認
  expect(result).toEqual(responseData);
});