import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import { Image } from "react-bootstrap";
import { replaceURLWithHTMLLinks } from "../../utils/functions";
import "./ListEventComments.scss";
import IconNotFound from "../../assets/png/icon-no-found.png";
import useAuth from "../../hooks/useAuth";
import { deleteEventCommentApi } from "../../api/eventComment";

export default function ListEventComments(props) {
  const {
    eventComments: initialEventComments,
    setEventComments: setInitialEventComments,
  } = props;
  const authUser = useAuth();
  const [eventComments, setEventComments] = useState(initialEventComments || []); // 初期値がnullの場合、空の配列を使用

  useEffect(() => {
    setEventComments(initialEventComments || []); // 初期値がnullの場合、空の配列を使用
  }, [initialEventComments]);

  const handleEventDeleted = (eventId) => {
    const updatedComments = eventComments.filter((event) => event.id !== eventId);
    setEventComments(updatedComments);
    setInitialEventComments(updatedComments);
  };

  return (
    <div className="list-events">
      {eventComments &&
        eventComments.map((comment) => (
          <EventComment
            key={comment.id} // インデックスではなく、ユニークなIDを使用
            comment={comment}
            authUser={authUser}
            onEventDeleted={handleEventDeleted}
          />
        ))}
    </div>
  );
}

ListEventComments.propTypes = {
  eventComments: PropTypes.array.isRequired,
  setEventComments: PropTypes.func.isRequired,
};

function EventComment({ comment, authUser, onEventDeleted }) {
  const handleDelete = () => {
    deleteEventCommentApi(comment.id)
      .then(() => {
        onEventDeleted(comment.id);
      })
      .catch((error) => console.error("Delete Error:", error));
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
