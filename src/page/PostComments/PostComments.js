import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import ListPostComments from "../../components/ListPostComments";
import BasicLayout from "../../layout/BasicLayout";
import { deletePostApi, getPostApi } from "../../api/post";
import { getPostCommentsApi } from "../../api/postComment";
import { Button, Image, Spinner } from "react-bootstrap";
import moment from "moment";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import {
  checkIfPostLikedApi,
  getLikesForPostApi,
  likePostApi,
  unlikePostApi,
} from "../../api/postLike";
import useAuth from "../../hooks/useAuth";
import "./PostComments.scss";

import IconNotFound from "../../assets/png/icon-no-found.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment, faListUl, faThumbsUp, faTrash } from "@fortawesome/free-solid-svg-icons";
import PostCommentModal from "../../components/PostCommentModal/PostCommentModal";

function PostComments(props) {
  const { setRefreshCheckLogin } = props;
  const params = useParams();
  const authUser = useAuth();
  const [post, setPost] = useState(null);
  const [postComments, setPostComments] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingPostComments, setLoadingPostComments] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showPostCommentModal, setShowPostCommentModal] = useState(false);

  const navigate = useNavigate();

  const handleShowLikes = (postId) => {
    navigate(`/post_likes/${postId}`);
  };

  const handleShowPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  useEffect(() => {
    const fetchLikeData = async () => {
      if (!post || !authUser) {
        console.error("Post or AuthUser is null");
        return;
      }

      try {
        const likeStatus = await checkIfPostLikedApi(post.id, authUser.id);
        setIsLiked(likeStatus);
        updateLikeCount();
      } catch (error) {
        console.error("Error fetching like data:", error);
        toast.error("いいねの状態を取得できませんでした。");
      }
    };

    fetchLikeData();
  }, [post, authUser]);

  useEffect(() => {
    const fetchCommentCount = async () => {
      if (!post) {
        console.error("Post is null");
        return;
      }

      try {
        const comments = await getPostCommentsApi(post.id);
        setCommentCount(comments.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("コメント数の取得中にエラーが発生しました。");
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
      // データを取得できなかった場合のエラーメッセージ
      toast.error("いいねの数を更新できませんでした。");
    }
  };

  const handleLike = () => {
    likePostApi(post.id)
      .then(() => {
        setIsLiked(true);
        updateLikeCount();
        // いいねが成功した際のメッセージ
        toast.success("いいねしました。");
      })
      .catch((error) => {
        console.error("Like Error:", error);
        // いいねが失敗した際のエラーメッセージ
        toast.error("いいねに失敗しました。");
      });
  };

  const handleUnlike = () => {
    unlikePostApi(post.id)
      .then(() => {
        setIsLiked(false);
        updateLikeCount();
        // いいね解除が成功した際のメッセージ
        toast.success("いいねを解除しました。");
      })
      .catch((error) => {
        console.error("Unlike Error:", error);
        // いいね解除が失敗した際のエラーメッセージ
        toast.error("いいね解除に失敗しました。");
      });
  };

  const handleDelete = () => {
    const confirmation = window.confirm("コメントを削除しますか？");
    if (confirmation) {
      // User confirmed the delete action
      deletePostApi(post.id)
        .then(() => {
          navigate("/");
          toast.success("コメントが削除されました。");
        })
        .catch((error) => {
          // 削除が失敗した場合のエラーハンドリング
          console.error("Delete Error:", error);
          toast.error("コメントの削除中にエラーが発生しました。");
        });
    }
  };

  const iconUrl =
    post && post.user && post.user.icon ? post.user.icon : IconNotFound;

  useEffect(() => {
    setLoadingPostComments(true);
    getPostCommentsApi(params.id)
      .then((response) => {
        setPostComments(response.data); // ここでコメントデータを更新
        setLoadingPostComments(false);
      })
      .catch((error) => {
        console.error("Error fetching post comments:", error);
        setLoadingPostComments(false);
        toast.error("コメントデータの取得中にエラーが発生しました。");
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

  const handleCommentDeleted = (deletedCommentId) => {
    setPostComments((prevComments) =>
      prevComments.filter((comment) => comment.id !== deletedCommentId),
    );
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
          // データの読み込みが失敗した際のエラーメッセージ
          toast.error("コメントデータの取得中にエラーが発生しました。");
        } else {
          setPostComments(response.data);
          setPage(pageTemp);
          setLoadingPostComments(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching post comments:", error);
        setLoadingPostComments(false); // Handle the error condition
        // データの読み込みが失敗した際のエラーメッセージ
        toast.error("コメントデータの取得中にエラーが発生しました。");
      });
  };

  return (
    <BasicLayout className="post" setRefreshCheckLogin={setRefreshCheckLogin}>
      <div className="post" onClick={() => handleShowPost(post.id)}>
        <div className="header-container">
          <Image className="icon" src={iconUrl} roundedCircle />
          {post && post.user && (
            <div className="name">
              {post.user.name}
              <span>{moment(post.created_at).calendar()}</span>
            </div>
          )}
        </div>
        {post && (
          <div>
            <div
              className="content"
              dangerouslySetInnerHTML={{
                __html: replaceURLWithHTMLLinks(post.content),
              }}
            />
            <div className="icons-container">
              {isLiked ? (
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  className="liked"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnlike();
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faThumbsUp}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleLike();
                  }}
                />
              )}
              <span>{likeCount}</span>
              <FontAwesomeIcon icon={faComment} /> <span>{commentCount}</span>
              <FontAwesomeIcon
                icon={faListUl}
                onClick={(e) => {
                  e.stopPropagation();
                  handleShowLikes(post.id);
                }}
              />
              {authUser.sub === String(post.user.id) && (
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete();
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="button-container">
        <Button onClick={() => setShowPostCommentModal(true)}>投稿する</Button>
      </div>
      <PostCommentModal show={showPostCommentModal} setShow={setShowPostCommentModal} />
      <div className="post__comment">
        <ListPostComments
          postComments={postComments}
          onCommentDeleted={handleCommentDeleted}
        />
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
