import React, { useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { map } from "lodash";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListPostComments.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";
import useAuth from "../../hooks/useAuth";
import { deletePostCommentApi } from "../../api/postComment";

export default function ListPostComments(props) {
  const {
    postComments: initialPostComments,
    setPostComments: setInitialPostComments,
  } = props; // プロパティ名を変更
  const authUser = useAuth();
  const [postComments, setPostComments] = useState(initialPostComments); // ローカル状態を初期化

  const handlePostDeleted = (postId) => {
    const updatedComments = postComments.filter((post) => post.id !== postId);
    setPostComments(updatedComments); // ローカルの状態を更新
    setInitialPostComments(updatedComments); // 親コンポーネントの状態も更新
  };

  return (
    <div className="list-posts">
      {map(postComments, (comment, index) => (
        <PostComment
          key={index}
          comment={comment}
          authUser={authUser}
          onPostDeleted={handlePostDeleted}
        />
      ))}
    </div>
  );
}

ListPostComments.propTypes = {
  postComments: PropTypes.array.isRequired,
  setPostComments: PropTypes.func.isRequired,
};
function PostComment({ comment, authUser, onPostDeleted }) {
  const handleDelete = () => {
    deletePostCommentApi(comment.id)
      .then(() => {
        onPostDeleted(comment.id); // 親コンポーネントの状態を更新
      })
      .catch((error) => console.error("Delete Error:", error));
  };

  const iconUrl = comment.user?.icon ? comment.user.icon : IconNotFound;

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
        <div>
          {authUser.sub === String(comment.user.id) && (
            <button onClick={handleDelete}>削除</button>
          )}
        </div>
      </div>
    </div>
  );
}

PostComment.propTypes = {
  comment: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  onPostDeleted: PropTypes.func.isRequired,
};
