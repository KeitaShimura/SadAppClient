import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ListPostComments from "../../components/ListPostComments";
import BasicLayout from "../../layout/BasicLayout";
import { deletePostApi, getPostApi } from "../../api/post";
import {
  createPostCommentApi,
  getPostCommentsApi,
} from "../../api/postComment";
import { Button, Image, Spinner } from "react-bootstrap";
import moment from "moment";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import classNames from "classnames";
import {
  checkIfPostLikedApi,
  getLikesForPostApi,
  likePostApi,
  unlikePostApi,
} from "../../api/postLike";
import useAuth from "../../hooks/useAuth";
import "./PostComments.scss";

import IconNotFound from "../../assets/png/icon-no-found.png";

function PostComments(props) {
  const { setRefreshCheckLogin } = props;
  const params = useParams();
  const authUser = useAuth();
  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState(null);
  const [page, setPage] = useState(1);
  const [loadingPostComments, setLoadingPostComments] = useState(false);
  const [message, setMessage] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const maxLength = 200;

  const navigate = useNavigate();

  const handleShowLikes = (postId) => {
    navigate(`/post_likes/${postId}`);
  };

  const handleShowPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const likeStatus = await checkIfPostLikedApi(post.id, authUser.id);
        setIsLiked(likeStatus);
        updateLikeCount();
      } catch (error) {
        console.error("Error fetching like data:", error);
      }
    };

    fetchLikeData();
  }, [post, authUser]);

  useEffect(() => {
    // コメント数の取得
    const fetchCommentCount = async () => {
      try {
        const comments = await getPostCommentsApi(post.id);
        setCommentCount(comments.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchCommentCount();
  }, [post]);

  const updateLikeCount = async () => {
    try {
      const likesData = await getLikesForPostApi(post.id);
      setLikeCount(likesData.data.length);
    } catch (error) {
      console.error("Error fetching like count:", error);
    }
  };

  const handleLike = () => {
    likePostApi(post.id)
      .then(() => {
        setIsLiked(true);
        updateLikeCount();
      })
      .catch((error) => console.error("Like Error:", error));
  };

  const handleUnlike = () => {
    unlikePostApi(post.id)
      .then(() => {
        setIsLiked(false);
        updateLikeCount();
      })
      .catch((error) => console.error("Unlike Error:", error));
  };

  const handleDelete = () => {
    deletePostApi(post.id);
  };

  const iconUrl =
    post && post.user && post.user.icon ? post.user.icon : IconNotFound;

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

  return (
    <BasicLayout className="post" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="post" onClick={() => handleShowPost(post.id)}>
        <Image className="icon" src={iconUrl} roundedCircle />
        <div>
          {post && post.user && (
            <div className="name">
              {post.user.name}
              <span>{moment(post.created_at).calendar()}</span>
            </div>
          )}
          {post && (
            <div>
              <div
                dangerouslySetInnerHTML={{
                  __html: replaceURLWithHTMLLinks(post.content),
                }}
              />
              <div>
                {isLiked ? (
                  <button onClick={handleUnlike}>いいね済み</button>
                ) : (
                  <button onClick={handleLike}>いいねする</button>
                )}
                <span>{likeCount} Likes</span>
                <span>{commentCount} コメント</span> {/* コメント数を表示 */}
                {authUser.sub === String(post.user.id) && (
                  <button onClick={handleDelete}>削除</button>
                )}
                <button onClick={() => handleShowLikes(post.id)}>
                  いいね一覧
                </button>
              </div>
            </div>
          )}
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

export default PostComments;

// propTypes の宣言
PostComments.propTypes = {
  setRefreshCheckLogin: PropTypes.func.isRequired,
};