import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import ListPostComments from "../../components/ListPostComments";
import BasicLayout from "../../layout/BasicLayout";
import { getPostApi } from "../../api/post";
import {
  createPostCommentApi,
  getPostCommentsApi,
} from "../../api/postComment";
import { Button, Spinner } from "react-bootstrap";
import moment from "moment";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import classNames from "classnames";
import "./EventComments.scss";

function EventComments(props) {
  const { setRefreshCheckLogin } = props;
  const params = useParams();
  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPostComments, setLoadingPostComments] = useState(false);
  const [message, setMessage] = useState("");
  const maxLength = 200;

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

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      // Call createPostApi with the message
      const response = await createPostCommentApi(params.id, {
        content: message,
      });
      console.log("Comment created:", response.data);

      // Clear the message and close the modal
      toast.success(response.message);
    } catch (error) {
      // Handle any errors here
      console.error("Error creating post:", error);
      toast.warning(
        "ツイートの送信中にエラーが発生しました。お時間を置いてもう一度お試しください。",
      );
    }
  };

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

  const displayCommentCount = () => {
    if (postComments === null) {
      return "コメントの読み込み中...";
    }
    return `コメント数: ${postComments.length}`;
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
          {displayCommentCount()}
        </div>
      </div>
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

export default EventComments;

// propTypes の宣言
EventComments.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};
