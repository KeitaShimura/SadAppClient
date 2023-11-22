import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import BasicLayout from "../../layout/BasicLayout";
import "./Home.scss";
import { getPostsApi } from "../../api/post";
import ListPosts from "../../components/ListPosts";
import { Button, Spinner } from "react-bootstrap";

export default function Home(props) {
  const [posts, setPosts] = useState(null);

  const [page, setPage] = useState(1);
  const { setRefreshCheckLogin } = props;

  const [loadingPosts, setLoadingPosts] = useState(false);

  const moreData = () => {
    const pageTemp = page + 1;
    const pageSize = 50;
    setLoadingPosts(true);

    getPostsApi(pageTemp, pageSize).then((response) => {
      if (!response) {
        setLoadingPosts(0);
      } else {
        setPosts((prevPosts) => [
          ...(Array.isArray(prevPosts) ? prevPosts : []),
          ...response.data,
        ]);
        setPage(pageTemp);
        setLoadingPosts(false);
      }
    });
  };

  useEffect(() => {
    const pageTemp = page + 1;
    const pageSize = 50;
    console.log("Page:", page, "PageSize:", pageSize);

    setLoadingPosts(true);
    getPostsApi().then((response) => {
      setPosts(response.data); // この行を確認
      if (!response) {
        setLoadingPosts(0);
      } else {
        setPage(pageTemp);
        setLoadingPosts(false);
      }
    });
  }, []);

  console.log(posts);

  return (
    <BasicLayout className="home" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="home__title">
        <h2>投稿一覧</h2>
      </div>
      {posts && <ListPosts posts={posts} />}
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

Home.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
