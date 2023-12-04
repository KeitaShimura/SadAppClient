import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListEventComments.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";
import useAuth from "../../hooks/useAuth";
import { deleteEventCommentApi } from "../../api/eventComment";
import { toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { map } from "lodash";
import { useNavigate } from "react-router-dom";

export default function ListEventComments(props) {
  const { eventComments: initialEventComments, onCommentDeleted } = props;
  const authUser = useAuth();

  return (
    <div className="list-posts">
      {map(initialEventComments, (comment) => (
        <EventComment
          key={comment.id}
          comment={comment}
          authUser={authUser}
          onCommentDeleted={onCommentDeleted}
        />
      ))}
    </div>
  );
}

ListEventComments.propTypes = {
  eventComments: PropTypes.array.isRequired,
  onCommentDeleted: PropTypes.func.isRequired,
};

function EventComment({ comment, authUser, onCommentDeleted }) {
  const navigate = useNavigate();

  const handleUserProfileShow = (userId) => {
    navigate(`/user/${userId}`);
  };

  const handleDelete = () => {
    const confirmation = window.confirm("コメントを削除しますか？");
    if (confirmation) {
      deleteEventCommentApi(comment.id)
        .then(() => {
          onCommentDeleted(comment.id);
          toast.success("コメントが削除されました。");
        })
        .catch((error) => {
          // 削除が失敗した場合のエラーハンドリング
          console.error("Delete Error:", error);
          toast.warning("コメントの削除中にエラーが発生しました。");
        });
    }
  };

  const iconUrl = comment.user?.icon ? comment.user.icon : IconNotFound;

  console.log(authUser.sub, comment.user.id);

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
            <FontAwesomeIcon icon={faTrash} onClick={handleDelete} />
          )}
      </div>
    </div>
  );
}

EventComment.propTypes = {
  comment: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  onCommentDeleted: PropTypes.func.isRequired,
};
