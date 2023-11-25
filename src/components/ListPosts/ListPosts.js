import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListPosts.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";
import { checkIfPostLikedApi, likePostApi, unlikePostApi } from "../../api/postLike";
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
  const authUser = useAuth();
  console.log(authUser.sub);

  useEffect(() => {
    checkIfPostLikedApi(post.id, authUser.id)
      .then((likeStatus) => setIsLiked(likeStatus))
      .catch((error) => console.error("Check Like Error:", error));
  }, [post.id]);

  const handleLike = () => {
    likePostApi(post.id)
      .then(() => setIsLiked(true))
      .catch((error) => console.error("Like Error:", error));
  };

  const handleUnlike = () => {
    unlikePostApi(post.id)
      .then(() => setIsLiked(false))
      .catch((error) => console.error("Unlike Error:", error));
  };

  const iconUrl = post.user?.icon ? post.user.icon : IconNotFound;

  return (
    <div className="post">
      <Image className="icon" src={iconUrl} roundedCircle />
      <div>
        <div className="name">
          {post.user && (
            <div className="name">
              {post.user.name}
              <span>{moment(post.created_at).calendar()}</span>
            </div>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(post.content),
          }}
        ></div>
      </div>
      <div>
        {isLiked ? (
          <button onClick={handleUnlike}>いいね済み</button>
        ) : (
          <button onClick={handleLike}>いいねする</button>
        )}
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.shape({
      icon: PropTypes.string,
      name: PropTypes.string,
    }),
    id: PropTypes.number.isRequired,
    content: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
  }).isRequired,
};
