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

export default function ListPosts(props) {
  const { posts } = props;
  return (
    <div className="list-posts">
      {map(posts, (post, index) => (
        <Post key={index} post={post} />
      ))}
    </div>
  );
}

ListPosts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      content: PropTypes.string,
    }),
  ).isRequired,
};

function Post(props) {
  const { post } = props;
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const authUser = useAuth();

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
        </div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      icon: PropTypes.string,
      name: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
  }).isRequired,
};
