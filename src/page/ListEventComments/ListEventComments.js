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

export default function ListEventComments(props) {
  const { eventComments, onCommentDeleted } = props;
  const authUser = useAuth();

  return (
    <div className="list-posts">
      {eventComments &&
        eventComments.map((comment) => (
          <EventComment
            key={comment.id} // インデックスではなく、ユニークなIDを使用
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


function EventComment({ comment, authUser, onEventDeleted }) {
  const handleDelete = () => {
    deleteEventCommentApi(comment.id)
      .then(() => {
        // 削除が成功した場合の処理
        toast.success("コメントが削除されました。");
        onEventDeleted(comment.id);
      })
      .catch((error) => {
        // 削除が失敗した場合のエラーハンドリング
        console.error("Delete Error:", error);
        toast.warning("コメントの削除中にエラーが発生しました。");
      });
  };

  const iconUrl = comment.user?.icon ? comment.user.icon : IconNotFound;

  console.log(authUser.sub, comment.user.id);

  return (
    <div className="event">
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

EventComment.propTypes = {
  comment: PropTypes.object.isRequired,
  authUser: PropTypes.object.isRequired,
  onEventDeleted: PropTypes.func.isRequired,
};
