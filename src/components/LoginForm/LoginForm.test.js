import { render, fireEvent } from "@testing-library/react";
import LoginForm from "./LoginForm";
import { toast } from "react-toastify";

// toastライブラリをモック化
jest.mock("react-toastify");

describe("LoginFormコンポーネント", () => {
    it("正しいデータでフォームが送信された場合、ログインが成功すること", async () => {
        // toast.success モック関数の挙動を設定
        toast.success.mockImplementation((message) => {
            expect(message).toBe("ログインに成功しました。"); // メッセージが正しいことを確認
        });

        // コンポーネントをレンダリング
        const { getByPlaceholderText, getByText } = render(
            <LoginForm />
        );

        // フォームにデータを入力
        fireEvent.change(getByPlaceholderText("メールアドレス"), {
            target: { value: "test@example.com" },
        });
        fireEvent.change(getByPlaceholderText("パスワード"), {
            target: { value: "password123" },
        });

        // ログインボタンをクリック
        fireEvent.submit(getByText("ログインする"));
    });

    it("フォームが正しくバリデーションされること", async () => {
        // コンポーネントをレンダリング
        const { getByText, queryByText, getByPlaceholderText } = render(
            <LoginForm />
        );

        // フォームの送信ボタンをクリック
        fireEvent.submit(getByText("ログインする"));

        // バリデーションエラーメッセージが表示されていないことを確認
        expect(
            queryByText("全ての項目を入力してください。")
        ).not.toBeInTheDocument();

        // フォームに不正なデータを入力
        fireEvent.change(getByPlaceholderText("メールアドレス"), {
            target: { value: "" },
        });
        fireEvent.change(getByPlaceholderText("パスワード"), {
            target: { value: "short" },
        });

        // フォームの送信ボタンを再度クリック
        fireEvent.submit(getByText("ログインする"));

        toast.warning.mockImplementation((message) => {
            expect(message).toBe("全ての項目を入力してください。"); // メッセージが正しいことを確認
            expect(message).toBe("メールアドレスの形式が異なります。"); // メッセージが正しいことを確認
        });
    });

    // 他のテストケースにも同様の方法を適用できます
});

