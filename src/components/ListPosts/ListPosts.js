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

export default function ListPosts(props) {
  const { posts: initialPosts, setPosts: setInitialPosts } = props;
  const authUser = useAuth();
  const [posts, setPosts] = useState(initialPosts);

  const handlePostDeleted = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts);
    setInitialPosts(updatedPosts);
  };

  return (
    <div className="list-posts">
      {map(posts, (post, index) => (
        <Post
          key={index}
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
  }, [post.id, authUser.id]);

  useEffect(() => {
    // コメント数の取得
    const fetchCommentCount = async () => {
      try {
        const comments = await getPostCommentsApi(post.id);
        setCommentCount(comments.data.length);
      } catch (error) {
        console.error("Error fetching comments:", error);
        // コメント数の取得が失敗した際のエラーメッセージ
        toast.error("コメント数の取得中にエラーが発生しました。");
      }
    };

    fetchCommentCount();
  }, [post.id]);

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
    deletePostApi(post.id)
      .then(() => {
        onPostDeleted(post.id); // 親コンポーネントの状態を更新
      })
      .catch((error) => console.error("Delete Error:", error));
  };

  const iconUrl = post.user?.icon ? post.user.icon : IconNotFound;

  return (
    <div className="post" onClick={() => handleShowPost(post.id)}>
      <Image className="icon" src={iconUrl} roundedCircle />
      <div>
        {post.user && (
          <div className="name">
            {post.user.name}
            <span>{moment(post.created_at).calendar()}</span>
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(post.content),
          }}
        />
        <div>
          {isLiked ? (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleUnlike();
              }}
            >
              いいね済み
            </button>
          ) : (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleLike();
              }}
            >
              いいねする
            </button>
          )}
          <span>{likeCount} Likes</span>
          <span>{commentCount} コメント</span> {/* コメント数を表示 */}
          {authUser.sub === String(post.user.id) && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              削除
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleShowLikes(post.id);
            }}
          >
            いいね一覧
          </button>
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  onPostDeleted: PropTypes.func.isRequired,
};
