<h1>COCOLOTalk / 対人恐怖症の方ためのSNS</h1>
    <p>
        バックエンドのリポジトリは<a href="https://github.com/KeitaShimura/SadAppApi" target="_blank">こちら</a>
    </p>
    <img width="1800" alt="スクリーンショット 2023-12-08 2 56 59" src="https://github.com/KeitaShimura/SadAppAPI/assets/124238548/b159463e-247d-4f25-8bc5-84562412837d">
    <img width="1800" alt="スクリーンショット 2023-12-08 2 56 44" src="https://github.com/KeitaShimura/SadAppAPI/assets/124238548/d96ebfca-0aef-4fb7-ad7b-1da56136f167">

</p>
<h2>サービス概要</h2>
<p>COCOLOTalkは「対人恐怖症、社交不安障害（SAD）の方のお悩みを解決したい！」という想いから作られた、無料のSNSです。</p>
<p>自分と同じお悩みを持つ方に悩みを打ち明けることができます。</p>

<h2>メイン機能の使い方</h2>
<table border="1">
    <tr>
        <th>アカウント登録</th>
        <th>プロフィール編集</th>
        <th>タブ切り替え</th>
        <th>投稿</th>
        <th>イベント投稿</th>
    </tr>
    <tr>
        <td>
            <img src="https://github.com/KeitaShimura/SadAppAPI/assets/124238548/050ab715-0a7c-4016-b8a0-6e11c2ccb2f9" width="400" height="250">
        </td>
        <td>
            <img src="https://github.com/KeitaShimura/SadAppAPI/assets/124238548/4dd5bf30-8b2f-40e7-9d70-7ac16ed2311b" width="400" height="250">
        </td>
        <td>
            <img src="https://github.com/KeitaShimura/SadAppAPI/assets/124238548/6709f298-cf6c-49eb-9ebf-87f35d5043bf" width="400" height="250">
        </td>
        <td>
            <img src="https://github.com/KeitaShimura/SadAppAPI/assets/124238548/fa9e45a1-464a-4283-bf98-55bd73161794" width="400" height="250">
        </td>
        <td>
            <img src="https://github.com/KeitaShimura/SadAppAPI/assets/124238548/cf94fa91-f239-4a36-b82f-22097b18c7cd" width="400" height="250">
        </td>
    </tr>
</table>


<h2>使用技術一覧</h2>

- バックエンド: Go / Fiber

  - コード解析: golangci-lint
  - フォーマッター: gofmt
  - テストパッケージ: testing

- フロントエンド: JavaScript / React

  - コード解析: ESLint
  - フォーマッター: Prettier
  - テストフレームワーク: React Testing Library / Jest
  - 主要パッケージ: Axios / Font Awesome / React Bootstrap / React Toastify

- CI / CD: GitHub Actions
- 環境構築: Docker / Docker Compose
- インフラ: Render / Nginx / Vercel

<h2>機能一覧</h2>
    <ul>
        <li>ログイン</li>
        <li>新規登録</li>
        <li>ログアウト</li>
        <li>投稿、投稿一覧、削除</li>
        <li>イベント、イベント一覧、削除</li>
        <li>ユーザー一覧、フォロー、フォロワー一覧</li>
        <li>プロフィール、プロフィール編集</li>
    </ul>

<h2>画面</h2>
    <ul>
        <li>トースト表示</li>
        <li>モーダル画面(各画面の詳細は下記の画面遷移図参照)</li>
        <li>404エラーのカスタム画面</li>
        <li>レスポンシブデザイン</li>
    </ul>

<h2>ER図</h2>
<img width="888" alt="スクリーンショット 2023-12-11 2 53 06" src="https://github.com/KeitaShimura/SadAppAPI/assets/124238548/5240faf4-c484-4969-af10-01ad3fe44d48" /></br>
<a href="https://dbdiagram.io/d/64600a51dca9fb07c40853cc" target="_blank">ER図</a>
