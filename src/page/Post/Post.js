import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BasicLayout from "../../layout/BasicLayout";
import "./Post.scss";
import { getPostsApi } from "../../api/post";
import ListPosts from "../../components/ListPosts";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";

export default function Post(props) {
  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const pageSize = 50;
  const { setRefreshCheckLogin } = props;

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
        // データの読み込みが失敗した際のエラーメッセージ
        toast.error("投稿の読み込み中にエラーが発生しました。");
      });
  };

  useEffect(() => {
    setLoadingPosts(true);
    getPostsApi(page, pageSize)
      .then((response) => {
        if (response) {
          setPosts(response.data);
        }
        setLoadingPosts(false);
      })
      .catch(() => {
        setLoadingPosts(false);
        // データの読み込みが失敗した際のエラーメッセージ
        toast.error("投稿の読み込み中にエラーが発生しました。");
      });
  }, [page, pageSize]);

  useEffect(() => {
    if (searchTerm === "") {
      setFilteredPosts(posts);
    } else {
      const filtered = posts?.filter((post) =>
        post.content.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredPosts(filtered);
    }
  }, [posts, searchTerm]);

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
