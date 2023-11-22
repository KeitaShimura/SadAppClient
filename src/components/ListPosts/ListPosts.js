import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListPosts.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";

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
          {post.user && (
            <div className="name">
              {post.user.name}
              <span>{moment(post.created_at).calendar()}</span>
            </div>
          )}
        </div>
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(post.description),
          }}
        ></div>
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
    created_at: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};
