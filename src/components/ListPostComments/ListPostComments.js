import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListPostComments.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";
import useAuth from "../../hooks/useAuth";
import { deletePostCommentApi } from "../../api/postComment";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { map } from "lodash";
import { useNavigate } from "react-router-dom";

export default function ListPostComments(props) {
  const { postComments: initialPostComments, onCommentDeleted } = props;
  const authUser = useAuth();

  return (
    <div className="list-posts">
      {map(initialPostComments, (comment) => (
        <PostComment
          key={comment.id} // インデックスではなく、ユニークなIDを使用
          comment={comment}
          authUser={authUser}
          onCommentDeleted={onCommentDeleted}
        />
      ))}
    </div>
  );
}

ListPostComments.propTypes = {
  postComments: PropTypes.array.isRequired,
  onCommentDeleted: PropTypes.func.isRequired,
};

function PostComment({ comment, authUser, onCommentDeleted }) {
  const navigate = useNavigate();

  const handleUserProfileShow = (userId) => {
    navigate(`/user/${userId}`);
  };
  const handleDelete = () => {
    const confirmation = window.confirm("コメントを削除しますか？");
    if (confirmation) {
      deletePostCommentApi(comment.id)
        .then(() => {
          onCommentDeleted(comment.id);
          toast.success("コメントが削除されました。");
        })
        .catch((error) => {
          console.error("Delete Error:", error);
          toast.warning("コメントの削除中にエラーが発生しました。");
        });
    }
  };

  const iconUrl = comment.user?.icon ? comment.user.icon : IconNotFound;

  return (
    <div className="comment">
      <div
        className="header-container"
        onClick={(e) => {
          e.stopPropagation();
          handleUserProfileShow(comment.user.id);
        }}
      >
        <Image className="icon" src={iconUrl} roundedCircle />
        {comment.user && (
          <div className="name">
            {comment.user.name}
            <span>{moment(comment.created_at).calendar()}</span>
          </div>
        )}
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{
          __html: replaceURLWithHTMLLinks(comment.content),
        }}
      />
      <div className="icons-container">
        {authUser &&
          comment.user &&
          authUser.sub === String(comment.user.id) && (
            <FontAwesomeIcon
              icon={faTrash}
              className="text-danger"
              onClick={handleDelete}
            />
          )}
      </div>
    </div>
  );
}

PostComment.propTypes = {
  comment: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  onCommentDeleted: PropTypes.func.isRequired,
};
