import React, { useEffect, useState } from "react";
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
import {
  faComment,
  faListUl,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import PostCommentModal from "../../components/Modal/PostCommentModal";

export default function PostComments(props) {
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
  const [hasMoreData, setHasMoreData] = useState(true);
  const navigate = useNavigate();
  const pageSize = 100;

  const handleShowLikes = (postId) => {
    navigate(`/post_likes/${postId}`);
  };

  const handleShowPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const loadComments = () => {
    if (!loadingPostComments && hasMoreData) {
      setLoadingPostComments(true);
      getPostCommentsApi(params.id, page, pageSize)
        .then((response) => {
          if (response && response.data.length > 0) {
            setPostComments((prevComments) => [
              ...prevComments,
              ...response.data,
            ]);
            setPage((prevPage) => prevPage + 1);
            setHasMoreData(response.data.length === pageSize);
          } else {
            setHasMoreData(false);
          }
        })
        .catch((error) => {
          console.error("Error fetching post comments:", error);
          toast.error("コメントの読み込み中にエラーが発生しました。");
        })
        .finally(() => {
          setLoadingPostComments(false);
        });
    }
  };

  const moreData = () => {
    loadComments();
  };

  // 初期表示時にコメントデータを読み込む
  useEffect(() => {
    loadComments();
  }, []); // 依存配列を空に設定

  useEffect(() => {
    const fetchLikeData = async () => {
      try {
        const likeStatus = await checkIfPostLikedApi(params.id, authUser.id);
        setIsLiked(likeStatus);
        updateLikeCount();
      } catch (error) {
        console.error("Error fetching like data:", error);
        toast.error("いいねの状態を取得できませんでした。");
      }
    };

    fetchLikeData();
  }, [params, authUser]);

  useEffect(() => {
    const fetchCommentCount = async () => {
      try {
        const comments = await getPostCommentsApi(params.id);
        setCommentCount(comments.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
        toast.error("コメント数の取得中にエラーが発生しました。");
      }
    };

    fetchCommentCount();
  }, [params]);

  const updateLikeCount = async () => {
    try {
      const likesData = await getLikesForPostApi(params.id);
      setLikeCount(likesData.length);
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
        toast.success("いいねを解除しました。");
      })
      .catch((error) => {
        console.error("Unlike Error:", error);
        toast.error("いいね解除に失敗しました。");
      });
  };

  const handleDelete = () => {
    const confirmation = window.confirm("コメントを削除しますか？");
    if (confirmation) {
      deletePostApi(post.id)
        .then(() => {
          navigate("/");
          toast.success("コメントが削除されました。");
        })
        .catch((error) => {
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
        setPostComments(response.data);
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

  return (
    <BasicLayout className="post">
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
                  icon={faHeart}
                  className="liked"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleUnlike();
                  }}
                />
              ) : (
                <FontAwesomeIcon
                  icon={faHeart}
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
                  className="text-danger"
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
        <Button onClick={() => setShowPostCommentModal(true)}>
          コメントする
        </Button>
      </div>
      <PostCommentModal
        show={showPostCommentModal}
        setShow={setShowPostCommentModal}
      />
      <div className="post__content">
        <ListPostComments
          postComments={postComments}
          onCommentDeleted={handleCommentDeleted}
        />
        {hasMoreData && (
          <Button onClick={moreData}>
            {!loadingPostComments ? (
              "もっと見る"
            ) : (
              <Spinner
                animation="grow"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
          </Button>
        )}
      </div>
    </BasicLayout>
  );
}
