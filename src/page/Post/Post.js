import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BasicLayout from "../../layout/BasicLayout";
import "./Post.scss";
import { getPostsApi } from "../../api/post";
import ListPosts from "../../components/ListPosts";
import { Button, Spinner } from "react-bootstrap";
import { toast } from "react-toastify";
import PostModal from "../../components/Modal/PostModal";

export default function Post(props) {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [loadingPosts, setLoadingPosts] = useState(false);
  const pageSize = 50;
  const { setRefreshCheckLogin } = props;
  const [showPostModal, setShowPostModal] = useState(false);

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
        post.content.toLowerCase().includes(searchTerm.toLowerCase()),
      );
      setFilteredPosts(filtered);
    }
  }, [posts, searchTerm]);

  return (
    <BasicLayout className="post" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="post__title">
        <h2>投稿一覧</h2>
        <div className="right-aligned">
          <input
            type="text"
            className="form-control"
            placeholder="検索"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="button-container">
            <Button onClick={() => setShowPostModal(true)}>投稿する</Button>
          </div>
          <PostModal show={showPostModal} setShow={setShowPostModal} />
        </div>
      </div>

      <div className="post__content">
        {filteredPosts && filteredPosts.length > 0 ? (
          <ListPosts posts={filteredPosts} />
        ) : (
          "検索結果がありません"
        )}
        <Button onClick={moreData}>
          {!loadingPosts ? (
            loadingPosts !== 0 && "もっと見る"
          ) : (
            <Spinner
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

Post.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
