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

export default function ListPosts(props) {
  const { posts: initialPosts, setPosts: setInitialPosts } = props; // プロパティ名を変更
  const authUser = useAuth();
  const [posts, setPosts] = useState(initialPosts); // ローカル状態を初期化

  const handlePostDeleted = (postId) => {
    const updatedPosts = posts.filter((post) => post.id !== postId);
    setPosts(updatedPosts); // ローカルの状態を更新
    setInitialPosts(updatedPosts); // 親コンポーネントの状態も更新
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
  const navigate = useNavigate();

  const handleShowLikes = (postId) => {
    navigate(`/post_likes/${postId}`);
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

  const updateLikeCount = async () => {
    try {
      const likesData = await getLikesForPostApi(post.id);
      setLikeCount(likesData.length);
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
    deletePostApi(post.id)
      .then(() => {
        onPostDeleted(post.id); // 親コンポーネントの状態を更新
      })
      .catch((error) => console.error("Delete Error:", error));
  };

  const iconUrl = post.user?.icon ? post.user.icon : IconNotFound;

  return (
    <div className="post">
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
            <button onClick={handleUnlike}>いいね済み</button>
          ) : (
            <button onClick={handleLike}>いいねする</button>
          )}
          <span>{likeCount} Likes</span>
          {authUser.sub === String(post.user.id) && (
            <button onClick={handleDelete}>削除</button>
          )}
          <button onClick={() => handleShowLikes(post.id)}>いいね一覧</button>
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
