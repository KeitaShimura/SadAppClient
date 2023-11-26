import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import "./Post.scss";
import ListPostComments from "../../components/ListPostComments";
import BasicLayout from "../../layout/BasicLayout";
import { getPostApi } from "../../api/post";
import { getPostCommentsApi } from "../../api/postComment";
import { Button, Spinner } from "react-bootstrap";
import moment from "moment";
import { replaceURLWithHTMLLinks } from "../../utils/functions";

function Post(props) {
  const params = useParams();
  const { setRefreshCheckLogin } = props;
  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPostComments, setLoadingPostComments] = useState(false);

  useEffect(() => {
    getPostCommentsApi(params.id)
      .then((response) => {
        setPostComments(response.data);
      })
      .catch((error) => {
        toast.error(error);
      });
  }, [params.id]);

  useEffect(() => {
    getPostApi(params.id)
      .then((response) => {
        setPost(response.data);
      })
      .catch((error) => {
        console.error("Error fetching post:", error);
        toast.error("投稿の取得に失敗しました。");
      });
  }, [params.id]);

  const moreData = () => {
    const pageTemp = page + 1;
    const pageSize = 50;
    console.log("Page:", page, "PageSize:", pageSize);

    setLoadingPostComments(true);
    getPostCommentsApi(params.id)
      .then((response) => {
        if (!response) {
          setLoadingPostComments(false); // Handle the error condition
        } else {
          setPostComments(response.data);
          setPage(pageTemp);
          setLoadingPostComments(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching post comments:", error);
        setLoadingPostComments(false); // Handle the error condition
      });
  };

  console.log(post);
  console.log(postComments);

  return (
    <BasicLayout className="post" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="post">
        <div>
          {post && post.user && (
            <div className="name">
              {post.user.name}
              <span>{moment(post.created_at).calendar()}</span>
            </div>
          )}
          <div
            dangerouslySetInnerHTML={{
              __html: replaceURLWithHTMLLinks(post?.content || ""), // Use optional chaining and provide a default value
            }}
          />
        </div>
      </div>
      <div className="post__comment">
        <ListPostComments postComments={postComments} />
      </div>
      <Button onClick={moreData}>
        {!loadingPostComments ? (
          loadingPostComments !== 0 && "もっと見る"
        ) : (
          <Spinner
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

export default Post;

// propTypes の宣言
Post.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
