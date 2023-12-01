import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListPostComments.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";
import useAuth from "../../hooks/useAuth";
import { deletePostCommentApi } from "../../api/postComment";

export default function ListPostComments(props) {
  const { postComments, onPostDeleted } = props;
  const authUser = useAuth();

  return (
    <div className="list-posts">
      {postComments &&
        postComments.map((comment) => (
          <PostComment
            key={comment.id} // インデックスではなく、ユニークなIDを使用
            comment={comment}
            authUser={authUser}
            onPostDeleted={onPostDeleted}
          />
        ))}
    </div>
  );
}

ListPostComments.propTypes = {
  postComments: PropTypes.array.isRequired,
  onPostDeleted: PropTypes.func.isRequired,
};

function PostComment({ comment, authUser, onPostDeleted }) {
  const handleDelete = () => {
    deletePostCommentApi(comment.id)
      .then(() => {
        onPostDeleted(comment.id);
      })
      .catch((error) => console.error("Delete Error:", error));
  };

  const iconUrl = comment.user?.icon ? comment.user.icon : IconNotFound;

  console.log(authUser.sub, comment.user.id);

  return (
    <div className="post">
      <Image className="icon" src={iconUrl} roundedCircle />
      <div>
        {comment.user && (
          <div className="name">
            {comment.user.name}
            <span>{moment(comment.created_at).calendar()}</span>
          </div>
        )}
        <div
          dangerouslySetInnerHTML={{
            __html: replaceURLWithHTMLLinks(comment.content),
          }}
        />
        {authUser &&
          comment.user &&
          authUser.sub === String(comment.user.id) && (
            <button onClick={handleDelete}>削除</button>
          )}
      </div>
    </div>
  );
}

PostComment.propTypes = {
  comment: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  onPostDeleted: PropTypes.func.isRequired,
};
