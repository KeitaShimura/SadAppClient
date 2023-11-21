import React from "react";
import PropTypes from "prop-types";
import { Image } from "react-bootstrap";
import { map } from "lodash";

import IconNotFound from "../../assets/png/icon-no-found.png";

import "./ListPosts.scss";
import moment from "moment";

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
      description: PropTypes.string,
    }),
  ).isRequired,
};

function Post(props) {
  const { post } = props;

  const iconUrl = post.user?.icon ? post.user.icon : IconNotFound; // Using the updated user state

  return (
    <div className="post">
      <Image className="icon" src={iconUrl} roundedCircle />
      <div>
        <div className="name">
          {post.user.name}
          <span>{moment(post.created_at).calendar()}</span>
        </div>
        <div>{post.description}</div>
      </div>
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    user_id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    user: PropTypes.shape({
      icon: PropTypes.string,
      name: PropTypes.string,
    }),
    created_at: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
