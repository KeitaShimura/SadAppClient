import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BasicLayout from "../../layout/BasicLayout";
import "./Post.scss";
import { createPostApi, getPostsApi } from "../../api/post";
import ListPosts from "../../components/ListPosts";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import classNames from "classnames";

export default function Post(props) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const pageSize = 50;
  const { setRefreshCheckLogin } = props;
  const [message, setMessage] = useState("");
  const maxLength = 200;

  const moreData = () => {
    setLoadingPosts(true);
    getPostsApi(page, pageSize)
      .then((response) => {
        if (response) {
          setPosts((prevPosts) => [
            ...(Array.isArray(prevPosts) ? prevPosts : []),
            ...response.data,
          ]);
          setPage((prevPage) => prevPage + 1);
        }
        setLoadingPosts(false);
      })
      .catch(() => {
        setLoadingPosts(false);
        toast.error("投稿の読み込み中にエラーが発生しました。");
      });
  };

  useEffect(() => {
    setLoadingPosts(true);
    getPostsApi(page, pageSize)
      .then((response) => {
        console.log("Complete API Response:", response);
        if (response) {
          setPosts((prevPosts) => [...prevPosts, ...response.data]);
        }
        setLoadingPosts(false);
      })
      .catch(() => {
        setLoadingPosts(false);
        toast.error("投稿の読み込み中にエラーが発生しました。");
      });
  }, [page, pageSize]);


  useEffect(() => {
    console.log("Updated Posts:", posts);
    if (searchTerm === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts.filter((post) =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPosts(filtered);
    }
  }, [posts, searchTerm]);


  const onSubmit = async (e) => {
    e.preventDefault();

    // バリデーションチェック
    if (message.trim().length === 0 || message.trim().length > 500) {
      toast.error("コメントは1文字以上500文字以下である必要があります。");
      return;
    }

    try {
      // createPostCommentApiを呼び出してコメントを作成
      const response = await createPostApi({ content: message });

      if (response.data && response.data.id) {
        // Create a new array with the new post and previous posts
        setPosts((prevPosts) => [response.data, ...prevPosts]);

        // 投稿が正常に作成された場合の処理
        console.log("Comment created:", response.data);
        toast.success("投稿されました");

        setMessage(""); // メッセージをクリア
        window.location.reload();
      } else {
        console.error("Invalid comment data:", response.data);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
      toast.warning(
        "投稿の送信中にエラーが発生しました。お時間を置いてもう一度お試しください。",
      );
    }
  };

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>投稿一覧</h2>
        <input
          type="text"
          placeholder="検索"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="home__title">
        <form onSubmit={onSubmit}>
          <textarea
            rows={6}
            type="text"
            name="content"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="今の気持ちを共有してみましょう！"
          />
          <span
            className={classNames("count", {
              error: message.length > maxLength,
            })}
          >
            {message.length}
          </span>
          <Button
            type="submit"
            disabled={message.length > maxLength || message.length < 1}
          >
            投稿する
          </Button>
        </form>
      </div>

      {filteredPosts && filteredPosts.length > 0 ? (
        <ListPosts posts={filteredPosts} />
      ) : (
        "検索結果がありません"
      )}
      <Button className="load-button" onClick={moreData}>
        {!loadingPosts ? (
          loadingPosts !== 0 && "もっと見る"
        ) : (
          <Spinner
            as="span"
            animation="grow"
            size="sm"
            role="status"
            aria-hidden="true"
          />
        )}
      </Button>
    </BasicLayout>
  );
}

Post.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
