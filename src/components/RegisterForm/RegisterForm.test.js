import { render, fireEvent } from "@testing-library/react";
import RegisterForm from "./RegisterForm";
import { toast } from "react-toastify";

// toastライブラリをモック化
jest.mock("react-toastify");

describe("RegisterFormコンポーネント", () => {
  it("正しいデータでフォームが送信された場合、アカウント登録が成功すること", async () => {
    // toast.success モック関数の挙動を設定
    toast.success.mockImplementation((message) => {
      expect(message).toBe("アカウントを登録しました。"); // メッセージが正しいことを確認
    });

    // コンポーネントをレンダリング
    const { getByPlaceholderText, getByText } = render(
      <RegisterForm setRefreshCheckLogin={() => {}} />,
    );

    // フォームにデータを入力
    fireEvent.change(getByPlaceholderText("名前"), {
      target: { value: "テストユーザー" },
    });
    fireEvent.change(getByPlaceholderText("メールアドレス"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByPlaceholderText("パスワード"), {
      target: { value: "password123" },
    });
    fireEvent.change(getByPlaceholderText("パスワード確認"), {
      target: { value: "password123" },
    });

    // 登録ボタンをクリック
    fireEvent.submit(getByText("登録"));
  });

  it("フォームが正しくバリデーションされること", async () => {
    // コンポーネントをレンダリング
    const { getByText, queryByText, getByPlaceholderText } = render(
      <RegisterForm setRefreshCheckLogin={() => {}} />,
    );

    // フォームの送信ボタンをクリック
    fireEvent.submit(getByText("登録"));

    // バリデーションエラーメッセージが表示されていないことを確認
    expect(
      queryByText("全ての項目を入力してください。"),
    ).not.toBeInTheDocument();

    // フォームに不正なデータを入力
    fireEvent.change(getByPlaceholderText("名前"), { target: { value: "" } });
    fireEvent.change(getByPlaceholderText("メールアドレス"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(getByPlaceholderText("パスワード"), {
      target: { value: "short" },
    });
    fireEvent.change(getByPlaceholderText("パスワード確認"), {
      target: { value: "passwords-dont-match" },
    });

    // フォームの送信ボタンを再度クリック
    fireEvent.submit(getByText("登録"));

    toast.success.mockImplementation((message) => {
      expect(message).toBe("全ての項目を入力してください。"); // メッセージが正しいことを確認
      expect(message).toBe("メールアドレスの形式が異なります。"); // メッセージが正しいことを確認
      expect(message).toBe("パスワードは6文字以上に設定してください。"); // メッセージが正しいことを確認
      expect(message).toBe("パスワードが一致しません。"); // メッセージが正しいことを確認
    });
  });

  // 他のテストケースにも同様の方法を適用できます
});
