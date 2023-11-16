import { API_HOST } from "../utils/constant";
import { getTokenApi } from "./auth";

export function getUserApi(id) {
  // APIのURLを構築する
  const url = `${API_HOST}/api/user/user/${id}`;

  // fetchリクエスト用のパラメータを設定する
  const params = {
    headers: {
      "Content-Type": "application/json",
      Authenticator: `${getTokenApi()}`, // トークンを取得して認証ヘッダーに設定
    },
  };

  // fetchリクエストを実行
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
      return result;
    })
    .catch((err) => {
      // エラー発生時の処理を行う
      // エラーフラグとメッセージを含むオブジェクトを返す
      return { error: true, message: err.message };
    });
}
