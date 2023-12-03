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
  const pageSize = 5;
  const { setRefreshCheckLogin } = props;
  const [showPostModal, setShowPostModal] = useState(false);

  const loadPosts = () => {
    if (!loadingPosts) {
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
    }
  };

  const moreData = () => {
    loadPosts();
  };

  // スクロールイベントリスナーを設定
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
      loadPosts();
    };

    window.addEventListener('scroll', handleScroll);

    // クリーンアップ関数
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadingPosts]);

  // 検索用のフィルタリング
  useEffect(() => {
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
      <div className="post__header">
        <div className="right-aligned">
          <input
            type="text"
            className="form-control"
            placeholder="投稿検索"
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
          <p className="text-center mt-2 fw-bold">投稿は存在しません</p>
        )}
        <Button onClick={moreData}>
          {!loadingPosts ? (
            "もっと見る"
          ) : (
            <Spinner animation="grow" size="sm" role="status" aria-hidden="true" />
          )}
        </Button>
      </div>
    </BasicLayout>
  );
}

Post.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
