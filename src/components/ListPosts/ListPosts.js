import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListPosts.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";
import {
  checkIfPostLikedApi,
  likePostApi,
  unlikePostApi,
  getLikesForPostApi,
} from "../../api/postLike";
import useAuth from "../../hooks/useAuth";
import { deletePostApi } from "../../api/post";
import { useNavigate } from "react-router-dom";
import { getPostCommentsApi } from "../../api/postComment";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faListUl,
  faHeart,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { API_HOST } from "../../utils/constant";

export default function ListPosts(props) {
  const { posts: initialPosts, setPosts: setInitialPosts } = props;
  const authUser = useAuth();

  const handlePostDeleted = (postId) => {
    const updatedPosts = initialPosts.filter((post) => post.id !== postId);
    setInitialPosts(updatedPosts);
  };

  return (
    <div className="list-posts">
      {map(initialPosts, (post) => (
        <Post
          key={post.id}
          post={post}
          authUser={authUser}
          onPostDeleted={handlePostDeleted}
        />
      ))}
    </div>
  );
}

ListPosts.propTypes = {
  posts: PropTypes.array.isRequired,
  setPosts: PropTypes.func.isRequired,
};
function Post({ post, authUser, onPostDeleted }) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  const navigate = useNavigate();

  const handleShowLikes = (postId) => {
    navigate(`/post_likes/${postId}`);
  };

  const handleShowPost = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleUserProfileShow = (userId) => {
    navigate(`/user/${userId}`);
  };

  useEffect(() => {
    const fetchLikeData = async () => {
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
    const confirmation = window.confirm("投稿を削除しますか？");
    if (confirmation) {
      deletePostApi(post.id)
        .then(() => {
          onPostDeleted(post.id);
          toast.success("投稿が削除されました。");
        })
        .catch((error) => {
          console.error("Delete Error:", error);
          toast.warning("投稿の削除中にエラーが発生しました。");
        });
    }
  };

  const iconUrl = post.user?.icon ? `${API_HOST}${post.user.icon}` : IconNotFound;

  return (
    <div className="post" onClick={() => handleShowPost(post.id)}>
      <div
        className="header-container"
        onClick={(e) => {
          e.stopPropagation();
          handleUserProfileShow(post.user.id);
        }}
      >
               <div className="icon-container">
          <Image className="icon" src={iconUrl} roundedCircle />
        </div>
        {post.user && (
          <div className="name">
            {post.user.name}
            <span>{moment(post.created_at).calendar()}</span>
          </div>
        )}
      </div>
      <div className="content">
        {post.image && (
          <div className="image-container">
            <Image
              src={`${API_HOST}${post.image}`}
              alt="Post Image"
              className="post-image"
            />
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(post.content),
          }}
        />
      </div>
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
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  onPostDeleted: PropTypes.func.isRequired,
};
