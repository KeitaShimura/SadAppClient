import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListPostComments.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";
import useAuth from "../../hooks/useAuth";
import { deletePostCommentApi } from "../../api/postComment";

export default function ListPostComments(props) {
  const {
    postComments: initialPostComments,
    setPostComments: setInitialPostComments,
  } = props;
  const authUser = useAuth();
  const [postComments, setPostComments] = useState(initialPostComments || []); // 初期値がnullの場合、空の配列を使用

  useEffect(() => {
    setPostComments(initialPostComments || []); // 初期値がnullの場合、空の配列を使用
  }, [initialPostComments]);

  const handlePostDeleted = (postId) => {
    const updatedComments = postComments.filter((post) => post.id !== postId);
    setPostComments(updatedComments);
    setInitialPostComments(updatedComments);
  };

  return (
    <div className="list-posts">
      {postComments &&
        postComments.map(
          (
            comment,
            index, // postCommentsがnullまたはundefinedでないことを確認
          ) => (
            <PostComment
              key={comment.id} // インデックスではなく、ユニークなIDを使用
              comment={comment}
              authUser={authUser}
              onPostDeleted={handlePostDeleted}
            />
          ),
        )}
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
        onPostDeleted(comment.id);
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
